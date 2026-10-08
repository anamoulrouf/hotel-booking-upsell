"use server";

// Unlock lite (docs/09 M6 6.0, brief §3 step 4): the email gate. Idempotent —
// leads.reportId is unique, so a re-submit updates rather than duplicates.
// Room count writes through to hotels.room_count, which the report's revenue
// math recomputes from at render (deterministic engines only — CLAUDE.md
// rule 2). Consent notice is rendered with the form (brief §12).
// Hardening (M8): per-IP rate limit (the delivery chain emails a
// user-supplied address and posts to CRM — unthrottled it's an abuse vector)
// and delivery only on the FIRST unlock (re-submits never re-fire emails).
import { headers } from "next/headers";
import { after } from "next/server";
import { createHash } from "node:crypto";
import { and, eq, gte, sql } from "drizzle-orm";
import { z } from "zod";
import { events, hotels, leads, reports } from "@uplayer/shared/db";
import { db } from "@/server/db";
import { deliverUnlockedReport } from "@/server/delivery";

export type UnlockState = { error?: string; done?: boolean };

const unlockSchema = z.object({
  token: z.string().min(10).max(64),
  email: z.string().email().max(200),
  name: z.string().min(2).max(120),
  role: z.string().min(2).max(120),
  roomCount: z.coerce.number().int().min(1).max(5000),
});

// dev is generous; prod tight — the delivery chain makes this worth protecting
const UNLOCKS_PER_HOUR = process.env.NODE_ENV === "production" ? 5 : 30;

export async function unlockReport(_prev: UnlockState, formData: FormData): Promise<UnlockState> {
  const parsed = unlockSchema.safeParse({
    token: String(formData.get("token") ?? ""),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    name: String(formData.get("name") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    roomCount: String(formData.get("roomCount") ?? ""),
  });
  if (!parsed.success) {
    return { error: "Check the fields — a work email, your name, role and a room count are required." };
  }
  const { token, email, name, role, roomCount } = parsed.data;

  const [report] = await db
    .select({ id: reports.id, unlocked: reports.unlocked, removedAt: reports.removedAt, hotelId: reports.hotelId })
    .from(reports)
    .where(eq(reports.token, token))
    .limit(1);
  if (!report || report.removedAt) return { error: "This report no longer exists." };

  // per-IP rate limit — the delivery chain emails and posts to CRM
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 16);
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const [{ count: recent }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(events)
    .where(and(eq(events.type, "unlocked"), gte(events.createdAt, hourAgo), sql`${events.payload}->>'ip' = ${ipHash}`));
  if (recent >= UNLOCKS_PER_HOUR) {
    return { error: "Too many unlocks from this network — please try again later." };
  }

  // idempotent: leads.report_id is unique — update on re-submit
  await db
    .insert(leads)
    .values({ reportId: report.id, email, name, role, roomCount })
    .onConflictDoUpdate({
      target: leads.reportId,
      set: { email, name, role, roomCount, unlockedAt: new Date() },
    });

  const firstUnlock = !report.unlocked;
  if (firstUnlock) {
    await db.update(reports).set({ unlocked: true, updatedAt: new Date() }).where(eq(reports.id, report.id));
  }
  // room count feeds the revenue math — the report recomputes at render
  await db.update(hotels).set({ roomCount }).where(eq(hotels.id, report.hotelId));

  await db.insert(events).values({
    reportId: report.id,
    type: "unlocked",
    payload: { reUnlocked: !firstUnlock, ip: ipHash },
  });

  // PDF → email → sales alert → CRM: first unlock only (re-submits never
  // re-fire emails); best-effort, never blocks the unlock (docs/01 §5)
  if (firstUnlock) {
    after(async () => {
      await deliverUnlockedReport(report.id);
    });
  }

  return { done: true };
}
