import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * Pull the fenced TypeScript blocks out of the MDX pages.
 *
 * The `<LiveCode>` snippets are the ones a reader can run in place, and they
 * have been type-checked since #232. The ordinary fenced blocks under Usage and
 * Examples are the ones a reader *copies*, and nothing looked at them at all -
 * which is how Pricing came to document `price: "$9"`, string features and no
 * `cta`, three properties into a component that wants none of them (#252).
 *
 * Only `tsx`, `jsx` and `ts` fences are candidates. `bash`, `css` and `html` are
 * not TypeScript and there is nothing here that could check them.
 */
const CHECKABLE = new Set(["tsx", "jsx", "ts"]);

/**
 * How a page says a block is not meant to compile on its own.
 *
 * Plenty of blocks are deliberately partial: a props table's worth of object
 * literals, a JSX fragment referring to a `plans` defined three paragraphs up, a
 * shape being described rather than used. Those are useful documentation and
 * checking them would only produce noise.
 *
 * So the fence carries the word itself - ```tsx fragment - rather than the
 * validator keeping a list of pages to skip. The marker is next to the code, a
 * reader can see it, and it moves with the block when someone reorganises a
 * page. A skip-list somewhere else goes stale silently, which is the failure
 * mode this whole script exists to catch.
 */
const FRAGMENT_MARKERS = new Set(["fragment", "pseudo", "no-check"]);

export function extractFencedExamples(contentDir, repoRoot = process.cwd()) {
  const out = [];
  for (const file of walk(contentDir)) {
    if (!file.endsWith(".mdx")) continue;
    const source = readFileSync(file, "utf8");
    const rel = relative(repoRoot, file);
    let index = 0;
    for (const block of blocksIn(source)) {
      out.push({
        file: rel,
        index: index++,
        line: block.line,
        code: block.code,
        lang: block.lang,
        fragment: block.fragment,
      });
    }
  }
  return out;
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

function* blocksIn(source) {
  const lines = source.split("\n");
  let i = 0;
  while (i < lines.length) {
    const open = /^(\s*)```([^\s`]+)(.*)$/.exec(lines[i]);
    if (!open) {
      i++;
      continue;
    }
    const [, indent, lang, meta] = open;
    // Find the matching close at the same indentation. Nested fences inside a
    // block would need a longer fence to be legal markdown, so same-length is
    // enough here.
    let j = i + 1;
    while (
      j < lines.length &&
      !new RegExp(`^${indent}\`\`\`\\s*$`).test(lines[j])
    )
      j++;
    if (j >= lines.length) return;

    if (CHECKABLE.has(lang)) {
      const words = meta.trim().split(/\s+/).filter(Boolean);
      yield {
        line: i + 2, // first line of code, 1-based
        lang,
        fragment: words.some((w) => FRAGMENT_MARKERS.has(w)),
        code: lines
          .slice(i + 1, j)
          .map((l) => (l.startsWith(indent) ? l.slice(indent.length) : l))
          .join("\n"),
      };
    }
    i = j + 1;
  }
}
