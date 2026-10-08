// Sample guest pages (brief §6, docs/03 §4.2): three fictional bookings
// 30 days out, each matched 3–5 packages by category affinity — found
// packages first, suggested ideas after (marked). Per-guest lines are
// deterministic templates (no hallucination risk); the payment pair is
// rendered disabled by the UI, never by the LLM.
import { and, eq } from "drizzle-orm";
import { hotels, packages as packagesTable, pages, reports, samplePages } from "@uplayer/shared/db";
import { db } from "@/server/db";

export const GUEST_PROFILES = [
  {
    id: "family" as const,
    label: "The family",
    party: "2 adults + 2 kids",
    nights: 3,
    channel: "Expedia",
    leadDays: 30,
    roomType: "Family room",
    categoryOrder: ["family", "food_drink", "arrival", "local", "room_stay", "wellness", "romance", "business"],
  },
  {
    id: "couple" as const,
    label: "The couple",
    party: "2 adults",
    nights: 2,
    channel: "Booking.com",
    leadDays: 21,
    roomType: "Junior suite",
    categoryOrder: ["romance", "wellness", "food_drink", "room_stay", "local", "arrival", "family", "business"],
  },
  {
    id: "business" as const,
    label: "The business guest",
    party: "1 adult",
    nights: 1,
    channel: "Direct",
    leadDays: 3,
    roomType: "Standard king",
    categoryOrder: ["business", "arrival", "room_stay", "food_drink", "wellness", "local", "family", "romance"],
  },
];

// per-profile, per-category reason lines — deterministic, honest
const LINES: Record<string, Record<string, string>> = {
  family: {
    family: "Room for four, booked before the car is packed",
    food_drink: "Breakfast covers the whole family on day one",
    arrival: "A transfer that waits for four at arrivals",
    local: "Something for the kids beyond the hotel wifi",
    room_stay: "Space for four without the squeeze",
    wellness: "An hour of quiet while the kids are covered",
    romance: "A table for two after bedtime",
    business: "The wifi is fast enough for the laptop too",
  },
  couple: {
    romance: "Sets the tone for the weekend",
    wellness: "An hour for two, booked before you pack",
    food_drink: "A table for two, no calling ahead",
    room_stay: "The better room, confirmed early",
    local: "See the town like locals do",
    arrival: "From door to lobby without logistics",
    family: "Space if the family tags along",
    business: "Flexible enough for a working Friday",
  },
  business: {
    business: "Invoice-ready and aligned to the meeting",
    arrival: "Lands you at the door on time",
    room_stay: "Late checkout aligned to the evening flight",
    food_drink: "Dinner without leaving the building",
    wellness: "A gym slot before the first call",
    local: "One evening worth remembering",
    family: "Extend to the weekend without rebooking",
    romance: "Tack the weekend on, same room",
  },
};

export function extractBrand(
  html: string,
  baseUrl: string,
): { logoUrl?: string; primary?: string; heroImages?: string[] } {
  const safeColor = (v: string | undefined) => {
    if (!v) return undefined;
    const t = v.trim();
    return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(t) || /^rgba?\(/i.test(t) || /^hsl\(/i.test(t) ? t : undefined;
  };
  const resolve = (src: string) => {
    try {
      return new URL(src, baseUrl).href;
    } catch {
      return undefined;
    }
  };

  const theme = html.match(/<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']+)["']/i)?.[1];

  // order-independent: match whole tags, then pull the attribute
  const imgTags = [...html.matchAll(/<img[^>]*>/gi)].map((m) => m[0]);
  const logoTag = imgTags.find((t) => /logo|brand/i.test(t));
  const logoSrc = logoTag?.match(/src=["']([^"']+)["']/i)?.[1] ?? undefined;
  const logoUrl = logoSrc ? resolve(logoSrc) : undefined;

  const heroImages = imgTags
    .filter((t) => t !== logoTag && !/icon/i.test(t))
    .map((t) => resolve(t.match(/src=["']([^"']+)["']/i)?.[1] ?? ""))
    .filter((u): u is string => !!u && !/\.svg($|\?)/i.test(u) && !u.startsWith("data:"))
    .slice(0, 3);

  return {
    logoUrl,
    primary: safeColor(theme),
    heroImages,
  };
}

export async function buildGuestPages(reportId: string): Promise<void> {
  const [report] = await db
    .select({ id: reports.id, hotelId: reports.hotelId })
    .from(reports)
    .where(eq(reports.id, reportId));
  if (!report) return;
  const [hotel] = await db.select({ domain: hotels.domain }).from(hotels).where(eq(hotels.id, report.hotelId));

  // brand extraction from the stored homepage HTML (docs/03 §5, HTML-parseable
  // signals; computed styles need the worker render and land in M6.2 polish)
  const [home] = await db
    .select({ textContent: pages.textContent })
    .from(pages)
    .where(and(eq(pages.reportId, reportId), eq(pages.kind, "home")))
    .limit(1);
  const brand: ReturnType<typeof extractBrand> = home?.textContent
    ? extractBrand(home.textContent, `https://${hotel.domain}`)
    : {};
  if (brand.logoUrl || brand.primary || brand.heroImages?.length) {
    await db
      .update(hotels)
      .set({ brandAssets: { logoUrl: brand.logoUrl, primary: brand.primary, heroImages: brand.heroImages } })
      .where(eq(hotels.id, report.hotelId));
  }

  const pool = await db
    .select({
      id: packagesTable.id,
      name: packagesTable.name,
      priceMin: packagesTable.priceMin,
      currency: packagesTable.currency,
      category: packagesTable.category,
      kind: packagesTable.kind,
    })
    .from(packagesTable)
    .where(and(eq(packagesTable.reportId, reportId), eq(packagesTable.included, false)));
  // found packages lead, suggested ideas follow (marked in UI) — explicit sort
  // so the order never depends on enum/DB sort behavior
  pool.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "found" ? -1 : 1));

  for (const profile of GUEST_PROFILES) {
    const picks: { packageId: string; order: number; perGuestLine: string }[] = [];
    for (const cat of profile.categoryOrder) {
      for (const p of pool.filter((x) => x.category === cat)) {
        if (picks.length >= 5) break;
        if (picks.some((x) => x.packageId === p.id)) continue;
        picks.push({
          packageId: p.id,
          order: picks.length + 1,
          perGuestLine: LINES[profile.id][cat] ?? `Picked for the ${profile.label.toLowerCase()}`,
        });
      }
      if (picks.length >= 5) break;
    }
    if (picks.length === 0) continue;

    const booking = {
      nights: profile.nights,
      party: profile.party,
      channel: profile.channel,
      leadDays: profile.leadDays,
      roomType: profile.roomType,
    };
    await db
      .insert(samplePages)
      .values({ reportId, profile: profile.id, booking, picks })
      .onConflictDoUpdate({
        target: [samplePages.reportId, samplePages.profile],
        set: { booking, picks },
      });
  }
}
