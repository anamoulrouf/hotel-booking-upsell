// Missed-revenue and ROI math (docs/04-scoring-roi.md §2–3).
// Deterministic — the LLM never computes money.
import { spendPerBooking } from "./bands";
import { captureBands } from "./capture";

/** Current-capture share of potential, from the scaled score (0–100). */
export function captureRate(scorePct: number): number {
  const pct = Math.min(100, Math.max(0, scorePct));
  // half-open bands (climbing) — the curve is continuous across boundaries
  // (each band's hiCapture equals the next band's loCapture), so fractional
  // scores that land past a band's hi resolve into the next band instead of
  // falling through to F and extrapolating wild capture rates.
  const band = captureBands.find((b) => pct <= b.hi) ?? captureBands[captureBands.length - 1];
  const span = band.hi - band.lo;
  const t = span === 0 ? 0 : (pct - band.lo) / span;
  return band.loCapture + t * (band.hiCapture - band.loCapture);
}

export type MissedRevenueInput = {
  rooms: number; // required — the caller shows "add room count" when unknown
  occupancy: number; // 0–1
  avgStayNights: number;
  nightlyRate: number | null; // OTA nightly rate, null when unknown
  starRating: number | null;
  takeRateLow: number;
  takeRateHigh: number;
  scorePct: number; // scaled 0–100
};

export type MissedRevenueResult = {
  bookings: number;
  spend: number;
  potentialLow: number;
  potentialHigh: number;
  capture: number;
  missedLow: number;
  missedHigh: number;
};

export function computeMissedRevenue(input: MissedRevenueInput): MissedRevenueResult {
  const bookings = (input.rooms * input.occupancy * 365) / input.avgStayNights;
  const spend = spendPerBooking(input.nightlyRate, input.starRating);
  const potentialLow = bookings * input.takeRateLow * spend;
  const potentialHigh = bookings * input.takeRateHigh * spend;
  const capture = captureRate(input.scorePct);
  return {
    bookings: Math.round(bookings),
    spend,
    potentialLow,
    potentialHigh,
    capture,
    missedLow: potentialLow * (1 - capture),
    missedHigh: potentialHigh * (1 - capture),
  };
}

export type RoiInput = {
  rooms: number;
  occupancy: number;
  avgStayNights: number;
  nightlyRate: number | null;
  starRating: number | null;
  currentUpsellRevenue: number;
  buildPrice: number;
  carePlan: boolean;
  scorePct: number;
  takeRate: number;
};

export type RoiResult = {
  bookings: number;
  projectedYearly: number;
  addedYearly: number;
  paybackMonths: number | null; // null when added revenue ≤ 0
  costUpLayer3yr: number;
  costSaaS3yrCommission: number;
  costSaaS3yrPerRoom: number;
  keptUpLayer3yr: number;
  keptSaaS3yrCommission: number;
  keptSaaS3yrPerRoom: number;
};

export function computeRoi(input: RoiInput): RoiResult {
  const bookings = (input.rooms * input.occupancy * 365) / input.avgStayNights;
  const spend = spendPerBooking(input.nightlyRate, input.starRating);
  const projectedYearly = bookings * input.takeRate * spend;
  const addedYearly = projectedYearly - input.currentUpsellRevenue;
  const costUpLayer3yr = input.buildPrice + (input.carePlan ? 36 * 1000 : 0);
  const costSaaS3yrCommission = 0.1 * projectedYearly * 3;
  const costSaaS3yrPerRoom = 4 * input.rooms * 36;
  return {
    bookings: Math.round(bookings),
    projectedYearly,
    addedYearly,
    paybackMonths: addedYearly > 0 ? input.buildPrice / (addedYearly / 12) : null,
    costUpLayer3yr,
    costSaaS3yrCommission,
    costSaaS3yrPerRoom,
    keptUpLayer3yr: projectedYearly * 3 - costUpLayer3yr,
    keptSaaS3yrCommission: projectedYearly * 3 - costSaaS3yrCommission,
    keptSaaS3yrPerRoom: projectedYearly * 3 - costSaaS3yrPerRoom,
  };
}
