// Brief §15 constants — the CEO's open decisions live here (CLAUDE.md rule 6).
export const TOOL_NAME = "Booking Upsell Report";
export const DEFAULTS = {
  occupancy: 0.65,
  avgStayNights: 2.2,
  currentUpsellRevenue: 0,
  buildPrice: 15_000,
  careYearly: 1_000,
  careMonths: 36,
  takeRateLow: 0.08,
  takeRateHigh: 0.15,
  saasCommission: 0.1,
  saasPerRoomMonthly: 4,
} as const;

export const SCORE_MAX = 100;

export * from "./db/schema";
export * from "./engines";
export * from "./contracts";
export * from "./hmac";
export * from "./crawl-common";
