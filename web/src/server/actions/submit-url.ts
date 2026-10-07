"use server";

import { createHash, randomBytes } from "node:crypto";
import { and, desc, eq, gt, gte, inArray, isNotNull, isNull, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { DEFAULTS } from "@uplayer/shared";
import { events, hotels, reports } from "@uplayer/shared/db";
import { db } from "@/server/db";
import { runPipeline } from "@/server/pipeline";

export type SubmitState = { error?: string };

// Spec value (case A5) is 5/hour in production; local testing from one IP
// trips it instantly, so dev gets a generous bucket.
const RATE_LIMIT_PER_HOUR = process.env.NODE_ENV === "production" ? 5 : 30;

async function verifyTurnstile(secret: string, token: string): Promise<boolean> {
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false; // fail closed when the checker is unreachable
  }
}

export async function submitUrl(_prev: SubmitState, formData: FormData): Promise<SubmitState> {
  // --- validate URL ---
  const raw = String(formData.get("url") ?? "").trim();
  let url: URL;
  try {
    url = new URL(raw.includes("://") ? raw : `https://${raw}`);
  } catch {
    return { error: "Enter a valid website address." };
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { error: "Enter an http(s) website address." };
  }
  const host = url.hostname.toLowerCase();
  if (!host.includes(".")) return { error: "That doesn't look like a hotel website domain." };
  if (host === "localhost" || /^(127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(host)) {
    return { error: "Enter your hotel's public website (not a local address)." };
  }
  const domain = host.replace(/^www\./, "");

  // --- bot check (skipped only when Turnstile isn't configured, i.e. local dev) ---
  const secret = process.env.TURNSTILE_SECRET;
  if (secret) {
    const ok = await verifyTurnstile(secret, String(formData.get("cf-turnstile-response") ?? ""));
    if (!ok) return { error: "Bot check failed — please try again." };
  }

  // --- per-IP rate limit (A5) ---
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 16);
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(events)
    .where(and(eq(events.type, "report_started"), gte(events.createdAt, hourAgo), sql`${events.payload}->>'ip' = ${ipHash}`));
  if (count >= RATE_LIMIT_PER_HOUR) {
    return { error: "Too many reports from this network — please try again later." };
  }

  // --- 30-day per-domain cache (A4): clone the latest reusable report ---
  const [cached] = await db
    .select()
    .from(reports)
    .innerJoin(hotels, eq(reports.hotelId, hotels.id))
    .where(
      and(
        eq(hotels.domain, domain),
        isNull(reports.removedAt),
        gt(reports.expiresAt, new Date()),
        inArray(reports.status, ["preview_ready", "ready"]),
        // only reuse fully-scored reports — pre-scoring rows must re-crawl
        isNotNull(reports.scoreTotal),
      ),
    )
    .orderBy(desc(reports.createdAt))
    .limit(1);

  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  let token: string;
  let reportId: string;

  if (cached) {
    token = randomBytes(16).toString("base64url");
    const [clone] = await db
      .insert(reports)
      .values({
        hotelId: cached.reports.hotelId,
        token,
        status: cached.reports.status,
        unlocked: false,
        inputs: cached.reports.inputs,
        scoreTotal: cached.reports.scoreTotal,
        scoreOutOf: cached.reports.scoreOutOf,
        scoreGrade: cached.reports.scoreGrade,
        scoreBreakdown: cached.reports.scoreBreakdown,
        missedLow: cached.reports.missedLow,
        missedHigh: cached.reports.missedHigh,
        captureRate: cached.reports.captureRate,
        priceBand: cached.reports.priceBand,
        steps: cached.reports.steps,
        cachedFromId: cached.reports.id,
        expiresAt,
      })
      .returning({ id: reports.id });
    reportId = clone.id;
    // child rows belong to the report — copy them so the clone renders identically
    for (const table of ["pages", "packages", "detected_tech"] as const) {
      const cols = table === "pages"
        ? "url, title, kind, http_status, text_content, load_ms"
        : table === "packages"
          ? "kind, name, description, price_min, price_max, currency, category, guest_fit, timing, included, source, has_photo, has_price, has_description"
          : "category, name, evidence, confidence";
      await db.execute(
        sql`INSERT INTO ${sql.identifier(table)} (report_id, ${sql.raw(cols)}) SELECT ${reportId}, ${sql.raw(cols)} FROM ${sql.identifier(table)} WHERE report_id = ${cached.reports.id}`,
      );
    }
    await db.insert(events).values({ reportId, type: "report_started", payload: { ip: ipHash, cached: true } });
    redirect(`/report/${token}/progress`);
  }

  // --- fresh report ---
  const [hotel] = await db.insert(hotels).values({ domain }).onConflictDoNothing().returning({ id: hotels.id });
  const hotelId =
    hotel?.id ??
    (
      await db
        .select({ id: hotels.id })
        .from(hotels)
        .where(eq(hotels.domain, domain))
        .limit(1)
    )[0].id;

  token = randomBytes(16).toString("base64url");
  const [report] = await db
    .insert(reports)
    .values({
      hotelId,
      token,
      inputs: {
        occupancy: DEFAULTS.occupancy,
        avgStayNights: DEFAULTS.avgStayNights,
        currentUpsellRevenue: DEFAULTS.currentUpsellRevenue,
        buildPrice: DEFAULTS.buildPrice,
        carePlan: true,
      },
      expiresAt,
    })
    .returning({ id: reports.id });
  reportId = report.id;

  await db.insert(events).values({ reportId, type: "report_started", payload: { ip: ipHash } });

  // --- run the pipeline: Inngest when configured, local after-response otherwise ---
  if (process.env.INNGEST_EVENT_KEY) {
    const { inngest } = await import("@/server/inngest/client");
    await inngest.send({ name: "report/generate", data: { reportId } });
  } else {
    after(async () => {
      await runPipeline(reportId);
    });
  }

  redirect(`/report/${token}/progress`);
}
