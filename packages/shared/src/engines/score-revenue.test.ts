import { describe, expect, it } from "vitest";
import { captureRate, computeMissedRevenue, computeRoi, computeScore } from "./index";

const richPackages = Array.from({ length: 6 }, (_, i) => ({
  hasPrice: i < 4,
  hasDescription: true,
  hasPhoto: i < 2,
  included: false,
}));

describe("computeScore", () => {
  it("scores a strong site (regression golden)", () => {
    const s = computeScore({
      packages: richPackages,
      sellable: { engineDetected: "SynXis", engineExtrasKnown: true, pricedPackageCount: 4, buyAffordance: false },
      reach: { upsellToolDetected: true, reachesBeyondCheckin: true, manualPaymentLink: false },
      mobile: null,
      personalizationSignals: [],
    });
    // packages 20 + sellable 12 + reach 20 + presentation (2/6 full → 5) + pers 0 + mobile skipped
    expect(s.total).toBe(57);
    expect(s.outOf).toBe(90);
    expect(s.grade).toBe("C"); // 57/90 = 63.3%
    expect(s.areas.find((a) => a.area === "mobile")?.skipped).toBe(true);
  });

  it("scores an empty site F with honest findings", () => {
    const s = computeScore({
      packages: [],
      sellable: { engineDetected: null, engineExtrasKnown: false, pricedPackageCount: 0, buyAffordance: false },
      reach: { upsellToolDetected: false, reachesBeyondCheckin: false, manualPaymentLink: false },
      mobile: null,
      personalizationSignals: [],
    });
    expect(s.total).toBe(0);
    expect(s.grade).toBe("F");
    expect(s.areas[0].finding).toContain("couldn't spot");
  });

  it("manual payment link adds +4 inside the reach cap", () => {
    const s = computeScore({
      packages: richPackages,
      sellable: { engineDetected: null, engineExtrasKnown: false, pricedPackageCount: 0, buyAffordance: false },
      reach: { upsellToolDetected: false, reachesBeyondCheckin: false, manualPaymentLink: true },
      mobile: null,
      personalizationSignals: [],
    });
    expect(s.areas.find((a) => a.area === "reach")?.points).toBe(4);
  });
});

describe("computeMissedRevenue — The Dolli worked example", () => {
  it("matches doc 04 §2 goldens ($450 band, 45/D ≈ 30.4% capture)", () => {
    const mr = computeMissedRevenue({
      rooms: 46,
      occupancy: 0.65,
      avgStayNights: 2.2,
      nightlyRate: 1220,
      starRating: 5,
      takeRateLow: 0.08,
      takeRateHigh: 0.15,
      scorePct: 45,
    });
    expect(mr.bookings).toBe(4961);
    expect(mr.spend).toBe(750); // 5★ bump: 450 → 750
    expect(mr.capture).toBeCloseTo(0.3036, 3);
    expect(mr.potentialLow).toBeCloseTo(297_660, -2);
    expect(mr.missedLow).toBeCloseTo(207_200, -3);
    expect(mr.missedHigh).toBeCloseTo(388_400, -3);
  });

  it("unbumped band when star rating unknown", () => {
    const mr = computeMissedRevenue({
      rooms: 46,
      occupancy: 0.65,
      avgStayNights: 2.2,
      nightlyRate: 1220,
      starRating: null,
      takeRateLow: 0.08,
      takeRateHigh: 0.15,
      scorePct: 45,
    });
    expect(mr.spend).toBe(450);
  });
});

describe("computeRoi", () => {
  it("computes payback and 3-year comparison", () => {
    const roi = computeRoi({
      rooms: 46,
      occupancy: 0.65,
      avgStayNights: 2.2,
      nightlyRate: 1220,
      starRating: 5,
      currentUpsellRevenue: 0,
      buildPrice: 15_000,
      carePlan: true,
      scorePct: 45,
      takeRate: 0.115,
    });
    expect(roi.projectedYearly).toBeGreaterThan(400_000);
    expect(roi.paybackMonths).not.toBeNull();
    expect(roi.paybackMonths!).toBeLessThan(12);
    expect(roi.costUpLayer3yr).toBe(51_000);
    expect(roi.costSaaS3yrCommission).toBeCloseTo(roi.projectedYearly * 0.3, 0);
    expect(roi.costSaaS3yrPerRoom).toBe(46 * 4 * 36);
    expect(roi.keptUpLayer3yr).toBeGreaterThan(roi.keptSaaS3yrCommission); // flat beats 30% take
  });

  it("no payback when there is nothing to add", () => {
    const roi = computeRoi({
      rooms: 46, occupancy: 0.65, avgStayNights: 2.2, nightlyRate: null, starRating: null,
      currentUpsellRevenue: 10_000_000, buildPrice: 15_000, carePlan: false, scorePct: 10, takeRate: 0.115,
    });
    expect(roi.paybackMonths).toBeNull();
  });
});

describe("captureRate anchors", () => {
  it("F → ~10%, A → 70%, D(45) ≈ 30.36%", () => {
    expect(captureRate(0)).toBeCloseTo(0.1, 5);
    expect(captureRate(100)).toBeCloseTo(0.7, 5);
    expect(captureRate(45)).toBeCloseTo(0.3036, 3);
  });

  // regression: fractional pct must resolve into the NEXT band (the curve is
  // continuous), never fall through to the F band and extrapolate ~2× missed
  it("fractional scores between bands interpolate continuously", () => {
    expect(captureRate(84.44)).toBeCloseTo(0.7, 5); // top of B, not an F-band 0.425
    expect(captureRate(54.44)).toBeCloseTo(0.394, 3); // just past D, resolving into C
    expect(captureRate(69.5)).toBeCloseTo(0.5446, 3); // just past C, resolving into B
    expect(captureRate(39.5)).toBeCloseTo(0.2446, 3); // just past F, resolving into D
    expect(captureRate(84.44)).toBeGreaterThan(0.6); // the ~2× bug showed as 0.425
  });
});
