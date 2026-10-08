// M2 pipeline (docs/01 §2, docs/09 M2): worker-first crawl (Playwright render,
// robots, ≤25 pages) with the M1 fetch-crawler as local fallback, JSON-LD
// facts, fingerprints, heuristic packages, mobile check and the deterministic
// score — split into Inngest-grade steps that share state through the DB.
// runPipeline() composes them for the inline dev path (no Inngest key).
// LLM extraction, packages and OTA search land in M3 (docs/09-milestones.md).
import { and, eq } from "drizzle-orm";
import {
  computeMissedRevenue,
  detectEngines,
  detectManualPaymentLink,
  detectUpsellTools,
  PMS_BY_ENGINE,
  DEFAULTS,
  crawlResultSchema,
  mobileResultSchema,
  type PackageObservation,
  BOOKING_ENGINES,
  CRAWL_UA,
  classifyKind,
  extractLinksWithText,
  extractLinks,
  fetchRobots,
  pickEngineLink,
} from "@uplayer/shared";
import { db } from "@/server/db";
import { detectedTech, events, hotels, packages as packagesTable, pages, reports } from "@uplayer/shared/db";
import { computeScore } from "@uplayer/shared";
import { observePackages, scanSignals } from "@/server/observe";
import { callWorker, workerConfigured } from "@/server/worker-client";
import { getLlmClient } from "@/server/llm/client";
import { extractFactsWithLlm } from "@/server/llm/extract-facts";
import { extractPackagesWithLlm } from "@/server/llm/extract-packages";
import { generateIdeasWithLlm, genericIdeas } from "@/server/llm/generate-ideas";
import { pageTextForLlm } from "@/server/llm/sanitize";
import { searchOtaListing, searchConfigured } from "@/server/search/ota";
import { buildGuestPages } from "@/server/guest-pages";

const CRAWL_DELAY_MS = Number(process.env.CRAWL_DELAY_MS ?? 750);
const FETCH_TIMEOUT_MS = 10_000;
const MAX_BYTES = 2_000_000;
const PREVIEW_CRAWL_PAGES = 12; // phase 1 (docs/01 §2); /crawl-ext tops up to 25 later
const CATEGORY_CANDIDATES = new Set([
  "room_stay", "food_drink", "wellness", "family", "romance", "business", "local", "arrival",
]);

type StepState = "pending" | "running" | "done" | "failed" | "skipped";
type Steps = Record<string, { state: StepState; ms?: number; error?: string }>;

async function setStep(reportId: string, key: string, state: StepState, patch: { ms?: number; error?: string } = {}) {
  const [row] = await db.select({ steps: reports.steps }).from(reports).where(eq(reports.id, reportId));
  const steps: Steps = { ...(row?.steps ?? {}), [key]: { state, ...patch } };
  await db.update(reports).set({ steps, updatedAt: new Date() }).where(eq(reports.id, reportId));
}

async function setStatus(reportId: string, status: "crawling" | "analyzing" | "preview_ready" | "failed") {
  await db.update(reports).set({ status, updatedAt: new Date() }).where(eq(reports.id, reportId));
}

async function setDegraded(reportId: string, notes: string[]) {
  await db.update(reports).set({ degraded: notes, updatedAt: new Date() }).where(eq(reports.id, reportId));
}

async function getDomain(reportId: string): Promise<string | null> {
  const [row] = await db
    .select({ domain: hotels.domain })
    .from(reports)
    .innerJoin(hotels, eq(reports.hotelId, hotels.id))
    .where(eq(reports.id, reportId));
  return row?.domain ?? null;
}

async function getPagesHtml(reportId: string): Promise<string[]> {
  const rows = await db
    .select({ textContent: pages.textContent })
    .from(pages)
    .where(eq(pages.reportId, reportId));
  return rows.map((r) => r.textContent ?? "");
}

// Test/dev override (docs/09 §5): FIXTURE_HOST_MAP="host=url,…" points test
// domains at the local fixture servers so E2E never crawls external sites.
// Unset in production — every real domain crawls https.
function crawlOrigin(domain: string): string {
  const map = process.env.FIXTURE_HOST_MAP;
  if (map) {
    for (const pair of map.split(",")) {
      const [host, url] = pair.split("=");
      if (host?.trim() === domain && url) return url.trim().replace(/\/$/, "");
    }
  }
  return `https://${domain}`;
}

// ——— local fallback crawler (M1): fetch-only, robots-respecting, no render ———
async function fetchPage(url: string): Promise<{ ok: true; text: string } | { ok: false; status?: number }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "user-agent": CRAWL_UA, accept: "text/html,application/xhtml+xml,text/plain" },
      redirect: "follow",
      signal: controller.signal,
    });
    if (!res.ok) return { ok: false, status: res.status };
    const buf = await res.arrayBuffer();
    const text = new TextDecoder("utf-8", { fatal: false }).decode(buf.slice(0, MAX_BYTES));
    return { ok: true, text };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
}

type Facts = {
  name?: string; address?: string; city?: string; country?: string;
  starRating?: number; roomCount?: number;
};

export function extractJsonLdFacts(html: string): Facts {
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  const nodes: Record<string, unknown>[] = [];
  for (const s of scripts) {
    try {
      const parsed = JSON.parse(s[1].trim()) as unknown;
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      for (const n of arr) {
        const obj = n as { "@graph"?: Record<string, unknown>[] };
        nodes.push(obj, ...(obj["@graph"] ?? []));
      }
    } catch {
      /* invalid JSON-LD blocks are common — skip */
    }
  }
  const hotel = nodes.find((n) => {
    const t = (n as { "@type"?: string | string[] })["@type"];
    const types = Array.isArray(t) ? t : [t];
    return types?.some((x) => /Hotel|Motel|LodgingBusiness|Resort|Inn|Hostel|Accommodation/i.test(String(x)));
  }) as
    | { name?: string; address?: Record<string, string>; starRating?: { ratingValue?: string }; numberOfRooms?: string | number; telephone?: string }
    | undefined;
  if (!hotel) return {};
  const a = hotel.address ?? {};
  const rooms = Number(hotel.numberOfRooms);
  return {
    name: hotel.name,
    address: [a.streetAddress, a.addressRegion].filter(Boolean).join(", ") || undefined,
    city: a.addressLocality,
    country: a.addressCountry,
    starRating: hotel.starRating?.ratingValue ? Math.min(5, Math.max(1, Number(hotel.starRating.ratingValue))) : undefined,
    roomCount: Number.isFinite(rooms) && rooms > 0 ? rooms : undefined,
  };
}

function guessCategory(name: string): string {
  const n = name.toLowerCase();
  if (/breakfast|brunch|dinner|lunch|chef|table|bar|room service/.test(n)) return "food_drink";
  if (/spa|massage|wellness|sauna|yoga|training|fitness/.test(n)) return "wellness";
  if (/tour|museum|kayak|boat|helicopter|diving|climbing|experience/.test(n)) return "local";
  if (/transfer|taxi|pickup|airport/.test(n)) return "arrival";
  if (/parking|valet/.test(n)) return "arrival";
  if (/family|kid|baby|child/.test(n)) return "family";
  if (/romance|anniversary|honeymoon|celebration|champagne|flowers/.test(n)) return "romance";
  if (/upgrade|suite|check-?in|check-?out/.test(n)) return "room_stay";
  return "room_stay";
}

// ——— Step 1: crawl (worker-first, robots-respecting local fallback) ———
export async function stepCrawl(reportId: string): Promise<boolean> {
  const t0 = Date.now();
  const fail = async (error: string, reason: string) => {
    await setStep(reportId, "crawl_core", "failed", { ms: Date.now() - t0, error });
    await setStatus(reportId, "failed");
    await db.insert(events).values({ reportId, type: "report_failed", payload: { reason } });
    return false;
  };
  try {
    await setStatus(reportId, "crawling");
    await setStep(reportId, "crawl_core", "running");

    const domain = await getDomain(reportId);
    if (!domain) throw new Error("report row missing");
    const base = new URL(crawlOrigin(domain));

    const crawled: { url: string; kind: string; status: number; html: string; loadMs: number }[] = [];
    const degraded: string[] = [];
    let homeOk = false;

    if (workerConfigured()) {
      const res = await callWorker("/crawl-core", { url: base.origin, maxPages: PREVIEW_CRAWL_PAGES }, crawlResultSchema);
      if (res) {
        // the worker already checked robots — a disallowed site must never be
        // re-crawled by the fallback (CLAUDE.md rule 3)
        if (res.degraded.includes("robots:disallowed")) {
          return fail("robots.txt disallows crawling this site — we won't read it.", "robots_disallowed");
        }
        homeOk = res.pages.some((p) => classifyKind(new URL(p.url).pathname) === "home");
        for (const p of res.pages) {
          crawled.push({ url: p.url, kind: classifyKind(new URL(p.url).pathname), status: p.status, html: p.html, loadMs: p.loadMs });
        }
        degraded.push(...res.degraded);
        if (res.engineBlocked) degraded.push("engine:403");
      } else {
        degraded.push("crawl:worker-failed");
      }
    }

    if (!crawled.length) {
      // local fallback (M1 fetch crawler): no JS rendering, robots-checked
      const robots = await fetchRobots(base.origin);
      if (robots.blockedAll || !robots.allowed("/")) {
        return fail("robots.txt disallows crawling this site — we won't read it.", "robots_disallowed");
      }
      const home = await fetchPage(base.origin);
      if (!home.ok) {
        return fail("homepage unreachable", "unreachable");
      }
      // fetchPage follows redirects (thedolli.com → www.thedolli.com) and the
      // shared same-site link check treats www as the same site
      homeOk = true;
      crawled.push({ url: base.origin, kind: "home", status: 200, html: home.text.slice(0, MAX_BYTES), loadMs: 0 });
      const links = extractLinks(home.text, base);
      const picked: { url: string; kind: string }[] = [];
      for (const link of links) {
        if (picked.length >= PREVIEW_CRAWL_PAGES - 2) break;
        const kind = classifyKind(new URL(link).pathname);
        if (kind !== "page" && !picked.some((p) => p.url === link)) picked.push({ url: link, kind });
      }
      // the booking-engine page carries the engine fingerprint + extras
      // affordance (Dolli learning) — usually cross-origin and white-labeled,
      // so match anchor text and known engine URL markers
      const linksWithText = extractLinksWithText(home.text, base).filter(
        (l) => !picked.some((p) => p.url === l.url),
      );
      const engineLink = pickEngineLink(
        linksWithText,
        BOOKING_ENGINES.flatMap((e) => e.patterns),
      );
      if (engineLink && picked.length < PREVIEW_CRAWL_PAGES - 1) {
        picked.push({ url: engineLink, kind: "engine" });
      }
      for (const p of picked) {
        const pUrl = new URL(p.url);
        const robotsFor = pUrl.origin === base.origin ? robots : await fetchRobots(pUrl.origin);
        if (robotsFor.blockedAll || !robotsFor.allowed(pUrl.pathname)) continue;
        await new Promise((r) => setTimeout(r, robotsFor.crawlDelayMs ?? CRAWL_DELAY_MS));
        const res = await fetchPage(p.url);
        if (res.ok) crawled.push({ url: p.url, kind: p.kind, status: 200, html: res.text.slice(0, MAX_BYTES), loadMs: 0 });
      }
    }

    // idempotent on step retry: replace this report's crawl rows
    await db.delete(pages).where(eq(pages.reportId, reportId));
    if (crawled.length) {
      await db.insert(pages).values(
        crawled.map((p) => ({
          reportId,
          url: p.url,
          kind: p.kind,
          httpStatus: p.status,
          textContent: p.html,
          loadMs: Math.round(p.loadMs) || null,
        })),
      );
    }
    await setDegraded(reportId, degraded);
    await setStep(reportId, "crawl_core", "done", { ms: Date.now() - t0 });
    return homeOk;
  } catch (err) {
    return fail(err instanceof Error ? err.message : String(err), "crawl_error");
  }
}

// ——— Step 2: facts (JSON-LD first; Claude fills only what JSON-LD missed) ———
export async function stepFacts(reportId: string): Promise<void> {
  const t1 = Date.now();
  await setStep(reportId, "facts", "running");
  const htmls = await getPagesHtml(reportId);
  const merged: Facts = {};
  for (const html of htmls) {
    const f = extractJsonLdFacts(html);
    const bag = merged as Record<string, string | number | undefined>;
    for (const [k, v] of Object.entries(f)) {
      if (v != null && bag[k] == null) bag[k] = v;
    }
  }

  // M3: LLM fallback for the fields structured data didn't state (docs/03 §2).
  // Page text is sanitized before sending; the output is schema-stripped.
  let method = "jsonld";
  const missing =
    merged.name == null || merged.roomCount == null || merged.city == null || merged.country == null;
  const client = getLlmClient();
  if (missing && client && htmls.length) {
    try {
      const llmFacts = await extractFactsWithLlm(
        client,
        htmls.map((html) => pageTextForLlm(html)),
      );
      const bag = merged as Record<string, string | number | undefined>;
      for (const [k, v] of Object.entries(llmFacts)) {
        if (v != null && bag[k] == null) bag[k] = v;
      }
      if (Object.keys(llmFacts).length) method = "jsonld+llm";
    } catch {
      // LLM unavailable or malformed output — deterministic facts stand alone
    }
  }

  const hotelIdRow = (await db.select({ id: reports.hotelId }).from(reports).where(eq(reports.id, reportId)).limit(1))[0];
  await db
    .update(hotels)
    .set({
      name: merged.name ?? null,
      address: merged.address ?? null,
      city: merged.city ?? null,
      country: merged.country ?? null,
      starRating: merged.starRating ?? null,
      roomCount: merged.roomCount ?? null,
      sourceFacts: { method, pages: String(htmls.length) },
    })
    .where(eq(hotels.id, hotelIdRow.id));
  await setStep(reportId, "facts", "done", { ms: Date.now() - t1 });
}

// ——— Step 3: fingerprints + packages (LLM extraction, heuristic fallback) ———
export async function stepPackages(reportId: string): Promise<void> {
  const t2 = Date.now();
  await setStep(reportId, "search", "running");
  const htmls = await getPagesHtml(reportId);
  const engine = detectEngines(htmls);
  const tools = detectUpsellTools(htmls);
  const manualPay = detectManualPaymentLink(htmls);

  const techRows = [
    ...(engine ? [{ reportId, category: "engine" as const, name: engine.hit.name, evidence: engine.hit.evidence }] : []),
    ...tools.upsell.map((u) => ({ reportId, category: "upsell_tool" as const, name: u.name, evidence: u.evidence })),
    ...tools.widgets.map((w) => ({ reportId, category: "widget" as const, name: w, evidence: "script match" })),
    ...(manualPay ? [{ reportId, category: "payment_link_manual" as const, name: manualPay.name, evidence: manualPay.evidence }] : []),
    ...(engine && PMS_BY_ENGINE[engine.hit.name]
      ? [{ reportId, category: "pms" as const, name: PMS_BY_ENGINE[engine.hit.name], evidence: `inferred from ${engine.hit.name}` }]
      : []),
  ];
  if (techRows.length) await db.insert(detectedTech).values(techRows).onConflictDoNothing();
  await setStep(reportId, "search", "skipped", { ms: Date.now() - t2, error: "OTA listing search runs in the score step (Tavily)" });

  const t3 = Date.now();
  await setStep(reportId, "packages", "running");
  const crawledPages = await db
    .select({ url: pages.url, kind: pages.kind, textContent: pages.textContent })
    .from(pages)
    .where(eq(pages.reportId, reportId));
  const scan = observePackages(crawledPages);

  // M3: LLM extraction first; the heuristic scan is the fallback (docs/03 §4).
  const client = getLlmClient();
  const llm = client ? await extractPackagesWithLlm(client, crawledPages.map((p) => ({ url: p.url, kind: p.kind, text: pageTextForLlm(p.textContent ?? "") }))) : null;

  // idempotent on retry
  await db.delete(packagesTable).where(eq(packagesTable.reportId, reportId));

  if (llm && llm.packages.length) {
    const includedItems = llm.includedItems.map((i) => i.item.toLowerCase());
    const rows = llm.packages.map((p) => ({
      reportId,
      kind: "found" as const,
      name: p.name.slice(0, 120),
      description: p.description ?? null,
      priceMin: p.priceMin != null ? Math.round(p.priceMin) : null,
      priceMax: p.priceMax != null ? Math.round(p.priceMax) : null,
      currency: p.currency,
      category: CATEGORY_CANDIDATES.has(p.category) ? p.category : guessCategory(p.name),
      guestFit: null,
      timing: null,
      included:
        p.included ||
        includedItems.some((item) => p.name.toLowerCase().includes(item)),
      source: "haiku",
      sourceUrl: p.sourceUrl ?? null,
      hasPhoto: p.hasPhoto,
      hasPrice: p.hasPrice,
      hasDescription: p.hasDescription,
    }));
    // name-dedupe (lowercase), ≤25 rows
    const seen = new Set<string>();
    const deduped = rows.filter((r) => {
      const key = r.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 25);
    await db.insert(packagesTable).values(deduped);
  } else if (scan.items.length) {
    await db.insert(packagesTable).values(
      scan.items.map((item, i) => ({
        reportId,
        kind: "found" as const,
        name: item.name.slice(0, 120),
        description: null,
        priceMin: item.priceFrom != null ? Math.round(item.priceFrom) : null,
        currency: item.currency,
        category: guessCategory(item.name),
        included: scan.observations[i]?.included ?? false,
        source: `heuristic-scan:${item.pageKind}`,
        hasPhoto: scan.observations[i]?.hasPhoto ?? false,
        hasPrice: scan.observations[i]?.hasPrice ?? false,
        hasDescription: scan.observations[i]?.hasDescription ?? false,
      })),
    );
  }

  // hotelFacts back-fill (docs/03 §4): only still-null fields, idempotent
  if (llm?.hotelFacts && (llm.hotelFacts.rooms != null || llm.hotelFacts.starRating != null)) {
    const hotelIdRow = (await db.select({ id: reports.hotelId }).from(reports).where(eq(reports.id, reportId)).limit(1))[0];
    const [hotelRow] = await db
      .select({ roomCount: hotels.roomCount, starRating: hotels.starRating })
      .from(hotels)
      .where(eq(hotels.id, hotelIdRow.id));
    await db
      .update(hotels)
      .set({
        roomCount: hotelRow.roomCount ?? llm.hotelFacts.rooms ?? null,
        starRating: hotelRow.starRating ?? llm.hotelFacts.starRating ?? null,
      })
      .where(eq(hotels.id, hotelIdRow.id));
  }

  await setStep(reportId, "packages", "done", { ms: Date.now() - t3 });
}

// ——— Step 4.5: package ideas (sonnet; generic fallback, labeled) ———
export async function stepIdeas(reportId: string): Promise<void> {
  const t = Date.now();
  await setStep(reportId, "ideas", "running");
  const hotelIdRow = (await db.select({ id: reports.hotelId }).from(reports).where(eq(reports.id, reportId)).limit(1))[0];
  const [hotelRow] = await db
    .select({ name: hotels.name, city: hotels.city, starRating: hotels.starRating })
    .from(hotels)
    .where(eq(hotels.id, hotelIdRow.id));

  const foundRows = await db
    .select({ name: packagesTable.name, included: packagesTable.included })
    .from(packagesTable)
    .where(eq(packagesTable.reportId, reportId));
  const foundNames = foundRows.filter((r) => !r.included).map((r) => r.name);
  const includedItems = foundRows.filter((r) => r.included).map((r) => r.name);

  const client = getLlmClient();
  const ideas =
    client && hotelRow
      ? await generateIdeasWithLlm(client, {
          name: hotelRow.name ?? "this hotel",
          city: hotelRow.city,
          starRating: hotelRow.starRating,
          foundPackages: foundNames,
          includedItems,
          amenities: [],
        })
      : null;
  const finalIdeas = ideas ?? genericIdeas();
  const source = ideas ? "sonnet" : "generic-list";

  // idempotent on retry — suggested rows only; found rows are untouched
  await db
    .delete(packagesTable)
    .where(and(eq(packagesTable.reportId, reportId), eq(packagesTable.kind, "suggested")));
  await db.insert(packagesTable).values(
    finalIdeas.map((idea) => ({
      reportId,
      kind: "suggested" as const,
      name: idea.name.slice(0, 120),
      description: idea.oneLine,
      priceMin: idea.priceLow != null ? Math.round(idea.priceLow) : null,
      priceMax: idea.priceHigh != null ? Math.round(idea.priceHigh) : null,
      currency: "USD",
      category: idea.category,
      guestFit: idea.guestFit ?? null,
      timing: idea.timing ?? null,
      source,
    })),
  );
  await setStep(reportId, "ideas", "done", { ms: Date.now() - t });
}

// ——— Step 4.6: sample guest pages (deterministic matcher + brand) ———
export async function stepGuestPages(reportId: string): Promise<void> {
  const t = Date.now();
  await setStep(reportId, "guests", "running");
  await buildGuestPages(reportId);
  await setStep(reportId, "guests", "done", { ms: Date.now() - t });
}

// ——— Step 4: mobile check + deterministic score + missed revenue ———
export async function stepScore(reportId: string): Promise<void> {
  const t4 = Date.now();
  await setStatus(reportId, "analyzing");
  await setStep(reportId, "score", "running");

  const htmls = await getPagesHtml(reportId);
  const engine = detectEngines(htmls);
  const tools = detectUpsellTools(htmls);
  const manualPay = detectManualPaymentLink(htmls);
  const signals = scanSignals((await db.select({ textContent: pages.textContent }).from(pages).where(eq(pages.reportId, reportId))));
  const domain = await getDomain(reportId);

  // mobile check via worker; skip honestly when unavailable
  let mobile: { horizontalOverflow: boolean; tapTargetsOk: boolean; loadMs: number } | null = null;
  const degradedNotes: string[] = [];
  if (domain) {
    const res = await callWorker("/mobile-check", { url: crawlOrigin(domain) }, mobileResultSchema, 30_000);
    if (res && res.ok) {
      mobile = { horizontalOverflow: res.horizontalOverflow, tapTargetsOk: res.tapTargetsOk, loadMs: res.loadMs };
    } else if (workerConfigured()) {
      degradedNotes.push("mobile:worker-failed");
    }
  }

  const pkgRows = await db
    .select({
      hasPrice: packagesTable.hasPrice,
      hasDescription: packagesTable.hasDescription,
      hasPhoto: packagesTable.hasPhoto,
      included: packagesTable.included,
    })
    .from(packagesTable)
    .where(eq(packagesTable.reportId, reportId));
  const observations: PackageObservation[] = pkgRows.map((r) => ({
    hasPrice: r.hasPrice,
    hasDescription: r.hasDescription,
    hasPhoto: r.hasPhoto,
    included: r.included,
  }));

  const score = computeScore({
    packages: observations,
    sellable: {
      engineDetected: engine?.hit.name ?? null,
      engineExtrasKnown: engine?.extrasKnown ?? false,
      pricedPackageCount: pkgRows.filter((r) => r.hasPrice).length,
      buyAffordance: signals.buyAffordance,
    },
    reach: {
      upsellToolDetected: tools.upsell.length > 0,
      reachesBeyondCheckin: tools.beyondCheckin,
      manualPaymentLink: manualPay != null,
    },
    mobile,
    personalizationSignals: signals.personalizationSignals,
  });

  const hotelIdRow = (await db.select({ id: reports.hotelId }).from(reports).where(eq(reports.id, reportId)).limit(1))[0];
  const [hotelRow] = await db
    .select({ roomCount: hotels.roomCount, starRating: hotels.starRating, name: hotels.name, city: hotels.city })
    .from(hotels)
    .where(eq(hotels.id, hotelIdRow.id));

  // OTA search (docs/03 §1 data point 2): nightly rate feeds the price band —
  // garbage or missing key ⇒ null ⇒ the $95 baseline band applies (labeled)
  let nightlyRate: number | null = null;
  let otaStar: number | null = null;
  if (hotelRow?.name && searchConfigured()) {
    const listing = await searchOtaListing({ name: hotelRow.name, city: hotelRow.city });
    nightlyRate = listing?.nightlyRate ?? null;
    otaStar = listing?.starRating ?? null;
  }

  let missed: { low: number; high: number; capture: number; spend: number } | null = null;
  if (hotelRow?.roomCount) {
    const mr = computeMissedRevenue({
      rooms: hotelRow.roomCount,
      occupancy: DEFAULTS.occupancy,
      avgStayNights: DEFAULTS.avgStayNights,
      nightlyRate,
      starRating: hotelRow.starRating ?? otaStar,
      takeRateLow: DEFAULTS.takeRateLow,
      takeRateHigh: DEFAULTS.takeRateHigh,
      scorePct: score.pct,
    });
    missed = { low: Math.round(mr.missedLow), high: Math.round(mr.missedHigh), capture: mr.capture, spend: mr.spend };
  }

  const [existing] = await db.select({ degraded: reports.degraded }).from(reports).where(eq(reports.id, reportId));
  await db
    .update(reports)
    .set({
      scoreTotal: score.total,
      scoreOutOf: score.outOf,
      scoreGrade: score.grade,
      scoreBreakdown: score.areas.map((a) => ({
        area: a.area,
        label: a.label,
        points: a.points,
        max: a.max,
        skipped: a.skipped ?? false,
        finding: a.finding,
        fix: a.fix,
      })),
      missedLow: missed?.low ?? null,
      missedHigh: missed?.high ?? null,
      captureRate: missed?.capture ?? null,
      priceBand: missed?.spend ?? null,
      degraded: [...(existing?.degraded ?? []), ...degradedNotes],
      updatedAt: new Date(),
    })
    .where(eq(reports.id, reportId));
  await setStep(reportId, "score", "done", { ms: Date.now() - t4 });
  await setStatus(reportId, "preview_ready");
  await db.insert(events).values({ reportId, type: "preview_seen", payload: { pages: htmls.length, score: score.total } });
}

// Failure marker for the Inngest path: when a step exhausts its retries the
// error leaves the function — without this the report would poll forever.
export async function markPipelineFailed(reportId: string, err: unknown): Promise<void> {
  await setStep(reportId, "pipeline", "failed", { error: err instanceof Error ? err.message : String(err) });
  await setStatus(reportId, "failed");
  await db.insert(events).values({ reportId, type: "report_failed", payload: { reason: "pipeline_error" } });
}

// ——— composed path for inline dev runs (no Inngest key) ———
export async function runPipeline(reportId: string): Promise<void> {
  try {
    const crawled = await stepCrawl(reportId);
    if (!crawled) return;
    await stepFacts(reportId);
    await stepPackages(reportId);
    await stepScore(reportId);
    await stepIdeas(reportId);
    await stepGuestPages(reportId);
  } catch (err) {
    await setStep(reportId, "pipeline", "failed", { error: err instanceof Error ? err.message : String(err) });
    await setStatus(reportId, "failed");
    await db.insert(events).values({ reportId, type: "report_failed", payload: { reason: "pipeline_error" } });
  }
}
