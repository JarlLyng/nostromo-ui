#!/usr/bin/env node
/**
 * A package that is both pinned by `pnpm.overrides` and named as a direct
 * dependency must be in dependabot's ignore list.
 *
 * Dependabot cannot update such a package coherently. Bumping the dependency
 * range rewrites the *lockfile's* overrides block without touching the one in
 * package.json, and every install after that fails with:
 *
 *   ERR_PNPM_LOCKFILE_CONFIG_MISMATCH
 *   The current "overrides" configuration doesn't match the value found in the
 *   lockfile
 *
 * React and its types were already ignored for exactly this reason, with the
 * explanation written into .github/dependabot.yml. postcss was in the same
 * position and was not, so a routine `postcss ^8.5.26 -> ^8.5.28` bump produced a
 * PR that could not install. This exists so the next package to join that set is
 * caught here rather than by a week of red CI.
 *
 * Ignoring costs nothing: an override governs what actually gets installed, so
 * the resolved version is already the newest that satisfies it. These floors and
 * pins move by editing the override, not by dependency PR.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parse } from "yaml";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(repoRoot, p), "utf8");

const root = JSON.parse(read("package.json"));
const overrides = Object.keys(root.pnpm?.overrides ?? {});

/** "brace-expansion@1" and "read-yaml-file>js-yaml" both name one package. */
function packageName(key) {
  if (key.includes(">")) return key.split(">").pop();
  const at = key.lastIndexOf("@");
  return at > 0 ? key.slice(0, at) : key;
}

const manifests = ["package.json"];
for (const dir of ["docs", "e2e", "test-app"]) {
  if (existsSync(join(repoRoot, dir, "package.json")))
    manifests.push(`${dir}/package.json`);
}
for (const dir of readdirSync(join(repoRoot, "packages"))) {
  if (existsSync(join(repoRoot, "packages", dir, "package.json")))
    manifests.push(`packages/${dir}/package.json`);
}

const direct = new Map();
for (const file of manifests) {
  const manifest = JSON.parse(read(file));
  for (const field of ["dependencies", "devDependencies", "peerDependencies"]) {
    for (const name of Object.keys(manifest[field] ?? {})) {
      if (!direct.has(name)) direct.set(name, []);
      direct.get(name).push(`${file} ${field}`);
    }
  }
}

const config = parse(read(".github/dependabot.yml"));
const npmEntry = config.updates.find(
  (u) => u["package-ecosystem"] === "npm" && u.directory === "/",
);
if (!npmEntry) {
  console.error("No npm entry for / in .github/dependabot.yml.");
  process.exit(1);
}
/** Only a blanket ignore helps here; ignoring majors still lets a minor through. */
const ignoredEntirely = new Set(
  (npmEntry.ignore ?? [])
    .filter((rule) => !rule["update-types"])
    .map((rule) => rule["dependency-name"]),
);

const missing = [];
for (const key of overrides) {
  const name = packageName(key);
  const where = direct.get(name);
  if (where && !ignoredEntirely.has(name)) missing.push({ name, key, where });
}

if (missing.length) {
  console.error(
    "These packages are pinned by pnpm.overrides AND are direct dependencies,\n" +
      "so Dependabot will produce a PR that cannot install. Add each to the\n" +
      "ignore list of the npm entry in .github/dependabot.yml, with no\n" +
      "update-types (a majors-only ignore still lets a minor through):\n",
  );
  for (const { name, key, where } of missing) {
    console.error(`  ${name}${key === name ? "" : `  (override key: ${key})`}`);
    for (const place of where) console.error(`      ${place}`);
  }
  process.exit(1);
}

const covered = overrides.filter((key) => direct.has(packageName(key)));
console.log(
  `💡 All ${covered.length} overridden direct dependencies are ignored by Dependabot: ` +
    covered.map(packageName).join(", "),
);
