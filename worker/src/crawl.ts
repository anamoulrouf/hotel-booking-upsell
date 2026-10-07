// Core crawl (docs/01 §3): robots → priority-seeded BFS over same-origin
// links, ≤ maxPages (25 cap), polite delay, identified UA, rendered HTML +
// load times. Never submits forms, never books. Public pages only.
// Link/classification rules come from @uplayer/shared (one copy, no drift).
import { chromium } from "playwright";
import {
  type CrawlRequest,
  type CrawlResult,
  type CrawledPage,
  CRAWL_UA,
  PRIORITY,
  canonicalUrl,
  extractLinks,
  fetchRobots,
} from "@uplayer/shared";

const MAX_HTML_BYTES = 500_000;
const PAGE_TIMEOUT_MS = 15_000;
const SCRIPT_SETTLE_MS = 150;

export async function crawlCore(
  req: CrawlRequest,
  opts: { delayMs?: number } = {},
): Promise<CrawlResult> {
  const target = new URL(req.url);
  const robots = await fetchRobots(target.origin);

  const pages: CrawledPage[] = [];
  const blocked: { url: string; status: number }[] = [];
  let engineBlocked = false;
  const degraded: string[] = [];

  if (robots.blockedAll) {
    degraded.push("robots:disallowed");
    return { pages, blocked, engineBlocked, degraded };
  }

  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ userAgent: CRAWL_UA, viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();

    const start = target.origin + (target.pathname === "/" ? "/" : target.pathname);
    const seen = new Set([canonicalUrl(start)]);
    // priority queue first (offers/faq/rooms...), breadth second — the report's
    // most valuable pages are fetched even when the cap cuts the crawl short
    const priorityQueue: string[] = [];
    const breadthQueue: string[] = [start];

    const delay = robots.crawlDelayMs ?? opts.delayMs ?? 750;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    // the cap bounds fetch attempts (success or not) — that's the politeness
    // and time budget; only 200s enter pages[]
    let fetched = 0;
    while (priorityQueue.length + breadthQueue.length > 0 && fetched < req.maxPages) {
      const next = priorityQueue.shift() ?? breadthQueue.shift()!;
      const u = new URL(next);
      if (!robots.allowed(u.pathname)) continue;

      const t0 = Date.now();
      let status = 0;
      let html = "";
      let title: string | null = null;
      try {
        const resp = await page.goto(next, { waitUntil: "load", timeout: PAGE_TIMEOUT_MS });
        status = resp?.status() ?? 0;
        await page.waitForTimeout(SCRIPT_SETTLE_MS); // inline scripts (sparse fixture)
        html = await page.content();
        title = (await page.title().catch(() => "")) || null;
      } catch {
        status = 0;
      }
      const loadMs = Date.now() - t0;
      fetched += 1;

      if (status === 401 || status === 403) {
        if (/engine|book|rates|reserve|checkout/i.test(u.pathname)) engineBlocked = true;
        blocked.push({ url: next, status });
        continue;
      }
      if (status !== 200 || !html) continue;

      pages.push({ url: next, status, html: html.slice(0, MAX_HTML_BYTES), title, loadMs });

      for (const link of extractLinks(html, u)) {
        const c = canonicalUrl(link);
        if (seen.has(c)) continue;
        seen.add(c);
        const hit = PRIORITY.find((p) => p.re.test(new URL(link).pathname));
        if (hit) priorityQueue.push(link);
        else breadthQueue.push(link);
      }

      if (priorityQueue.length + breadthQueue.length > 0 && fetched < req.maxPages) await sleep(delay);
    }

    if (fetched >= req.maxPages) degraded.push("cap:maxPages");
    return { pages, blocked, engineBlocked, degraded };
  } finally {
    await browser.close();
  }
}
