// Upsell score: 6 areas, 100 points (docs/04-scoring-roi.md §1).
// Deterministic — the LLM never assigns scores.
import { grade, type Grade } from "./score-grade";

export type PackageObservation = {
  hasPrice: boolean;
  hasDescription: boolean;
  hasPhoto: boolean;
  included: boolean;
};

export type ScoreInput = {
  packages: PackageObservation[];
  sellable: {
    engineDetected: string | null;
    engineExtrasKnown: boolean;
    pricedPackageCount: number;
    buyAffordance: boolean;
  };
  reach: {
    upsellToolDetected: boolean;
    reachesBeyondCheckin: boolean;
    manualPaymentLink: boolean;
  };
  mobile: null | { horizontalOverflow: boolean; tapTargetsOk: boolean; loadMs: number };
  personalizationSignals: string[];
};

export type ScoreArea = {
  area: string;
  label: string;
  points: number;
  max: number;
  skipped?: boolean;
  finding: string;
  fix: string;
};

export type ScoreResult = {
  total: number;
  outOf: number;
  pct: number;
  grade: Grade;
  areas: ScoreArea[];
};

const r = (n: number) => Math.round(n);

export function computeScore(input: ScoreInput): ScoreResult {
  const sellable = input.packages.filter((p) => !p.included);

  // 1. Packages exist — 20 (full at 6+)
  const found = sellable.length;
  const packagesPts = r(Math.min(20, found * (20 / 6)));
  const areas: ScoreArea[] = [
    {
      area: "packages",
      label: "Packages exist",
      max: 20,
      points: packagesPts,
      finding:
        found >= 6
          ? `Your website shows ${found} sellable items across your pages.`
          : found > 0
            ? `We could only spot ${found} clearly sellable item${found === 1 ? "" : "s"} on your site.`
            : "We couldn't spot clearly sellable packages on your public pages.",
      fix:
        found >= 6
          ? "Your catalogue is there — the gap is selling it before arrival."
          : "Publish your extras (dining, transfers, late checkout) with names and prices on their own pages.",
    },
  ];

  // 2. Sellable online — 25 (price visible 12 / buy affordance 25 / engine capability 8)
  let sellablePts = 0;
  if (input.sellable.buyAffordance) sellablePts = 25;
  else if (input.sellable.pricedPackageCount >= 3) sellablePts = 12;
  else if (input.sellable.engineExtrasKnown && input.sellable.engineDetected) sellablePts = 8;
  areas.push({
    area: "sellable",
    label: "Packages are sellable online",
    max: 25,
    points: sellablePts,
    finding:
      sellablePts >= 25
        ? "Guests can buy extras end-to-end in your booking flow."
        : sellablePts === 12
          ? `${input.sellable.pricedPackageCount} items show prices, but there's no buy button in the booking flow.`
          : sellablePts === 8
            ? `Your booking engine (${input.sellable.engineDetected}) supports add-ons, but we couldn't confirm they're set up.`
            : "We found no way to buy an extra online.",
    fix:
      sellablePts >= 25
        ? "Focus on reaching guests earlier and personalising the offers."
        : "Show prices and a buy/reserve button for each extra, inside the booking flow.",
  });

  // 3. Pre-arrival reach — 20 (tool 12, beyond check-in 8; manual payment link +4 within cap)
  let reachPts = 0;
  if (input.reach.upsellToolDetected) reachPts += 12;
  if (input.reach.reachesBeyondCheckin) reachPts += 8;
  if (input.reach.manualPaymentLink) reachPts = Math.min(20, reachPts + 4);
  areas.push({
    area: "reach",
    label: "Pre-arrival reach",
    max: 20,
    points: reachPts,
    finding: input.reach.upsellToolDetected
      ? input.reach.reachesBeyondCheckin
        ? "An upsell/pre-arrival tool is in place and reaches guests beyond check-in."
        : "An upsell tool is in place, but mostly at check-in."
      : input.reach.manualPaymentLink
        ? "No upsell tool detected — but you email payment links by hand after booking, so pre-arrival selling is already half-manual."
        : "No pre-arrival upsell tool detected — offers reach guests only at the front desk.",
    fix: input.reach.upsellToolDetected
      ? "Two automated touches (confirmation + 7–12 days out) typically lift take rate."
      : "Reach every booking automatically before arrival — email is the core channel, OTA guests included.",
  });

  // 4. Presentation — 15 (share of packages with photo+price+description)
  const full = sellable.filter((p) => p.hasPrice && p.hasDescription && p.hasPhoto).length;
  const presentationPts = sellable.length ? r((15 * full) / sellable.length) : 0;
  areas.push({
    area: "presentation",
    label: "Package presentation",
    max: 15,
    points: presentationPts,
    finding: sellable.length
      ? `${full} of ${sellable.length} sellable items show a photo, a price and a description.`
      : "No packages found to assess presentation.",
    fix: "Every extra should show a photo, a price and a two-line description — that's what converts.",
  });

  // 5. Personalization — 10 (rare; most hotels score 0–3)
  const personalizationPts = r(Math.min(10, input.personalizationSignals.length * 5));
  areas.push({
    area: "personalization",
    label: "Personalization",
    max: 10,
    points: personalizationPts,
    finding: personalizationPts
      ? `Signals of guest-specific offers: ${input.personalizationSignals.join(", ")}.`
      : "Every guest currently sees the same offers.",
    fix: "Match offers to the booking (party size, stay length, channel) — worth 10–30% more per offer in comparable industries.",
  });

  // 6. Mobile — 10 (skipped when the check couldn't run)
  let mobilePts = 0;
  if (input.mobile) {
    mobilePts = (input.mobile.horizontalOverflow ? 0 : 4) + (input.mobile.tapTargetsOk ? 3 : 0) + (input.mobile.loadMs <= 3000 ? 3 : 0);
    areas.push({
      area: "mobile",
      label: "Mobile booking experience",
      max: 10,
      points: mobilePts,
      finding: `Booking page at phone width: ${input.mobile.horizontalOverflow ? "layout overflows" : "layout holds"}, loads in ${(input.mobile.loadMs / 1000).toFixed(1)}s.`,
      fix: "Your booking flow is where mobile guests give up — check it at 390px width.",
    });
  } else {
    areas.push({
      area: "mobile",
      label: "Mobile booking experience",
      max: 10,
      points: 0,
      skipped: true,
      finding: "Not checked in this build.",
      fix: "Rendered check at phone width arrives in M2.",
    });
  }

  const total = areas.reduce((s, a) => s + a.points, 0);
  const outOf = areas.reduce((s, a) => s + (a.skipped ? 0 : a.max), 0);
  const pct = outOf === 0 ? 0 : (total / outOf) * 100;
  return { total, outOf, pct, grade: grade(pct), areas };
}
