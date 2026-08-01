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
 * Prints `New tag: <name>@<version>` on success because changesets/action
 * scrapes stdout for that line to decide which git tags and GitHub releases to
 * create. Dropping it would leave releases untagged.
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
  const res = await fetch(
    `https://registry.npmjs.org/${name.replace("/", "%2f")}/${version}`,
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
  ],
  { cwd: packageDir, stdio: "inherit" },
);

console.log(`New tag: ${name}@${version}`);
