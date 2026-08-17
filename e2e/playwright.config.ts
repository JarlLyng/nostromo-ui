import { defineConfig, devices } from "@playwright/test";

/**
 * Browser tests for the things jsdom cannot do.
 *
 * The library has 1367 unit tests and they run in jsdom, which has no layout
 * engine, no CSS cascade for stylesheets it did not parse, no pointer physics and
 * no `:focus-visible`. Several components have a comment saying as much, and this
 * suite exists to close exactly those gaps. Anything answerable in jsdom belongs
 * in the unit tests, where it runs in a second rather than a minute.
 *
 * The app under test consumes the built package through its `exports` map and
 * compiles the two `@import` lines the published instructions give a consumer, so
 * a failure here is a failure of the artifact rather than of the source.
 *
 * ## Two browsers
 *
 * Chromium and WebKit. WebKit is not there for coverage theatre: it is a
 * different CSS engine and a different layout engine, which is the only way a
 * stylesheet test means anything beyond "Blink agrees with itself". Firefox is
 * left out because it is a third download for a third opinion on the same
 * questions, and the run time is not free.
 */
const PORT = 4319;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // One retry in CI. A drag test that fails twice is a real failure; a drag test
  // that fails once may be a slow machine, and the retry says which.
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  // The built app, not the dev server: this is meant to be the production output
  // of an ordinary consumer project, and the dev server transforms differently.
  webServer: {
    command: `pnpm vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
