// Worker boundary contracts (docs/01-architecture.md §3, docs/06 §3).
// zod at every boundary: the worker validates requests and shapes responses,
// the web client re-validates responses before trusting them.
import { z } from "zod";

export const crawlRequestSchema = z.object({
  url: z.string().url(),
  maxPages: z.number().int().min(1).max(25).default(25),
});
export type CrawlRequest = z.infer<typeof crawlRequestSchema>;

export const crawledPageSchema = z.object({
  url: z.string(),
  status: z.number(),
  html: z.string(),
  title: z.string().nullable(),
  loadMs: z.number(),
});
export type CrawledPage = z.infer<typeof crawledPageSchema>;

export const crawlResultSchema = z.object({
  pages: z.array(crawledPageSchema).max(25),
  // engine-ish paths that answered 401/403 (Dolli learning 3 — presence inferred, not blocked-silently)
  blocked: z.array(z.object({ url: z.string(), status: z.number() })),
  engineBlocked: z.boolean(),
  degraded: z.array(z.string()),
});
export type CrawlResult = z.infer<typeof crawlResultSchema>;

export const mobileRequestSchema = z.object({
  url: z.string().url(),
});
export type MobileRequest = z.infer<typeof mobileRequestSchema>;

// Shape mirrors ScoreInput["mobile"] (engines/score.ts §6).
export const mobileResultSchema = z.object({
  ok: z.boolean(),
  status: z.number().nullable(),
  loadMs: z.number(),
  horizontalOverflow: z.boolean(),
  tapTargetsOk: z.boolean(),
});
export type MobileResult = z.infer<typeof mobileResultSchema>;
