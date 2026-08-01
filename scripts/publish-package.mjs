#!/usr/bin/env node
/**
 * Publishes @jarllyng/nostromo with npm rather than pnpm.
 *
 * `changeset publish` picks its publish tool by sniffing the workspace, finds
 * pnpm, and runs `pnpm publish`. pnpm only learned OIDC/Trusted Publishing in
 * 10.12, and this workspace is pinned to 9.15.9 - so every release so far has
 * silently required a long-lived NPM_TOKEN no matter how npm's Trusted
 * Publisher page was configured. Publishing through npm directly decouples that
 * from the pnpm version we install and build with.
 *
 * Prints `New tag: <name>@<version>` on success because changesets/action v1
 * scrapes stdout for that line to decide which git tags and GitHub releases to
 * create. Dropping it would leave releases untagged. The `<name>@<version>` form
 * is required: the action's regex demands an `@version`, and it is also what
 * `changeset publish` emits for a workspace (the bare `v<version>` form is only
 * for single-package repos, which is why the older v3.1.0 tag looks different).
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const packageDir = join(repoRoot, "packages", "nostromo");
const { name, version } = JSON.parse(
  readFileSync(join(packageDir, "package.json"), "utf8"),
);

const alreadyPublished = async () => {
  // encodeURIComponent, not a hand-rolled slash swap: the scoped name is one
  // path segment, and CodeQL is right that replacing only the first "/" is the
  // kind of thing that holds until the input changes shape.
  const res = await fetch(
    `https://registry.npmjs.org/${encodeURIComponent(name)}/${version}`,
    { headers: { accept: "application/json" } },
  );
  if (res.status === 200) return true;
  if (res.status === 404) return false;
  throw new Error(
    `Could not ask the registry about ${name}@${version}: HTTP ${res.status}`,
  );
};

// Re-running a release must not fail. The workflow is manually dispatchable and
// a run that publishes then dies before tagging would otherwise be unrecoverable.
if (await alreadyPublished()) {
  console.log(`${name}@${version} is already on the registry - nothing to do.`);
  process.exit(0);
}

console.log(`Publishing ${name}@${version}...`);
execFileSync(
  "npm",
  [
    "publish",
    "--access",
    "public",
    // Attaches a signed build attestation naming this workflow and commit.
    // Needs `id-token: write`, which publish.yml grants.
    "--provenance",
    // Every failure path in npm's Trusted Publishing exchange is
    // `log.verbose('oidc', ...)` followed by `return undefined`
    // (npm/lib/utils/oidc.js), so at the default loglevel a rejected exchange
    // is indistinguishable from no exchange - you just get ENEEDAUTH with no
    // reason. This is the only way to see the registry's own explanation.
    "--loglevel",
    "verbose",
  ],
  { cwd: packageDir, stdio: "inherit" },
);

const tag = `${name}@${version}`;

// In CI the action creates this ref through the GitHub API and only warns if it
// already exists, so tagging here is belt-and-braces there - but it is what makes
// a hand-run `pnpm release` leave the same trail as an automated one.
try {
  execFileSync("git", ["tag", tag], { cwd: repoRoot, stdio: "pipe" });
} catch (err) {
  // Only an existing tag is benign. Catching everything here would hide a real
  // git failure behind a reassuring message - which it did, the first time.
  const stderr = String(err.stderr ?? "");
  if (!/already exists/.test(stderr)) {
    console.error(stderr.trim() || err.message);
    throw new Error(`Published ${tag}, but could not tag the commit.`);
  }
  console.log(`Tag ${tag} already exists locally - leaving it alone.`);
}

console.log(`New tag: ${tag}`);
