// HMAC-SHA256 request auth (docs/01-architecture.md §3): signature over
// `${timestamp}.${rawBody}` with a ±5 min window. Every route requires it
// when WORKER_SHARED_SECRET is set; unset = local dev mode (no auth).
import { createHmac, timingSafeEqual } from "node:crypto";

export function signRequest(secret: string, timestamp: string, body: string): string {
  return createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
}

export function verifyRequest(
  secret: string,
  timestamp: string,
  body: string,
  signature: string,
  windowMs = 5 * 60_000,
): boolean {
  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(Date.now() - ts) > windowMs) return false;
  const expected = Buffer.from(signRequest(secret, timestamp, body), "hex");
  const provided = Buffer.from(signature, "hex");
  return expected.length === provided.length && timingSafeEqual(expected, provided);
}
