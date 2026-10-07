// Worker: Playwright + Chromium service (docs/01-architecture.md §3).
// M2: /crawl-core, /crawl-ext, /mobile-check live; HMAC-SHA256 auth on every
// route when WORKER_SHARED_SECRET is set (unset = local dev). /pdf lands in M7.
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { crawlRequestSchema, crawlResultSchema, mobileRequestSchema, mobileResultSchema } from "@uplayer/shared";
import { crawlCore } from "./crawl";
import { mobileCheck } from "./mobile";
import { verifyRequest } from "./hmac";

type Env = { Variables: { rawBody: string } };

const app = new Hono<Env>();

// HMAC over `timestamp.rawBody` — read the raw bytes once, stash for handlers.
app.use("*", async (c, next) => {
  const secret = process.env.WORKER_SHARED_SECRET;
  const rawBody = await c.req.text();
  c.set("rawBody", rawBody);
  if (secret) {
    const ts = c.req.header("x-uplayer-timestamp") ?? "";
    const sig = c.req.header("x-uplayer-signature") ?? "";
    if (!verifyRequest(secret, ts, rawBody, sig)) {
      return c.json({ error: "unauthorized" }, 401);
    }
  }
  await next();
});

app.get("/healthz", (c) => c.json({ ok: true }));

const parseBody = (c: { get: (k: "rawBody") => string }): unknown => {
  try {
    return JSON.parse(c.get("rawBody") || "{}");
  } catch {
    return {};
  }
};

const delayMs = () => Number(process.env.CRAWL_DELAY_MS ?? 750);

// Core crawl: robots → priority-seeded BFS ≤ maxPages → rendered HTML + load times
app.post("/crawl-core", async (c) => {
  const parsed = crawlRequestSchema.safeParse(parseBody(c));
  if (!parsed.success) return c.json({ error: "bad request", issues: parsed.error.issues }, 400);
  return c.json(crawlResultSchema.parse(await crawlCore(parsed.data)));
});

// Extended crawl: the full 25-page cap (runs after preview, per docs/01 §2)
app.post("/crawl-ext", async (c) => {
  const parsed = crawlRequestSchema.safeParse(parseBody(c));
  if (!parsed.success) return c.json({ error: "bad request", issues: parsed.error.issues }, 400);
  return c.json(crawlResultSchema.parse(await crawlCore({ ...parsed.data, maxPages: 25 })));
});

// Mobile-quality checks at 390px
app.post("/mobile-check", async (c) => {
  const parsed = mobileRequestSchema.safeParse(parseBody(c));
  if (!parsed.success) return c.json({ error: "bad request", issues: parsed.error.issues }, 400);
  return c.json(mobileResultSchema.parse(await mobileCheck(parsed.data)));
});

// Render report ?print=1 → PDF → Blob key (M7)
app.post("/pdf", (c) => c.json({ error: "pdf lands in a later milestone" }, 501));

const port = Number(process.env.PORT ?? 4310);
serve({ fetch: app.fetch, port }, () => {
  console.log(`worker listening on :${port}`);
});
