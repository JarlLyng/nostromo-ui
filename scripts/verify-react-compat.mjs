#!/usr/bin/env node
/**
 * Installs the packed tarball into a throwaway project for each supported React
 * version and renders components there.
 *
 * This exists because `peerDependencies` shipped as an exact pin - `react:
 * "18.2.0"` - which made `npm install` fail outright with ERESOLVE for anyone on
 * React 18.3 or 19, i.e. most of the ecosystem. Nothing in the repo could catch
 * that: the workspace pins React 18.2.0 via pnpm overrides, so every local check
 * ran against the one version that happened to satisfy the pin.
 *
 * Uses npm rather than pnpm on purpose. npm is strict about peer conflicts by
 * default, which is exactly the behaviour being tested.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const pkgDir = join(root, "packages/nostromo");

/** The range in peerDependencies has to actually hold at both ends. */
const VERSIONS = ["18.2.0", "18.3.1", "19"];

const run = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { encoding: "utf8", stdio: "pipe", ...opts });

console.log("Packing the tarball...");
const packOut = run("npm", ["pack", "--pack-destination", tmpdir()], {
  cwd: pkgDir,
});
const tarball = join(tmpdir(), packOut.trim().split("\n").pop().trim());
console.log(`  ${tarball}\n`);

let failed = 0;
for (const version of VERSIONS) {
  const dir = mkdtempSync(join(tmpdir(), `react-compat-${version}-`));
  try {
    writeFileSync(
      join(dir, "package.json"),
      JSON.stringify({ name: "probe", private: true, type: "module" }),
    );
    copyFileSync(join(here, "react-compat-probe.mjs"), join(dir, "probe.mjs"));

    console.log(`react@${version}`);
    try {
      run("npm", ["install", `react@${version}`, `react-dom@${version}`, tarball], {
        cwd: dir,
      });
    } catch (error) {
      failed += 1;
      const out = `${error.stdout ?? ""}${error.stderr ?? ""}`;
      const reason = out.includes("ERESOLVE")
        ? "npm refused to install - peerDependencies do not admit this version"
        : out.split("\n").slice(-6).join("\n");
      console.log(`  INSTALL FAILED: ${reason}\n`);
      continue;
    }

    try {
      process.stdout.write(run("node", ["probe.mjs"], { cwd: dir }));
    } catch (error) {
      failed += 1;
      process.stdout.write(`${error.stdout ?? ""}${error.stderr ?? ""}`);
    }
    console.log();
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

rmSync(tarball, { force: true });

if (failed) {
  console.error(`${failed} of ${VERSIONS.length} React versions failed.`);
  process.exit(1);
}
console.log(`All ${VERSIONS.length} React versions install and render.`);
