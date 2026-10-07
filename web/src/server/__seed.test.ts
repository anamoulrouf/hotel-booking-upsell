// TEMP dev-screenshot seed — v5 dashboard-pass visual check. Deleted after.
import { expect, test } from "vitest";
import { eq } from "drizzle-orm";
import { DEFAULTS, computeMissedRevenue, computeScore } from "@uplayer/shared";
import { detectedTech, events, hotels, packages as packagesTable, pages, reports } from "@uplayer/shared/db";
import { db } from "@/server/db";

const TOKEN = "devshot-rich";

test("seed devshot report", async () => {
  const obs = [
    { hasPrice: true, hasDescription: true, hasPhoto: true, included: false },
    { hasPrice: true, hasDescription: true, hasPhoto: true, included: false },
    { hasPrice: false, hasDescription: true, hasPhoto: true, included: true },
    { hasPrice: true, hasDescription: false, hasPhoto: false, included: false },
    { hasPrice: true, hasDescription: true, hasPhoto: false, included: false },
    { hasPrice: true, hasDescription: true, hasPhoto: true, included: false },
    { hasPrice: false, hasDescription: true, hasPhoto: false, included: false },
  ];
  const score = computeScore({
    packages: obs,
    sellable: { engineDetected: "Mews Booking Engine", engineExtrasKnown: true, pricedPackageCount: 5, buyAffordance: false },
    reach: { upsellToolDetected: false, reachesBeyondCheckin: false, manualPaymentLink: false },
    mobile: null,
    personalizationSignals: ["guest-type targeting"],
  });
  const mr = computeMissedRevenue({
    rooms: 54, occupancy: DEFAULTS.occupancy, avgStayNights: DEFAULTS.avgStayNights,
    nightlyRate: null, starRating: 4,
    takeRateLow: DEFAULTS.takeRateLow, takeRateHigh: DEFAULTS.takeRateHigh, scorePct: score.pct,
  });

  const prior = await db.select({ id: reports.id }).from(reports).where(eq(reports.token, TOKEN));
  for (const r of prior) {
    await db.delete(detectedTech).where(eq(detectedTech.reportId, r.id));
    await db.delete(packagesTable).where(eq(packagesTable.reportId, r.id));
    await db.delete(pages).where(eq(pages.reportId, r.id));
    await db.delete(events).where(eq(events.reportId, r.id));
  }
  await db.delete(reports).where(eq(reports.token, TOKEN));
  await db.delete(hotels).where(eq(hotels.domain, "aurora-devshot.test"));

  const [hotel] = await db.insert(hotels).values({
    domain: "aurora-devshot.test", name: "Hotel Aurora", city: "Lisbon", country: "Portugal",
    starRating: 4, roomCount: 54, sourceFacts: { method: "jsonld", pages: "2" },
  }).returning();

  const [report] = await db.insert(reports).values({
    hotelId: hotel.id, token: TOKEN, status: "preview_ready",
    expiresAt: new Date(Date.now() + 30 * 86_400_000),
    inputs: { occupancy: DEFAULTS.occupancy, avgStayNights: DEFAULTS.avgStayNights, currentUpsellRevenue: 0, buildPrice: DEFAULTS.buildPrice, carePlan: true },
    scoreTotal: score.total, scoreOutOf: score.outOf, scoreGrade: score.grade,
    scoreBreakdown: score.areas.map((a) => ({ area: a.area, label: a.label, points: a.points, max: a.max, skipped: a.skipped ?? false, finding: a.finding, fix: a.fix })),
    missedLow: Math.round(mr.missedLow), missedHigh: Math.round(mr.missedHigh),
    captureRate: mr.capture, priceBand: mr.spend,
    steps: { crawl_core: { state: "done", ms: 3180 }, facts: { state: "done", ms: 640 }, search: { state: "skipped", ms: 20 }, packages: { state: "done", ms: 310 }, score: { state: "done", ms: 12 } },
  }).returning();

  await db.insert(pages).values([
    { reportId: report.id, url: "https://aurora-devshot.test/", kind: "home", httpStatus: 200, textContent: "<html></html>" },
    { reportId: report.id, url: "https://aurora-devshot.test/dining", kind: "dining", httpStatus: 200, textContent: "<html></html>" },
  ]);
  await db.insert(detectedTech).values([
    { reportId: report.id, category: "engine", name: "Mews Booking Engine", evidence: "script match: mews.com" },
    { reportId: report.id, category: "pms", name: "Mews", evidence: "inferred from Mews Booking Engine" },
    { reportId: report.id, category: "upsell_tool", name: "Oaky", evidence: "subdomain match" },
  ]);
  await db.insert(packagesTable).values([
    { reportId: report.id, kind: "found", name: "Guided Lisbon food walk", priceMin: 55, currency: "EUR", category: "local", source: "heuristic-scan:offers", hasPhoto: true, hasPrice: true, hasDescription: true },
    { reportId: report.id, kind: "found", name: "Sunset sail on the Tagus — private", priceMin: 240, currency: "EUR", category: "local", source: "heuristic-scan:offers", hasPhoto: true, hasPrice: true, hasDescription: true },
    { reportId: report.id, kind: "found", name: "Breakfast buffet", priceMin: null, currency: "EUR", category: "food_drink", included: true, source: "heuristic-scan:dining", hasPhoto: true, hasPrice: false, hasDescription: true },
    { reportId: report.id, kind: "found", name: "Late check-out until 14:00", priceMin: 30, currency: "EUR", category: "room_stay", source: "heuristic-scan:faq", hasPhoto: false, hasPrice: true, hasDescription: false },
    { reportId: report.id, kind: "found", name: "Airport transfer, private sedan", priceMin: 48, currency: "EUR", category: "arrival", source: "heuristic-scan:faq", hasPhoto: false, hasPrice: true, hasDescription: true },
    { reportId: report.id, kind: "found", name: "In-room massage, 60 min", priceMin: 85, currency: "EUR", category: "wellness", source: "heuristic-scan:spa", hasPhoto: true, hasPrice: true, hasDescription: true },
  ]);
  await db.insert(events).values({ reportId: report.id, type: "preview_seen", payload: { pages: 2, score: score.total } });
  expect(report.token).toBe(TOKEN);
});
