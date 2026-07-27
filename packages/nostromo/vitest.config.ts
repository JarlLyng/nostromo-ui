import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    include: ["src/**/*.{test,spec}.?(c|m)[jt]s?(x)", "src/**/*.a11y.test.tsx"],
    // dist/ contains copies of the theme tests after a build; without this the
    // suite runs them twice and the test count depends on whether dist exists.
    exclude: ["**/node_modules/**", "dist/**"],
    // Timeout configuration to prevent hanging tests
    // Higher timeout in CI due to resource constraints
    testTimeout: process.env.CI ? 20000 : 10000, // 20s in CI, 10s locally
    hookTimeout: process.env.CI ? 20000 : 10000, // 20s in CI, 10s locally
    teardownTimeout: process.env.CI ? 20000 : 10000, // 20s in CI, 10s locally
    // Limit concurrency to prevent resource exhaustion in CI
    maxConcurrency: process.env.CI ? 4 : 5,
    // Coverage configuration - enabled in CI for reporting
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.stories.*",
        "**/*.test.*",
        "dist/**",
      ],
      // Coverage thresholds - minimum 80% for most metrics, 75% for branches
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
      reportOnFailure: true,
    },
    // Stop on first failure in CI to prevent hanging
    bail: process.env.CI ? 1 : 0,
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
});
