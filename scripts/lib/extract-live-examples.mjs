import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const MARKER = "<LiveCode";

/**
 * Pull every `<LiveCode code={`...`} />` snippet out of the MDX pages.
 *
 * The snippets live inside a template literal, so a regex over the whole file
 * cannot find the closing backtick reliably - examples contain backticks in
 * prose and `${...}` in JSX. This walks the string instead, tracking escapes,
 * which is the only way to get the boundary right.
 */
export function extractLiveExamples(contentDir, repoRoot = process.cwd()) {
  const out = [];
  for (const file of walk(contentDir)) {
    if (!file.endsWith(".mdx")) continue;
    const source = readFileSync(file, "utf8");
    const rel = relative(repoRoot, file);
    let index = 0;
    for (const snippet of snippetsIn(source)) {
      out.push({
        file: rel,
        index: index++,
        line: source.slice(0, snippet.start).split("\n").length,
        code: snippet.code,
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

function* snippetsIn(source) {
  let cursor = 0;
  while (true) {
    const tag = source.indexOf(MARKER, cursor);
    if (tag === -1) return;

    // `code={` may be separated from the tag by attributes or newlines.
    const attr = source.indexOf("code={", tag);
    const nextTag = source.indexOf(MARKER, tag + MARKER.length);
    if (attr === -1 || (nextTag !== -1 && attr > nextTag)) {
      cursor = tag + MARKER.length;
      continue;
    }

    const open = source.indexOf("`", attr);
    if (open === -1) return;

    let i = open + 1;
    let code = "";
    while (i < source.length) {
      const ch = source[i];
      if (ch === "\\") {
        // Inside the literal, ` and ${ arrive escaped. Unescape those two and
        // leave every other backslash alone - `\n` in a className must survive.
        const next = source[i + 1];
        if (next === "`" || next === "$" || next === "\\") {
          code += next;
          i += 2;
          continue;
        }
        code += ch;
        i += 1;
        continue;
      }
      if (ch === "`") break;
      code += ch;
      i += 1;
    }

    yield { start: open, code };
    cursor = i + 1;
  }
}
