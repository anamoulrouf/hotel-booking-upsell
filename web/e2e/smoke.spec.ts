// Smoke test = E2E case A1 (docs/07): happy submit → progress → preview.
// Runs against the local rich-hotel fixture (docs/06 §2) since M2 — fully
// local via FIXTURE_HOST_MAP (playwright.config.ts), no external crawls.
import { expect, test } from "@playwright/test";

test("A1 — submit URL, watch progress, land on preview", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("submit-url").fill("https://rich-hotel.test");
  await page.getByTestId("submit-button").click();

  // redirected into the progress screen
  await expect(page).toHaveURL(/\/report\/[^/]+\/progress/, { timeout: 15_000 });

  // pipeline (fixture crawl + facts + packages + score) completes and the
  // poller forwards to the report
  await expect(page).toHaveURL(/\/report\/[^/]+$/, { timeout: 60_000 });

  // fixture facts made it through JSON-LD extraction
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Fixture Grand Hotel");
  await expect(page.getByText("Fixture Grand Hotel", { exact: false }).first()).toBeVisible();

  // "pages · items" — homepage + priority pages crawled, offers items spotted
  await expect(page.getByTestId("pages-found")).toHaveText(/^[1-9]\d* · \d+$/);

  // engine fingerprint from the fixture's first-hit engine page
  await expect(page.getByTestId("detected-engine")).toHaveText(/SynXis/, { timeout: 10_000 });

  // roomCount 46 ⇒ the revenue funnel computed
  await expect(page.getByTestId("missed-range")).toContainText("$", { timeout: 10_000 });
});
