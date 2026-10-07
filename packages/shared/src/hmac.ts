// HMAC-SHA256 request auth shared by the web caller and the worker
// (docs/01-architecture.md §3): signature over `${timestamp}.${body}` with a
// ±5 min window. One implementation — scheme drift here would 401 every call.
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
