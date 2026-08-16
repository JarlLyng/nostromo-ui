import { createElement, act, useContext } from "react";
import { createRoot } from "react-dom/client";
import { LiveContext, LivePreview, LiveProvider } from "react-live";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { extractLiveExamples } from "../../scripts/lib/extract-live-examples.mjs";
import { liveCodeScope, transformLiveCode } from "../lib/live-code";

/**
 * Mount every documentation example the way a reader's browser does.
 *
 * scripts/validate-docs-examples.mjs proves the snippets compile. It cannot prove
 * they run: the failures reported in August were runtime, not type errors -
 * "SyntaxError", and "ReferenceError: RadioGroupItem is not defined" from a
 * component that had no export. Those reach the page regardless of what tsc says,
 * because LiveCode compiles the snippet in the browser.
 *
 * The transform and the scope are imported from docs/lib/live-code, not
 * reimplemented here. A harness with its own copy of the transform tests the copy
 * and would have missed every bug the real one has had - including the two already
 * recorded in its comments, where nothing appended the render() call.
 */

// vitest sets cwd to this config's root, i.e. docs/. Resolving off import.meta.url
// gave "/content" here, so use the working directory instead.
const docsDir = process.cwd();
const examples = extractLiveExamples(
  resolve(docsDir, "content"),
  resolve(docsDir, ".."),
);

let container: HTMLDivElement | null = null;

afterEach(() => {
  container?.remove();
  container = null;
});

/**
 * Render through react-live and return the error it recorded, if any.
 *
 * Read off LiveContext rather than scraped out of the DOM. react-live swallows
 * evaluation errors and reports them through context, so asserting "did not
 * throw" would pass on every broken example - and scanning rendered text for the
 * word "Error" gives a false positive on the ErrorMessage and ErrorBoundary
 * pages, whose examples render exactly that on purpose.
 */
async function renderExample(
  source: string,
  noInline: boolean,
): Promise<string> {
  const { code, noInline: needsNoInline } = transformLiveCode(source, noInline);

  let reported: unknown;
  const Probe = () => {
    reported = (useContext(LiveContext) as { error?: unknown } | null)?.error;
    return null;
  };

  container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  // await, not a bare act(): react-live evaluates the snippet asynchronously, so
  // a synchronous flush reads the error state before it has been set. That is what
  // made the first version of this harness pass on deliberately broken code.
  await act(async () => {
    root.render(
      createElement(
        LiveProvider,
        { code, scope: liveCodeScope, noInline: needsNoInline },
        createElement(LivePreview),
        createElement(Probe),
      ),
    );
  });
  await act(async () => root.unmount());

  if (reported === undefined || reported === null) return "";
  return String(reported).slice(0, 300);
}

describe("documentation examples", () => {
  it("finds the examples to check", () => {
    // A harness that silently checks nothing is worse than no harness. If the
    // extractor breaks, this fails rather than the suite passing on zero cases.
    expect(examples.length).toBeGreaterThan(70);
  });

  // Guards the guard. If react-live stops reporting through LiveContext, or the
  // probe stops seeing it, every example below would pass no matter how broken -
  // so prove the mechanism catches the two runtime failures actually reported
  // from the live site.
  it("reports a ReferenceError from an identifier that is not in scope", async () => {
    const error = await renderExample(
      "export default function Broken() {\n  return <NotAThing />\n}",
      false,
    );
    expect(error).toMatch(/NotAThing/);
  });

  it("reports a SyntaxError from code that does not parse", async () => {
    const error = await renderExample(
      "export default function Broken() { return (<div> }",
      false,
    );
    expect(error).not.toBe("");
  });

  it("reports a throw from inside render", async () => {
    const error = await renderExample(
      "export default function Broken() {\n  const items = undefined\n  return <div>{items.map((i) => i)}</div>\n}",
      false,
    );
    expect(error).toMatch(/undefined|Cannot read/i);
  });

  // A wrapped import is the natural way to write a long one, and the transform
  // used to filter line by line: the opening line went, the rest stayed as loose
  // tokens, and the preview threw a SyntaxError while the source looked fine.
  it("strips an import that wraps across lines", async () => {
    const error = await renderExample(
      [
        "import {",
        "  ChartContainer,",
        "  ChartBar,",
        "} from '@jarllyng/nostromo'",
        "",
        "export default function Wrapped() {",
        "  return <div>ok</div>",
        "}",
      ].join("\n"),
      false,
    );
    expect(error).toBe("");
  });

  // Prettier formats mdx as markdown and escapes markdown syntax inside the
  // template literal, so `(_, i)` in an example is `(\_, i)` on disk. The
  // browser reads that back as `(_, i)`, because JS drops an unrecognised
  // escape. An extractor that kept the backslash would report a syntax error on
  // a page that renders perfectly well, which is exactly what it did once.
  it("reads escapes the way a template literal does", async () => {
    const error = await renderExample(
      "export default function Escaped() {\n" +
        "  const items = Array.from({ length: 2 }, (_, i) => i)\n" +
        "  return <div>{items.length}</div>\n" +
        "}",
      false,
    );
    expect(error).toBe("");
  });

  for (const example of examples) {
    it(`${example.file} #${example.index} mounts`, async () => {
      const error = await renderExample(example.code, false);
      expect(
        error,
        `${example.file} example #${example.index} (line ${example.line})`,
      ).toBe("");
    });
  }
});
