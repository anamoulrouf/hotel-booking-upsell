import { defineConfig } from "@playwright/test";

// E2E runs fully local: the app dev server + the fixture hotel servers + the
// M2 worker (Playwright crawl + mobile check). FIXTURE_HOST_MAP (see
// web/src/server/pipeline.ts) points the crawler at the local fixtures for
// test hosts — no external site is crawled in tests. WORKER_URL turns the
// pipeline's worker path on; with no worker the pipeline still passes via the
// fetch-crawler fallback (mobile area then skips honestly).
const WORKER_SHARED_SECRET = "e2e-worker-secret";

export default defineConfig({
  testDir: "./e2e",
  timeout: 120_000,
  retries: 0,
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  webServer: [
    {
      command: "pnpm fixtures:serve",
      cwd: "..",
      url: "http://localhost:4311",
      reuseExistingServer: true,
      timeout: 30_000,
    },
    {
      command: "pnpm --filter worker dev",
      cwd: "..",
      url: "http://localhost:4310/healthz",
      reuseExistingServer: true,
      timeout: 60_000,
      env: {
        WORKER_SHARED_SECRET,
      },
    },
    {
      command: "pnpm dev",
      url: "http://localhost:3000",
      reuseExistingServer: true,
      timeout: 60_000,
      env: {
        FIXTURE_HOST_MAP: "rich-hotel.test=http://localhost:4311,sparse-hotel.test=http://localhost:4312,canary-hotel.test=http://localhost:4313",
        E2E: "1", // skip the 30-day report cache — each run crawls fresh
        WORKER_URL: "http://localhost:4310",
        WORKER_SHARED_SECRET,
      },
    },
  ],
});
