// Core crawl (docs/01 §3): robots → priority-seeded BFS over same-origin
// links, ≤ maxPages (25 cap), polite delay, identified UA, rendered HTML +
// load times. Never submits forms, never books. Public pages only.
// Link/classification rules come from @uplayer/shared (one copy, no drift).
import { chromium } from "playwright";
import {
  type CrawlRequest,
  type CrawlResult,
  type CrawledPage,
  BOOKING_ENGINES,
  CRAWL_UA,
  PRIORITY,
  canonicalUrl,
  extractLinksWithText,
  extractLinks,
  fetchRobots,
  pickEngineLink,
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
      // branch cap: ≤2 pages per first-level section so one deep branch
      // (e.g. /accommodation/rooms-suites/*) can't starve the other sections
      const perPrefix = new Map<string, number>();
      for (const p of [...priorityQueue, ...breadthQueue]) {
        const seg = new URL(p).pathname.split("/").filter(Boolean)[0] ?? "";
        perPrefix.set(seg, (perPrefix.get(seg) ?? 0) + 1);
      }
      for (const [seg, n] of perPrefix) {
        if (n <= 2) continue;
        let extra = n - 2;
        const drop = (q: string[]) => {
          for (let i = q.length - 1; i >= 0 && extra > 0; i--) {
            if (new URL(q[i]).pathname.split("/").filter(Boolean)[0] === seg) {
              q.splice(i, 1);
              extra -= 1;
            }
          }
        };
        drop(priorityQueue);
        drop(breadthQueue);
      }

      if (priorityQueue.length + breadthQueue.length > 0 && fetched < req.maxPages) await sleep(delay);
    }

    if (fetched >= req.maxPages) degraded.push("cap:maxPages");

    // one hop to the booking-engine page (docs/03 §1 data point 5) — engines
    // live cross-origin and are often white-labeled (anchor text carries the
    // intent; known engine markers carry the identity)
    const uncrawledLinks = [
      ...new Map(
        pages
          .flatMap((p) => extractLinksWithText(p.html, new URL(p.url)))
          .map((l) => [l.url, l] as const),
      ).values(),
    ].filter(
      (l) =>
        !pages.some((p) => canonicalUrl(p.url) === canonicalUrl(l.url)) &&
        !blocked.some((b) => canonicalUrl(b.url) === canonicalUrl(l.url)),
    );
    const engineLink = pickEngineLink(
      uncrawledLinks,
      BOOKING_ENGINES.flatMap((e) => e.patterns),
    );
    if (engineLink) {
      const engineUrl = new URL(engineLink);
      const engineRobots = await fetchRobots(engineUrl.origin);
      if (!engineRobots.blockedAll && engineRobots.allowed(engineUrl.pathname)) {
        await sleep(Math.max(delay, 500));
        try {
          const resp = await page.goto(engineLink, { waitUntil: "load", timeout: PAGE_TIMEOUT_MS });
          await page.waitForTimeout(SCRIPT_SETTLE_MS);
          const status = resp?.status() ?? 0;
          if (status === 200) {
            pages.push({
              url: engineLink,
              status,
              html: (await page.content()).slice(0, MAX_HTML_BYTES),
              title: (await page.title().catch(() => "")) || null,
              loadMs: 0,
            });
          } else if (status === 401 || status === 403) {
            engineBlocked = true;
            blocked.push({ url: engineLink, status });
          }
        } catch {
          /* engine page unreachable — fingerprints still run on crawled pages */
        }
      }
    }

    return { pages, blocked, engineBlocked, degraded };
  } finally {
    await browser.close();
  }
}
