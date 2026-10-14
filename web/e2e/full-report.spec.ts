// Full-report E2E batch (docs/07): C13/C14 gating, D16–D20 unlock,
// E21–E28 full report, F29–F32 guest pages, H36 legal, I44 funnel.
// Runs against the local fixture A + worker (serial — shares one report).
import { expect, test, type Page } from "@playwright/test";
import { computeRoi } from "@uplayer/shared";
import { closeDb, eventRows, leadCount, reportIdByToken } from "./db";

test.describe.configure({ mode: "serial" });

let page: Page;
let page2: Page; // D20 — a second tab kept on the LOCKED render for the re-POST
let lockedHtml = "";
let token = "";
let reportId = "";

async function submitAndWait(p: Page, url: string): Promise<string> {
  await p.goto("/");
  await p.getByTestId("submit-url").fill(url);
  await p.getByTestId("submit-button").click();
  await expect(p).toHaveURL(/\/report\/[^/]+\/progress/, { timeout: 15_000 });
  const t = p.url().split("/report/")[1].split("/")[0];
  await expect(p).toHaveURL(new RegExp(`/report/${t}$`), { timeout: 60_000 });
  return t;
}

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();

  // fixture A: rich JSON-LD (name, 46 rooms, 5 stars) — fresh report per run
  token = await submitAndWait(page, "https://rich-hotel.test");
  reportId = await reportIdByToken(token);

  // C13 — capture the served HTML while STILL LOCKED for the gating asserts
  lockedHtml = await (await page.request.get(`/report/${token}`)).text();

  // C14 — no email field anywhere before the unlock click (brief §3 step 3)
  await expect(page.locator('[name="email"]')).toHaveCount(0);

  // D17 — rooms prefilled from JSON-LD when the form is revealed
  await page.getByTestId("unlock-reveal").first().click();
  await expect(page.locator('[data-testid="unlock-form"] [name="roomCount"]')).toHaveValue("46");

  // D20 setup — second tab filled but NOT submitted; it re-POSTs after the
  // first unlock, exercising the idempotent upsert through the real form
  page2 = await browser.newPage();
  await page2.goto(`/report/${token}`);
  await page2.getByTestId("unlock-reveal").first().click();
  await page2.locator('[data-testid="unlock-form"] [name="email"]').fill("gm@rich-hotel.test");
  await page2.locator('[data-testid="unlock-form"] [name="name"]').fill("Rich Manager");
  await page2.locator('[data-testid="unlock-form"] [name="role"]').fill("General Manager");
  await page2.locator('[data-testid="unlock-form"] [name="roomCount"]').fill("46");
});

test.afterAll(async ({ browser }) => {
  await page?.close();
  await page2?.close();
  await browser.close();
  await closeDb();
});

// ——— C13: no locked-section leakage in the served HTML ———
// doc 07 gates the ROI table, package-ideas DATA and guest picks; the missed-
// revenue estimate and the unlock pitches render locked on purpose (the hook).
test("C13 — locked report HTML contains no gated data", async () => {
  expect(lockedHtml).not.toContain("Mid · 12% take rate"); // ROI scenario cards
  expect(lockedHtml).not.toContain("Save these numbers"); // ROI editor controls
  expect(lockedHtml).not.toContain("best timing:"); // package-idea cards (locked shows names only)
  expect(lockedHtml).not.toContain("Your guests, three ways"); // guest picks
  expect(lockedHtml).not.toContain("Pay now — save 10%"); // guest-page payment pair
  // the unlock pitch itself is present (it's what converts)
  expect(lockedHtml).toContain("Unlock the live ROI editor");
});

// ——— C15: sample banner on the report ———
test("C15 — sample banner present", async () => {
  await page.goto(`/report/${token}`);
  await expect(page.getByText("Sample made by UpLayer from your public website. Not live.")).toBeVisible();
});

// ——— D16: validation errors, no lead row ———
test("D16 — invalid unlock fields are rejected", async () => {
  await page.goto(`/report/${token}`);
  await page.getByTestId("unlock-reveal").first().click();
  const form = page.locator('[data-testid="unlock-form"]');
  // zod 4 mirrors the HTML5 email regex, so the browser gate IS the contract
  // at the UI: a bad email must be rejected natively and never reach the server
  await form.locator('[name="email"]').fill("not-an-email");
  await form.locator('button[type="submit"]').click();
  await expect(form.locator('[name="email"]')).toHaveJSProperty("validity.valid", false);
  expect(await leadCount(reportId)).toBe(0);
});

// ——— D17/D18/D20 + I44 setup: unlock the shared report ———
test("D18 — unlock succeeds: lead row, event, live editor renders", async () => {
  await page.goto(`/report/${token}`);
  await page.getByTestId("unlock-reveal").first().click();
  await page.locator('[name="email"]').first().fill("gm@rich-hotel.test");
  await page.locator('[name="name"]').first().fill("Rich Manager");
  await page.locator('[name="role"]').first().fill("General Manager");
  await page.locator('[name="roomCount"]').first().fill("46");
  await page.locator('button:has-text("Unlock the full report")').first().click();
  // the section header renders locked too — wait for the editor itself
  // (unlocked-only render) before trusting the DB asserts
  await expect(page.getByRole("button", { name: "Save these numbers" })).toBeVisible({ timeout: 15_000 });
  expect(await leadCount(reportId)).toBe(1);
  expect(await eventRows(reportId)).toContain("unlocked");
});

// ——— D20: idempotent replay ———
test("D20 — replayed unlock keeps exactly one lead", async () => {
  // the stale locked tab re-POSTs the same lead — onConflictDoUpdate keeps one row
  await page2.locator('[data-testid="unlock-form"] button[type="submit"]').click();
  await expect(page2.getByRole("button", { name: "Save these numbers" })).toBeVisible({ timeout: 15_000 });
  expect(await leadCount(reportId)).toBe(1);
});

// ——— E21: exactly six areas with finding + fix ———
test("E21 — six finding areas render", async () => {
  await page.goto(`/report/${token}`);
  const rows = page.locator('[data-testid="findings"] > li');
  await expect(rows).toHaveCount(6);
  for (const li of await rows.all()) {
    await expect(li.locator("p").first()).toBeVisible();
    await expect(li.getByText("FIX", { exact: true })).toBeVisible();
  }
});

// ——— E22/E24/E25: ROI editor goldens, care toggle, scenario ordering ———
test.describe("ROI editor", () => {
  let expected: ReturnType<typeof computeRoi>;

  test.beforeAll(async () => {
    expected = computeRoi({
      rooms: 46,
      occupancy: 0.65,
      avgStayNights: 2.2,
      nightlyRate: null,
      starRating: 5,
      currentUpsellRevenue: 0,
      buildPrice: 15_000,
      carePlan: true,
      scorePct: 100,
      takeRate: 0.115,
    });
  });

  const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

  test("E22 — mid scenario matches the engine golden", async () => {
    await page.goto(`/report/${token}`);
    const mid = page.getByTestId("scenario-mid");
    // headline p (kept-3yr dd can coincide with projectedYearly)
    await expect(mid.locator("p.font-notch")).toHaveText(money(expected.projectedYearly));
    // the Payback row's dd — exact value, not a substring of "18 mo"
    await expect(
      mid.locator("dd").filter({ hasText: new RegExp(`^\\s*${Math.round(expected.paybackMonths ?? 0)} mo$`) }),
    ).toBeVisible();
  });

  test("E24 — care toggle flips the care mention, SaaS columns stable", async () => {
    await page.goto(`/report/${token}`);
    const summary = page.locator("p").filter({ hasText: "Projections are estimates" });
    // SaaS figure is engine-computed and care-independent — stable across the toggle
    const saas = page
      .getByTestId("scenario-mid")
      .locator("dd")
      .filter({ hasText: money(expected.costSaaS3yrCommission) })
      .first();
    await expect(summary).toContainText("+ $1,000/yr care");
    await expect(saas).toBeVisible();
    await page.getByLabel("Include the $1,000/yr care plan").uncheck();
    await expect(summary).not.toContainText("+ $1,000/yr care");
    await expect(saas).toBeVisible();
  });

  test("E25 — scenarios order coherently (low ≤ mid ≤ high)", async () => {
    await page.goto(`/report/${token}`);
    const nums = await Promise.all(
      ["low", "mid", "high"].map(async (key) => {
        const card = page.getByTestId(`scenario-${key}`);
        const headline = card.locator("p").filter({ hasText: "$" }).first();
        return Number((await headline.textContent())!.replace(/[^0-9]/g, ""));
      }),
    );
    expect(nums[0]).toBeLessThanOrEqual(nums[1]);
    expect(nums[1]).toBeLessThanOrEqual(nums[2]);
  });
});

// ——— E27/E28 + F-series: guest pages ———
test.describe("Guest pages + claims", () => {
  test.beforeAll(async () => {
    await page.goto(`/report/${token}`);
    await expect(page.getByText("Your guests, three ways")).toBeVisible();
  });

  test("F29 — three profiles, per-guest lines, differing sets", async () => {
    for (const id of ["family", "couple", "business"]) {
      const panel = page.locator(`[data-testid="guest-${id}"]`);
      await expect(panel.locator("li")).toHaveCount(5);
      await expect(panel.getByText("idea").first()).toBeVisible(); // suggested ideas marked
    }
    const fam = await page.locator('[data-testid="guest-family"] li').allTextContents();
    const biz = await page.locator('[data-testid="guest-business"] li').allTextContents();
    expect(fam.join("|")).not.toBe(biz.join("|"));
  });

  test("F30 — extracted brand color accents the panel", async () => {
    await expect(page.locator('[data-testid="guest-family"] > div').first()).toHaveCSS("background-color", "rgb(122, 30, 43)");
  });

  test("F31 — commerce buttons render disabled", async () => {
    const buttons = page.locator('[data-testid="guest-family"] button');
    await expect(buttons).toHaveCount(2);
    await expect(buttons.first()).toBeDisabled();
    await expect(buttons.nth(1)).toBeDisabled();
  });

  test("E27 — included breakfast appears nowhere as an upsell", async () => {
    const ideasText = (await page.locator('[data-testid="ideas-section"]').textContent()) ?? "";
    expect(ideasText.toLowerCase()).not.toContain("breakfast buffet");
    const guestsText = (await page.locator('[data-testid="guest-pages"]').textContent()) ?? "";
    expect(guestsText.toLowerCase()).not.toContain("breakfast buffet");
  });
});

// ——— E28: claims string scan ———
test("E28 — no forbidden claims phrasing", async () => {
  await page.goto(`/report/${token}`);
  const body = (await page.locator("body").innerText()).toLowerCase();
  expect(body).not.toContain("our customers");
  expect(body).not.toContain("uplayer results show");
  expect(body).toContain("estimate");
});

// ——— F32: responsive report ———
test("F32 — no horizontal overflow at 390px", async ({ browser }) => {
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(`/report/${token}`);
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);
  await mobile.close();
});

// ——— H36: noindex everywhere ———
test("H36 — noindex meta, header and robots.txt", async ({ request }) => {
  const res = await request.get(`/report/${token}`);
  expect(res.headers()["x-robots-tag"]).toContain("noindex");
  const html = await res.text();
  expect(html).toContain("noindex");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /report/");
  expect(robots).toContain("Disallow: /api/");
});

// ——— I44: funnel events, in order ———
test("I44 — funnel events recorded in order", async () => {
  // engage: ROI save (roi_edited) + a CTA click (cta_clicked)
  await page.goto(`/report/${token}`);
  await page.getByRole("button", { name: "Save these numbers" }).click();
  await page.getByTestId("cta-band-button").click();
  // scheduler unset locally → mailto fallback; the beacon POST is async —
  // poll until it lands before asserting the funnel order
  await expect
    .poll(async () => (await eventRows(reportId)).filter((t) => t === "cta_clicked").length, { timeout: 10_000 })
    .toBeGreaterThanOrEqual(1);
  const types = await eventRows(reportId);
  const order = ["report_started", "preview_seen", "unlocked", "roi_edited", "cta_clicked"].map((t) =>
    types.indexOf(t),
  );
  for (let i = 1; i < order.length; i++) expect(order[i]).toBeGreaterThan(order[i - 1]);
  expect(order).not.toContain(-1);
});

// ——— H39: removal (last — it deletes the shared report) ———
test("H39 — removal tombstones the report", async () => {
  await page.goto("/remove");
  await page.getByTestId("remove-token").fill(token);
  await page.getByTestId("remove-button").click();
  await expect(page.getByText("Done — the report and its data are deleted.")).toBeVisible();
  const res = await page.goto(`/report/${token}`);
  expect(res?.status()).toBe(404);
});
