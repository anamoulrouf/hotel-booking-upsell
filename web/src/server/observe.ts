// M1.5 heuristic observation layer: turns crawled HTML into the score inputs.
// Honest and labeled: these are keyword/price scans, not LLM extraction — the
// LLM extractor (M3) replaces them when ANTHROPIC_API_KEY is configured.
import type { PackageObservation } from "@uplayer/shared";

export type PackageScan = {
  observations: PackageObservation[];
  items: { name: string; pageKind: string; priceFrom?: number; currency: string }[];
  buyAffordance: boolean;
  personalizationSignals: string[];
};

const PRICE_RE = /(?:[$€£]\s?|(?:(?:from|only)\s)?)(\d{1,5}(?:[.,]\d{2})?)\s?(?:$|€|£|per\s(?:night|person|stay|hour))/i;
const HEADING_RE = /<h[1-3][^>]*>([^<]{4,80})<\/h[1-3]>/gi;
const TAG_STRIP = /<[^>]+>/g;

const ITEM_HINTS =
  /\b(breakfast|dinner|lunch|brunch|spa|massage|transfer|taxi|pickup|parking|valet|tour|experience|picnic|champagne|prosecco|wine|cocktail|bouquet|flowers|celebration|anniversary|birthday|babysitting|bicycle|bike rental|late check-?out|early check-?in|upgrade|airport|boat|helicopter|kayak|yoga|training)\b/i;

const INCLUDED_PATTERNS =
  /\b(breakfast|buffet breakfast|continental breakfast)[^.]{0,40}\b(?:is\s)?(?:included|complimentary|included in (?:the|your|all) (?:rate|price|booking|stay))/i;

const BUY_PATTERNS =
  /\b(add to (?:my )?(?:booking|stay|reservation)|book (?:this |your )?(?:extra|package|now)|add extras?|buy now|reserve now)\b/i;

const PERSONALIZATION_PATTERNS: { signal: string; re: RegExp }[] = [
  { signal: "recommended-for-you blocks", re: /recommended for you|picked for you|suggested for you/i },
  { signal: "guest-type targeting", re: /families|couples|business travelers.{0,60}(?:offer|package|deal)/i },
  { signal: "dynamic upgrade offers", re: /upgrade (?:your|to a).{0,30}(?:available|offer)/i },
];

function stripTags(s: string): string {
  return s.replace(TAG_STRIP, " ").replace(/\s+/g, " ").trim();
}

export function observePackages(pages: { kind: string | null; textContent: string | null }[]): PackageScan {
  const observations: PackageObservation[] = [];
  const items: PackageScan["items"] = [];
  let buyAffordance = false;
  const personalizationSignals: string[] = [];
  let breakfastIncluded = false;

  for (const page of pages) {
    const html = page.textContent ?? "";
    if (!html) continue;
    if (INCLUDED_PATTERNS.test(html)) breakfastIncluded = true;
    if (BUY_PATTERNS.test(html)) buyAffordance = true;
    for (const p of PERSONALIZATION_PATTERNS) {
      if (p.re.test(html) && !personalizationSignals.includes(p.signal)) personalizationSignals.push(p.signal);
    }

    // Headings on offer-ish pages become candidate items; a nearby price marks
    // them priced. Window starts at the raw match index — indexOf(name) can
    // miss after tag-stripping collapses whitespace.
    const isOfferish = /offers|packages|experiences|dining|spa|activities|tours|faq/i.test(page.kind ?? "") || ITEM_HINTS.test(stripTags(html).slice(0, 2000));
    if (!isOfferish) continue;

    for (const m of [...html.matchAll(HEADING_RE)].slice(0, 24)) {
      const name = stripTags(m[1]);
      if (!ITEM_HINTS.test(name)) continue;
      const start = m.index ?? 0;
      const window = html.slice(start, start + 600);
      const priceMatch = window.match(PRICE_RE);
      const price = priceMatch ? Number(priceMatch[1].replace(",", ".")) : undefined;
      const hasDescription = /<p[\s>]/i.test(window);
      const hasPhoto = /<img[\s>]/i.test(window);
      if (items.some((i) => i.name.toLowerCase() === name.toLowerCase())) continue;
      items.push({ name, pageKind: page.kind ?? "page", priceFrom: price, currency: window.includes("€") ? "EUR" : "USD" });
      observations.push({
        hasPrice: price != null,
        hasDescription,
        hasPhoto,
        included: breakfastIncluded && /breakfast/i.test(name),
      });
      if (observations.length >= 25) break;
    }
    if (observations.length >= 25) break;
  }

  return { observations, items, buyAffordance, personalizationSignals };
}

// Buy affordance + personalization signals on their own (score step re-derives
// these from stored pages — steps share state via the DB, not memory).
export function scanSignals(pages: { textContent: string | null }[]): {
  buyAffordance: boolean;
  personalizationSignals: string[];
} {
  let buyAffordance = false;
  const personalizationSignals: string[] = [];
  for (const page of pages) {
    const html = page.textContent ?? "";
    if (!html) continue;
    if (BUY_PATTERNS.test(html)) buyAffordance = true;
    for (const pattern of PERSONALIZATION_PATTERNS) {
      if (pattern.re.test(html) && !personalizationSignals.includes(pattern.signal)) {
        personalizationSignals.push(pattern.signal);
      }
    }
  }
  return { buyAffordance, personalizationSignals };
}
