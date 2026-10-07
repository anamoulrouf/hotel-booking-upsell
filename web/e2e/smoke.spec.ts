// Smoke test = E2E case A1 (docs/07): happy submit → progress → preview.
// Uses example.com (real, fast, polite single-domain fetch) until the fixture
// suite lands in M2.
import { expect, test } from "@playwright/test";

test("A1 — submit URL, watch progress, land on preview", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("submit-url").fill("https://example.com");
  await page.getByTestId("submit-button").click();

  // redirected into the progress screen
  await expect(page).toHaveURL(/\/report\/[^/]+\/progress/, { timeout: 15_000 });

  // pipeline (fetch example.com + facts) completes and the poller forwards to the report
  await expect(page).toHaveURL(/\/report\/[^/]+$/, { timeout: 60_000 });

  await expect(page.getByRole("heading", { level: 1 })).toContainText(/report|example/i);
  await expect(page.getByTestId("next-steps")).toBeVisible();
  // "pages · items" — at least the homepage crawled; items may be 0 (honest)
  await expect(page.getByTestId("pages-found")).toHaveText(/^[1-9]\d* · \d+$/);
});
