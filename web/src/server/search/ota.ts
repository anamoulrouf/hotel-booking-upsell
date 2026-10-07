// OTA listing search (docs/03 §1 data point 2, M3): Tavily finds the hotel's
// Booking.com/Google listing to recover star rating and a nightly rate — the
// nightly rate feeds `spendPerBooking` price bands. SEARCH_BASE_URL points at
// a stub in tests; TAVILY_API_KEY unset ⇒ null (skipped honestly).
import { z } from "zod";

const tavilyResponseSchema = z.object({
  results: z.array(z.object({ title: z.string(), content: z.string(), url: z.string() })).max(10),
});

export type OtaListing = { starRating?: number; nightlyRate?: number };

function clamp(n: number, lo: number, hi: number): number | undefined {
  return Number.isFinite(n) && n >= lo && n <= hi ? n : undefined;
}

export function parseListingFromText(text: string): OtaListing {
  let starRating: number | undefined;
  let nightlyRate: number | undefined;

  // "4-star hotel" / "4 star" / "rated 4 out of 5" / "★★★★"
  // \b stops "12-star" from matching as "2-star"
  const star =
    text.match(/\b([1-5])\s?-?\s?star/i)?.[1] ??
    text.match(/\b([1-5])\s+out of 5/i)?.[1] ??
    text.match(/★{3,5}/)?.[0]?.length?.toString();
  if (star) starRating = clamp(Number(star), 1, 5);

  // "$180 per night" / "from €120/night" / "rates from $95"
  const rate = text.match(/(?:from\s)?[$€£]\s?(\d{2,4})(?:\.\d{2})?\s?(?:\/|\bper\b)?\s?\bnight\b/i)?.[1];
  if (rate) nightlyRate = clamp(Number(rate), 20, 2000);

  return { starRating, nightlyRate };
}

export function searchConfigured(): boolean {
  return Boolean(process.env.TAVILY_API_KEY);
}

export async function searchOtaListing(params: {
  name: string;
  city?: string | null;
}): Promise<OtaListing | null> {
  const key = process.env.TAVILY_API_KEY;
  if (!key) return null;
  const base = process.env.SEARCH_BASE_URL || "https://api.tavily.com";
  const query = `"${params.name}"${params.city ? ` ${params.city}` : ""} booking price per night`;

  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/search`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ api_key: key, query, max_results: 5 }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    const parsed = tavilyResponseSchema.safeParse(await res.json());
    if (!parsed.success) return null;

    const merged: OtaListing = {};
    for (const r of parsed.data.results) {
      const found = parseListingFromText(`${r.title} ${r.content}`);
      merged.starRating ??= found.starRating;
      merged.nightlyRate ??= found.nightlyRate;
      if (merged.starRating && merged.nightlyRate) break;
    }
    return merged.starRating || merged.nightlyRate ? merged : null;
  } catch {
    return null;
  }
}
