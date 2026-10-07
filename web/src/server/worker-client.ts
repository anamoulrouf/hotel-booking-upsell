// Web-side client for the Fly worker (docs/01 §3). Signs requests with the
// shared HMAC scheme, enforces a timeout, and validates responses against the
// shared zod contracts — returns null on ANY failure so callers fall back.
import { createHmac } from "node:crypto";
import type { ZodType } from "zod";

export function signWorkerRequest(secret: string, timestamp: string, body: string): string {
  return createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
}

export function workerConfigured(): boolean {
  return Boolean(process.env.WORKER_URL);
}

export async function callWorker<T>(
  path: string,
  body: unknown,
  schema: ZodType<T>,
  timeoutMs = 90_000,
): Promise<T | null> {
  const base = process.env.WORKER_URL;
  if (!base) return null;
  const payload = JSON.stringify(body ?? {});
  const ts = String(Date.now());
  const headers: Record<string, string> = { "content-type": "application/json" };
  const secret = process.env.WORKER_SHARED_SECRET;
  if (secret) {
    headers["x-uplayer-timestamp"] = ts;
    headers["x-uplayer-signature"] = signWorkerRequest(secret, ts, payload);
  }
  try {
    const res = await fetch(`${base.replace(/\/$/, "")}${path}`, {
      method: "POST",
      headers,
      body: payload,
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return null;
    const parsed = schema.safeParse(await res.json());
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
