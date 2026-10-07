// M2 exit test (docs/09 M2, case H37): the worker crawls fixture A and
// returns render-grade JSON within the 25-page cap. Requires the fixture
// server (`pnpm fixtures:serve`) and Playwright chromium; skips otherwise.
import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { crawlCore } from "./crawl";

const FIXTURE = "http://localhost:4311";
const up = existsSync(new URL("../../fixtures/rich-hotel-test/index.html", import.meta.url).pathname);

async function fixtureUp(): Promise<boolean> {
  try {
    const res = await fetch(FIXTURE, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

describe("crawlCore vs fixture A", () => {
  it("crops priority pages within the 25-page cap", { timeout: 120_000 }, async () => {
    if (!up || !(await fixtureUp())) return expect(true).toBe(true); // skipped: fixtures not running
    const result = await crawlCore({ url: FIXTURE, maxPages: 25 }, { delayMs: 50 });

    const paths = result.pages.map((p) => new URL(p.url).pathname);
    expect(paths[0]).toBe("/");
    expect(result.pages.length).toBeLessThanOrEqual(25);
    // priority pages beat breadth links
    expect(paths).toContain("/offers");
    expect(paths).toContain("/faq");
    expect(paths).toContain("/rooms");
    // rendered HTML, not the empty shell
    const offers = result.pages.find((p) => new URL(p.url).pathname === "/offers");
    expect(offers?.html).toContain("Airport transfer by private sedan");
    expect(offers?.html).toContain("From 48 per person");
    // load times captured
    expect(result.pages.every((p) => p.loadMs >= 0)).toBe(true);
    // cap reported when hit
    expect(result.degraded).toContain("cap:maxPages");
  });

  it("reports the engine 403 without dying (Dolli learning 3)", { timeout: 60_000 }, async () => {
    if (!up || !(await fixtureUp())) return expect(true).toBe(true);
    // fresh hit order: this run's first /engine/rates hit may 403 (counter is
    // per-process) — either way the crawl must complete sanely.
    const result = await crawlCore({ url: FIXTURE, maxPages: 25 }, { delayMs: 50 });
    expect(result.pages.length).toBeGreaterThan(0);
    if (result.engineBlocked) {
      expect(result.blocked.some((b) => new URL(b.url).pathname === "/engine/rates" && b.status === 403)).toBe(true);
    }
  });

  it("respects robots disallow rules", { timeout: 60_000 }, async () => {
    if (!up || !(await fixtureUp())) return expect(true).toBe(true);
    // rich-hotel robots.txt disallows /wp-admin/ — a crawl rooted there must
    // come back empty rather than fetch it
    const result = await crawlCore({ url: `${FIXTURE}/wp-admin/`, maxPages: 5 }, { delayMs: 10 });
    expect(result.pages).toHaveLength(0);
  });

  it("renders fixture B's JS-injected content (the fetch crawler sees nothing)", { timeout: 60_000 }, async () => {
    if (!up || !(await fixtureUp())) return expect(true).toBe(true);
    // raw fetch of fixture B returns the empty <div id="app"></div> shell —
    // after render the shell has content, so the empty-div markup is gone
    const raw = await (await fetch(`${FIXTURE.replace("4311", "4312")}`)).text();
    expect(raw).toContain('<div id="app"></div>');
    // the worker renders it
    const result = await crawlCore({ url: FIXTURE.replace("4311", "4312"), maxPages: 5 }, { delayMs: 50 });
    expect(result.pages[0]?.html).not.toContain('<div id="app"></div>');
    expect(result.pages[0]?.html).toContain("Twelve rooms over a quiet bay");
  });
});
