import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = join(here, "..", "node_modules/@jarllyng/nostromo/dist");

const DIRECTIVE = '"use client";';

function collectModules(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectModules(full, found);
    } else if (/\.(js|cjs)$/.test(entry.name)) {
      found.push(full);
    }
  }
  return found;
}

/**
 * Guards the React Server Component boundary.
 *
 * The package ships components that use hooks. Under the Next.js App Router -
 * where Server Components are the default - importing one without a
 * `"use client"` directive fails the consumer's build outright with "You're
 * importing a module that depends on `useState` into a React Server Component
 * module". For a long time the package had no directives at all, so it simply
 * could not be used there.
 *
 * The directive is added by a post-build step in tsup.config.ts, because esbuild
 * strips top-level directives from source and tsup's `banner` option is removed
 * by the minifier. That makes this an easy thing to lose silently: nothing about
 * the source files says it has to be there, and neither the library's own tests
 * nor a plain `pnpm build` would notice its absence.
 */
describe("react server component contract", () => {
  const modules = collectModules(distDir);

  it("emits modules to check", () => {
    expect(modules.length).toBeGreaterThan(50);
  });

  it("marks every emitted module as a client boundary", () => {
    const missing = modules
      .filter((file) => !readFileSync(file, "utf8").startsWith(DIRECTIVE))
      .map((file) => file.slice(distDir.length + 1));

    expect(missing).toEqual([]);
  });

  it("puts the directive first, where a bundler will honour it", () => {
    // A directive only counts inside the prologue. `"use strict"` may follow it
    // in the CJS output, but nothing else may come first.
    const entry = join(distDir, "index.cjs");
    const firstLine = readFileSync(entry, "utf8").split("\n", 1)[0];

    expect(firstLine).toBe(DIRECTIVE);
  });
});
