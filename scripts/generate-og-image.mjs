#!/usr/bin/env node
/**
 * Render the social card.
 *
 * Sharing a link to the repository or the documentation produced a bare card:
 * GitHub fell back to its auto-generated image of the repo name and language
 * bar, and the docs site had `og:title` and `og:description` with no image at
 * all, under a `twitter:card` of `summary` rather than `summary_large_image`.
 *
 * The card is rendered in Chromium from `og/card.html`, which loads the
 * library's own built theme stylesheets. Its four swatches read
 * `--nostromo-color-primary` under four `[data-theme]` values, so they are the
 * product's colours rather than four hex values copied into a template that
 * would drift the first time a theme is retuned.
 *
 * 1280x640 covers both consumers. It is exactly what GitHub asks for in
 * Settings -> General -> Social preview, and at 2:1 it satisfies Twitter's
 * `summary_large_image` and is within tolerance for Open Graph, whose 1.91:1
 * recommendation is not a requirement.
 *
 * The PNG is committed. This script regenerates it rather than running in the
 * build: a social card changes when the branding does, which is rarely, and
 * putting a browser in the documentation build to redraw an identical image on
 * every deploy buys nothing.
 *
 *   pnpm og:image
 *
 * Needs the package built, because it reads the themes out of dist.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { chromium } from "@playwright/test";

const WIDTH = 1280;
const HEIGHT = 640;

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const template = join(scriptDir, "og", "card.html");
const themes = join(repoRoot, "packages", "nostromo", "dist", "themes");
const output = join(repoRoot, "docs", "public", "og-image.png");

if (!existsSync(join(themes, "nostromo.css"))) {
  console.error(
    "packages/nostromo/dist/themes is missing - build the package first:\n" +
      "  pnpm --filter @jarllyng/nostromo build",
  );
  process.exit(1);
}

mkdirSync(dirname(output), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  // A social card is served at one size to everyone, so it is rendered at one
  // scale. Leaving this at the host's DPR would make the committed file depend
  // on the machine that last ran the script.
  deviceScaleFactor: 1,
});

const problems = [];
page.on("pageerror", (error) => problems.push(`page error: ${error.message}`));
page.on("requestfailed", (request) =>
  problems.push(`failed request: ${request.url()}`),
);

await page.goto(pathToFileURL(template).href, { waitUntil: "networkidle" });

// The card's whole subject is that the four themes differ. If the stylesheets
// had not loaded, every swatch would resolve to the same colour and the image
// would look deliberate while saying the opposite of what it means.
const swatches = await page.$$eval(".dot", (nodes) =>
  nodes.map((node) => getComputedStyle(node).backgroundColor),
);
const distinct = new Set(swatches);
if (swatches.length !== 4 || distinct.size !== 4) {
  problems.push(
    `expected four distinct swatch colours, got ${swatches.length}: ${[...distinct].join(", ")}`,
  );
}

if (problems.length) {
  await browser.close();
  console.error("\n❌ The card did not render correctly\n");
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

await page.screenshot({ path: output, type: "png" });
await browser.close();

const bytes = execFileSync("wc", ["-c", output])
  .toString()
  .trim()
  .split(/\s+/)[0];
console.log(
  `✅ ${output.replace(`${repoRoot}/`, "")} - ${WIDTH}x${HEIGHT}, ${Math.round(Number(bytes) / 1024)}kB`,
);
console.log(`   swatches: ${swatches.join(", ")}`);
