// Mobile-quality check (brief §4): render at 390px, measure load time,
// horizontal overflow, and tap-target sizing. Conservative defaults (overflow,
// no targets) when the page can't be evaluated — the score degrades honestly.
import { chromium } from "playwright";
import type { MobileRequest, MobileResult } from "@uplayer/shared";
import { CRAWL_UA } from "@uplayer/shared";

export async function mobileCheck(req: MobileRequest): Promise<MobileResult> {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      userAgent: CRAWL_UA,
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    const t0 = Date.now();
    let status: number | null = null;
    let horizontalOverflow = true;
    let tapTargetsOk = false;
    try {
      const resp = await page.goto(req.url, { waitUntil: "load", timeout: 15_000 });
      status = resp?.status() ?? null;
      await page.waitForTimeout(150);
      // string-form evaluate: the body runs in the browser (worker tsconfig has no DOM lib)
      horizontalOverflow = await page.evaluate<boolean>(
        "() => document.documentElement.scrollWidth - document.documentElement.clientWidth > 2",
      );
      tapTargetsOk = await page.evaluate<boolean>(`
        () => {
          const els = Array.from(document.querySelectorAll("a,button")).slice(0, 30);
          if (els.length === 0) return false;
          const small = els.filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && (r.width < 40 || r.height < 40);
          });
          return small.length / els.length < 0.3;
        }
      `);
    } catch {
      /* keep conservative defaults */
    }
    return { ok: status != null && status < 400, status, loadMs: Date.now() - t0, horizontalOverflow, tapTargetsOk };
  } finally {
    await browser.close();
  }
}
