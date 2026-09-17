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

/**
 * The documentation site, served from its production export on a second port.
 *
 * It is here rather than in its own package because the reason is the same one
 * this suite exists for. The docs advertise four themes and shipped a switcher
 * that changed nothing: each theme file scopes its tokens to its own
 * `[data-theme="..."]`, the site imported one of the four, and the other three
 * matched no rule. Every unit test passed, because jsdom parses no stylesheet
 * and cannot tell a token that resolved from one that did not.
 *
 * `--basePath` is why the export is served from a parent directory: the
 * production build sets `/nostromo-ui`, so every asset is requested under that
 * prefix and serving `out/` at the root 404s all of them.
 */
const DOCS_PORT = 4320;
const DOCS_BASE = `http://localhost:${DOCS_PORT}/nostromo-ui/`;

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
    {
      name: "chromium",
      testIgnore: /docs\//,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "webkit",
      testIgnore: /docs\//,
      use: { ...devices["Desktop Safari"] },
    },
    // One engine for the docs site. These check that the page wires its own
    // stylesheets up correctly, not how an engine lays them out, and the second
    // opinion that makes WebKit worth its runtime above buys nothing here.
    {
      name: "docs",
      testMatch: /docs\//,
      use: { ...devices["Desktop Chrome"], baseURL: DOCS_BASE },
    },
  ],
  // The built app, not the dev server: this is meant to be the production output
  // of an ordinary consumer project, and the dev server transforms differently.
  webServer: [
    {
      command: `pnpm vite preview --port ${PORT} --strictPort`,
      url: `http://localhost:${PORT}`,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
    // `serve-docs.mjs` builds the export if it is missing and then serves the
    // directory above it, so `/nostromo-ui/...` resolves. It builds rather than
    // skipping when the export is absent: a docs test that quietly does not run
    // is worse than one that fails, which is the whole lesson of the bug it
    // guards against.
    {
      command: `node scripts/serve-docs.mjs ${DOCS_PORT}`,
      url: DOCS_BASE,
      reuseExistingServer: !process.env.CI,
      timeout: 300_000,
    },
  ],
});
