import { describe, expect, it } from "vitest";
import { signRequest, verifyRequest } from "./hmac";

const secret = "test-secret";
const body = JSON.stringify({ url: "https://example.com" });
const ts = String(Date.now());

describe("hmac request auth", () => {
  it("accepts a correctly signed request", () => {
    const sig = signRequest(secret, ts, body);
    expect(verifyRequest(secret, ts, body, sig)).toBe(true);
  });

  it("rejects a tampered body", () => {
    const sig = signRequest(secret, ts, body);
    expect(verifyRequest(secret, ts, `${body} `, sig)).toBe(false);
  });

  it("rejects a wrong secret", () => {
    const sig = signRequest("other", ts, body);
    expect(verifyRequest(secret, ts, body, sig)).toBe(false);
  });

  it("rejects timestamps outside the ±5 min window", () => {
    const old = String(Date.now() - 6 * 60_000);
    const sig = signRequest(secret, old, body);
    expect(verifyRequest(secret, old, body, sig)).toBe(false);
  });

  it("rejects malformed signatures", () => {
    expect(verifyRequest(secret, ts, body, "nothex!!")).toBe(false);
    expect(verifyRequest(secret, "notanumber", body, signRequest(secret, ts, body))).toBe(false);
  });
});
