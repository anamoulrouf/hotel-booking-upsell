import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Unit + integration only (docs/06): src/**/*.test.ts.
// e2e/ belongs to Playwright — vitest must not collect those specs.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["e2e/**", ".next/**", "node_modules/**"],
  },
});
