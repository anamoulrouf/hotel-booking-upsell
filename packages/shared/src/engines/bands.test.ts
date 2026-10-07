import { describe, expect, it } from "vitest";
import { captureRate, grade, spendPerBooking } from "./index";

describe("spendPerBooking", () => {
  it("bands by OTA nightly rate", () => {
    expect(spendPerBooking(80)).toBe(60);
    expect(spendPerBooking(150)).toBe(95);
    expect(spendPerBooking(300)).toBe(150);
    expect(spendPerBooking(500)).toBe(250);
    expect(spendPerBooking(1220)).toBe(450); // The Dolli, unbumped
    expect(spendPerBooking(2000)).toBe(750);
  });

  it("bumps one band for 4★+ and caps", () => {
    expect(spendPerBooking(1220, 5)).toBe(750); // The Dolli, bumped
    expect(spendPerBooking(80, 4)).toBe(95);
    expect(spendPerBooking(2000, 5)).toBe(750);
  });

  it("falls back to the $95 baseline when price unknown", () => {
    expect(spendPerBooking(null)).toBe(95);
    expect(spendPerBooking(undefined, 5)).toBe(95);
    expect(spendPerBooking(Number.NaN)).toBe(95);
  });
});

describe("grade + capture", () => {
  it("grades on the brief's cutoffs", () => {
    expect(grade(90)).toBe("A");
    expect(grade(70)).toBe("B");
    expect(grade(62)).toBe("C"); // fixture A golden
    expect(grade(45)).toBe("D");
    expect(grade(39)).toBe("F");
  });

  it("interpolates capture within grade bands (The Dolli: 45 → D ≈ 30.36%)", () => {
    expect(captureRate(45)).toBeCloseTo(0.3036, 3);
    expect(captureRate(0)).toBeCloseTo(0.1, 5);
    expect(captureRate(100)).toBeCloseTo(0.7, 5);
  });
});
