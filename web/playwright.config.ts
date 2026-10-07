import { defineConfig } from "@playwright/test";

// E2E runs fully local: the app dev server + the fixture hotel servers.
// FIXTURE_HOST_MAP (see web/src/server/pipeline.ts) points the crawler at the
// local fixtures for test hosts — no external site is crawled in tests.
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
      command: "pnpm dev",
      url: "http://localhost:3000",
      reuseExistingServer: true,
      timeout: 60_000,
      env: {
        FIXTURE_HOST_MAP: "rich-hotel.test=http://localhost:4311,sparse-hotel.test=http://localhost:4312,canary-hotel.test=http://localhost:4313",
        E2E: "1", // skip the 30-day report cache — each run crawls fresh
      },
    },
  ],
});
