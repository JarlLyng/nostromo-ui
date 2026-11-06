#!/usr/bin/env node
/**
 * The counts the README states by hand must match the repository.
 *
 * #253 found the README claiming "30 Core Components" twelve lines below a
 * table saying 50, beside a test count that was a hundred and fifty short and a
 * bundle size quoted to two decimal places from some earlier build. None of it
 * was wrong when written. All of it drifted, silently, because nothing compared
 * a sentence in a Markdown file against the tree it describes.
 *
 * Most of those numbers are simply gone now, replaced by links to whatever
 * actually knows: npm for the version, CI for the test counts, the components
 * index for the component list. Two survive, because a reader skimming the
 * README wants them there, and those two are checked here.
 *
 * Neither is read from a list kept alongside them:
 *
 *   marketing  counted from src/components/marketing
 *   core       not counted directly - `charts`, `charts-lazy` and
 *              `chart-composable` are three files for one component, and any
 *              rule for collapsing them is a guess this script would then be
 *              enforcing. It is pinned against the documentation instead: one
 *              page per component, so core + marketing must equal the number of
 *              component pages.
 *
 * So the two claims check each other and both check the tree.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(repoRoot, p), "utf8");

function countFiles(dir, filter = () => true) {
  return readdirSync(join(repoRoot, dir), { withFileTypes: true }).filter(
    (entry) =>
      entry.isFile() && entry.name.endsWith(".tsx") && filter(entry.name),
  ).length;
}

function countDocPages(dir) {
  let pages = 0;
  for (const entry of readdirSync(join(repoRoot, dir), {
    withFileTypes: true,
  })) {
    if (entry.isDirectory()) {
      pages += countDocPages(join(dir, entry.name));
      continue;
    }
    // `index.mdx` at the top is the section listing, not a component. One in a
    // subdirectory is that component's page (`icon/index.mdx`).
    if (!entry.name.endsWith(".mdx")) continue;
    if (entry.name === "index.mdx" && dir === "docs/content/components")
      continue;
    pages++;
  }
  return pages;
}

const readme = read("README.md");
const failures = [];

function claim(label, pattern) {
  const match = readme.match(pattern);
  if (!match) {
    failures.push(
      `The README no longer states a ${label} count in the form this check looks for.\n` +
        `    Either restore it or drop this claim from scripts/validate-doc-counts.mjs.`,
    );
    return null;
  }
  return Number(match[1]);
}

const marketingClaim = claim(
  "marketing component",
  /\|\s*\*\*Marketing Components\*\*\s*\|[^|]*\|\s*(\d+)\s+components/,
);
const coreClaim = claim(
  "core component",
  /\|\s*\*\*Core Components\*\*\s*\|[^|]*\|\s*(\d+)\s+components/,
);

const marketingActual = countFiles(
  "packages/nostromo/src/components/marketing",
);
const docPages = countDocPages("docs/content/components");

if (marketingClaim !== null && marketingClaim !== marketingActual) {
  failures.push(
    `README says ${marketingClaim} marketing components; ` +
      `packages/nostromo/src/components/marketing has ${marketingActual}.`,
  );
}

if (coreClaim !== null && marketingClaim !== null) {
  const total = coreClaim + marketingClaim;
  if (total !== docPages) {
    failures.push(
      `README claims ${coreClaim} core + ${marketingClaim} marketing = ${total} components, ` +
        `but docs/content/components has ${docPages} component pages.\n` +
        `    Either a component is undocumented, a page outlived its component, ` +
        `or the README count is stale.`,
    );
  }
}

/*
 * The components index links every component page.
 *
 * README sends readers to the index instead of keeping a list of its own, after
 * the list it used to keep had fallen 19 components behind (#299). That swap only
 * holds if the index is complete, and the index is written by hand, so it is
 * checked here rather than trusted: every page under docs/content/components has
 * to be linked from it.
 */
function componentSlugs(dir, nested = false) {
  const slugs = [];
  for (const entry of readdirSync(join(repoRoot, dir), {
    withFileTypes: true,
  })) {
    if (entry.isDirectory()) {
      slugs.push(...componentSlugs(join(dir, entry.name), true));
      continue;
    }
    if (!entry.name.endsWith(".mdx")) continue;
    if (entry.name === "index.mdx") {
      // The section's own index is the page being checked; a nested index.mdx
      // is that component's page (`icon/index.mdx`).
      if (nested) slugs.push(dir.split("/").pop());
      continue;
    }
    slugs.push(entry.name.replace(/\.mdx$/, ""));
  }
  return slugs;
}

const index = read("docs/content/components/index.mdx");
const linked = new Set(
  [...index.matchAll(/\/components\/([a-z0-9-]+)/g)].map((match) => match[1]),
);
const unlinked = componentSlugs("docs/content/components").filter(
  (slug) => !linked.has(slug),
);
if (unlinked.length) {
  failures.push(
    `The components index does not link ${unlinked.length} component page(s): ` +
      `${unlinked.join(", ")}.\n` +
      `    README points readers at the index as the full list, so it has to be complete.`,
  );
}

if (failures.length) {
  console.error("\n❌ Documented counts do not match the repository\n");
  for (const failure of failures) console.error(`  - ${failure}\n`);
  process.exit(1);
}

console.log(
  `💡 Documented counts check out: ${coreClaim} core + ${marketingClaim} marketing ` +
    `= ${docPages} component pages, all linked from the components index.`,
);
