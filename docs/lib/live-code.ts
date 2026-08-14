import * as Nostromo from "@jarllyng/nostromo";
import React from "react";

/**
 * The transform and the scope that `LiveCode` hands to react-live.
 *
 * Both used to live inside LiveCode.client.tsx. They are out here so the example
 * render harness can exercise the real thing: a harness that reimplements the
 * transform tests its own copy and nothing else, which would have missed every
 * bug the transform has actually had.
 */

/**
 * Everything an example can reach without importing it.
 *
 * `...Nostromo` covers every package export, so the component names need no
 * separate listing. React and its hooks are here because several examples call
 * `React.useState` or bare `useState` without an import - that is the form
 * LiveCode has always accepted, and the docs are written to it.
 *
 * No `render` in here on purpose: react-live injects the real one in noInline
 * mode, and a stub in scope shadows it, so the preview silently renders nothing
 * instead of the component.
 */
export const liveCodeScope: Record<string, unknown> = {
  React,
  ...Nostromo,
  useState: React.useState,
  useEffect: React.useEffect,
  useRef: React.useRef,
  useCallback: React.useCallback,
  useMemo: React.useMemo,
};

export interface TransformedLiveCode {
  code: string;
  noInline: boolean;
}

/**
 * Rewrite an example into something react-live can evaluate.
 *
 * The examples are written the way a consumer would write them - imports at the
 * top, `export default function Example()` below - because that is what people
 * copy out. react-live understands neither.
 */
export function transformLiveCode(
  source: string,
  noInline = false,
): TransformedLiveCode {
  let code = source
    .trim()
    .split("\n")
    .filter((line) => !line.trim().startsWith("import "))
    .join("\n")
    .trim();

  // In noInline mode react-live evaluates the block as statements and requires a
  // render() call. Turn the default export into one.
  const defaultExport = code.match(
    /export\s+default\s+function\s+([A-Za-z0-9_$]+)/,
  );
  if (defaultExport) {
    code = `${code.replace(/export\s+default\s+/, "")}\n\nrender(<${defaultExport[1]} />)`;
  } else {
    code = code.replace(/export\s+default\s+/, "");

    // Some examples declare the component without exporting it - `function
    // ThemeDemo()` or `const ComponentPreview = () =>`. Those have no default
    // export to rewrite, so nothing appended a render() call and react-live threw
    // "No-Inline evaluations must call `render`". Pick up the last top-level
    // PascalCase declaration and render that instead.
    if (!/\brender\s*\(/.test(code)) {
      const declarations = [
        ...code.matchAll(
          /^(?:function|const|let|var)\s+([A-Z][A-Za-z0-9_$]*)/gm,
        ),
      ];
      const component = declarations.at(-1)?.[1];
      if (component) code = `${code}\n\nrender(<${component} />)`;
    }
  }

  // Derive the mode from the code instead of guessing at it. An earlier version
  // set noInline whenever the source contained `export default`, which is every
  // example - and then react-live threw "No-Inline evaluations must call
  // `render`" for all of them, because nothing added the render call.
  return { code, noInline: noInline || /\brender\s*\(/.test(code) };
}
