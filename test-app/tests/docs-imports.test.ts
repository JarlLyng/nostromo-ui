import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as nostromo from "@jarllyng/nostromo";

const docsContent = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../docs/content",
);

function mdxFiles(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) mdxFiles(full, found);
    else if (entry.name.endsWith(".mdx")) found.push(full);
  }
  return found;
}

/**
 * Every identifier the docs import from the package, with the file that wants it.
 *
 * Reads the fenced code blocks, because those are the examples that actually run
 * in the live previews - and they are what a reader copies out.
 */
function importedNames(): Map<string, Set<string>> {
  const wanted = new Map<string, Set<string>>();

  for (const file of mdxFiles(docsContent)) {
    const source = readFileSync(file, "utf8");
    const label = file.slice(docsContent.length + 1);

    for (const match of source.matchAll(
      /import\s*\{([^}]+)\}\s*from\s*['"]@jarllyng\/nostromo(?:\/[^'"]*)?['"]/g,
    )) {
      for (const raw of match[1].split(",")) {
        const name = raw
          .trim()
          .split(/\s+as\s+/)[0]
          .trim();
        if (!name || name.startsWith("type ")) continue;
        if (!wanted.has(name)) wanted.set(name, new Set());
        wanted.get(name)!.add(label);
      }
    }
  }

  return wanted;
}

/**
 * Guards the names, not just the entry points.
 *
 * `pnpm validate:exports` checks that every component *file* has an entry in the
 * exports map, and it passed while `RadioGroupItem`, `useToast` and
 * `DialogTrigger` were all missing from the package - so the RadioGroup, Toast
 * and Dialog documentation pages each threw a ReferenceError at the reader. The
 * file-level check cannot see that, because the files existed; it was the named
 * exports that did not.
 */
describe("documented imports resolve", () => {
  const wanted = importedNames();

  it("finds imports to check", () => {
    expect(wanted.size).toBeGreaterThan(20);
  });

  it("exports every name the docs import", () => {
    const missing = [...wanted.entries()]
      .filter(([name]) => !(name in nostromo))
      .map(([name, files]) => `${name} (used in ${[...files].join(", ")})`);

    expect(missing).toEqual([]);
  });
});

/**
 * Same idea one level down: `Icon` looks its name up in a map and only
 * `console.warn`s on a miss, so a wrong name renders nothing and the page just
 * looks empty. The Features example asked for `Code`, `Accessibility` and
 * `Palette` - none of which were in the map, and all of which were silently
 * dropped.
 */
describe("documented icon names resolve", () => {
  const used = new Map<string, Set<string>>();

  for (const file of mdxFiles(docsContent)) {
    const label = file.slice(docsContent.length + 1);
    for (const match of readFileSync(file, "utf8").matchAll(
      /<Icon\s+name=["']([^"']+)["']/g,
    )) {
      if (!used.has(match[1])) used.set(match[1], new Set());
      used.get(match[1])!.add(label);
    }
  }

  it("finds icon usages to check", () => {
    expect(used.size).toBeGreaterThan(0);
  });

  it("uses only names the icon map knows", () => {
    const known = new Set(nostromo.iconNames as string[]);
    const unknown = [...used.entries()]
      .filter(([name]) => !known.has(name))
      .map(([name, files]) => `${name} (used in ${[...files].join(", ")})`);

    expect(unknown).toEqual([]);
  });
});
