// Price-banded spend per buying booking (docs/04-scoring-roi.md §2).
// UpLayer estimate — labeled as such wherever rendered; LLM never runs this math.

export const SPEND_BANDS = [
  { maxNightly: 100, spend: 60, bumped: 95 },
  { maxNightly: 200, spend: 95, bumped: 150 },
  { maxNightly: 400, spend: 150, bumped: 250 },
  { maxNightly: 800, spend: 250, bumped: 450 },
  { maxNightly: 1500, spend: 450, bumped: 750 },
] as const;

export const TOP_BAND_SPEND = 750;
export const UNKNOWN_RATE_SPEND = 95;

/**
 * Spend (USD) per booking that buys at least one pre-arrival item.
 * @param nightlyRate OTA nightly rate, or null when unknown (→ $95 baseline, Revinate).
 * @param starRating 4★+ bumps one band (capped at the top band).
 */
export function spendPerBooking(
  nightlyRate: number | null | undefined,
  starRating?: number | null,
): number {
  if (
    nightlyRate == null ||
    !Number.isFinite(nightlyRate) ||
    nightlyRate <= 0
  ) {
    return UNKNOWN_RATE_SPEND;
  }
  if (nightlyRate >= SPEND_BANDS[SPEND_BANDS.length - 1].maxNightly) {
    return TOP_BAND_SPEND;
  }
  const band = SPEND_BANDS.find((b) => nightlyRate < b.maxNightly)!;
  return starRating != null && starRating >= 4 ? band.bumped : band.spend;
}
