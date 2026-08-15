import { describe, expect, it, beforeAll } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const distDir = join(root, "node_modules/@jarllyng/nostromo/dist");

/**
 * Tailwind is pointed at `app/` and nothing else.
 *
 * This matters more than it looks: Tailwind scans for class names, and if the
 * base included this directory it would scan the test files too - every class
 * name asserted on below would then be generated *because* it appears here, and
 * every assertion would pass vacuously. The consumer app lives in its own
 * directory so the only inputs are App.tsx and the @source the library declares
 * for its own dist.
 */
const appDir = join(root, "app");

/**
 * Compiles the consumer stylesheet and checks that the library's styling
 * actually survives the trip.
 *
 * This is the gap that let a total CSS failure ship: the package declared
 * Tailwind v4 as a peer but shipped a v3 setup, so none of the semantic colour
 * utilities were generated at all - and the library's own 1089 unit tests could
 * not see it, because they never compile CSS.
 */

/** Families whose output depends on the package's @theme bridge. */
const TOKEN_BACKED =
  /^(bg|text|border|ring|shadow|rounded|font|leading|from|to|via|divide|outline|fill|stroke|placeholder|caret|accent|decoration)(-|$)/;

/** CSS property names that collide with the prefixes above. */
const NOT_CLASSES = new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "font-variant",
  "text-align",
  "text-decoration",
  "text-transform",
  "text-overflow",
  "text-indent",
  "border-color",
  "border-width",
  "border-radius",
  "border-style",
  "border-collapse",
  "border-spacing",
  "background-color",
  "background-image",
  "outline-color",
  "outline-offset",
  "outline-width",
  "outline-style",
  "fill-opacity",
  "stroke-width",
  "stroke-linecap",
  "stroke-linejoin",
  "shadow-root",
  "ring-color",
  "leading-trim",
]);

const VARIANT =
  /^(?:[a-z0-9-]+|\[[^\]]*\]|data-\[[^\]]*\]|aria-\[[^\]]*\]|group-[a-z-]+|peer-[a-z-]+):/;

function stripVariants(cls: string): string {
  let out = cls;
  // Variants stack: hover:focus:data-[state=open]:bg-primary
  while (VARIANT.test(out) && out.includes(":")) {
    const next = out.slice(out.indexOf(":") + 1);
    if (!next) break;
    out = next;
  }
  return out;
}

function jsFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...jsFiles(p));
    else if (entry.name.endsWith(".js")) out.push(p);
  }
  return out;
}

/** Bare family names that are valid utilities on their own. */
const BARE_OK = new Set(["border", "rounded", "shadow", "ring", "outline"]);

/**
 * Token-backed class names the shipped components actually reference, kept with
 * their variants intact.
 *
 * The variants have to stay: `shadow-2xl` only ever appears as
 * `hover:shadow-2xl`, so Tailwind emits `.hover\:shadow-2xl:hover` and never a
 * bare `.shadow-2xl`. Checking the stripped name would report a healthy class as
 * missing.
 */
function usedTokenClasses(): string[] {
  const found = new Set<string>();
  for (const file of jsFiles(distDir)) {
    const src = readFileSync(file, "utf8");
    for (const match of src.matchAll(/["'`]([^"'`\n]{2,400})["'`]/g)) {
      for (const raw of match[1]!.split(/\s+/)) {
        const full = raw.trim();
        if (!full || full.length < 3) continue;
        const base = stripVariants(full);
        if (!TOKEN_BACKED.test(base)) continue;
        if (NOT_CLASSES.has(base)) continue;
        // Reject prose and CSS properties: a utility either has a hyphen or is
        // one of the standalone family names.
        if (!base.includes("-") && !BARE_OK.has(base)) continue;
        // One character class, one quantifier. An earlier version separated the
        // delimiter from the body, but both sets contained "-", so a "-" could
        // match either way and the regex backtracked exponentially on input like
        // "a-%-%-%-…". It runs over every string literal in dist, so that is a
        // real way to hang CI rather than a theoretical one.
        if (!/^[a-z][a-z0-9.%:/[\]()_=-]*$/i.test(full)) continue;
        found.add(full);
      }
    }
  }
  return [...found].sort();
}

let css = "";
let flatCss = "";

beforeAll(async () => {
  const entry = join(appDir, "app.css");
  const result = await postcss([tailwind({ base: appDir })]).process(
    readFileSync(entry, "utf8"),
    { from: entry },
  );
  css = result.css;
  // Selectors escape /, [, ], . and : - drop the escapes once so lookups are
  // plain string matches.
  flatCss = css.replace(/\\/g, "");
}, 60000);

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const generated = (cls: string) =>
  new RegExp(`\\.${escapeRe(cls)}(?![\\w-])`).test(flatCss);

describe("CSS contract", () => {
  it("compiles the documented two-import setup into real CSS", () => {
    expect(css.length).toBeGreaterThan(1000);
  });

  it("generates the semantic colour utilities a consumer uses", () => {
    // Exercised from app/App.tsx, not from this file - see the note there.
    // This is the set that was silently absent before the v4 migration.
    const core = [
      "bg-background",
      "text-foreground",
      "border-border",
      "ring-ring",
      "bg-primary",
      "text-primary-foreground",
      "bg-secondary",
      "text-secondary-foreground",
      "bg-muted",
      "text-muted-foreground",
      "bg-accent",
      "text-accent-foreground",
      "bg-card",
      "text-card-foreground",
      "bg-popover",
      "text-popover-foreground",
      "bg-destructive",
      "text-destructive-foreground",
      "bg-success",
      "bg-warning",
      "bg-error",
      "bg-info",
      "bg-brand-500",
      "shadow-card",
      "font-heading",
      "text-4xl",
      "leading-tight",
    ];
    expect(core.filter((c) => !generated(c))).toEqual([]);
  });

  it("resolves utilities through the theme, not to a literal", () => {
    // bg-primary must end up pointing at the token layer, so switching
    // [data-theme] at runtime still works.
    const match = flatCss.match(/\.bg-primary(?![\w-])[^{]*\{([^}]*)\}/);
    expect(match?.[1]).toContain("--nostromo-color-primary");
  });

  it("keeps max-w-* on the container scale", () => {
    // Mapping named spacing keys into Tailwind's --spacing-* namespace made
    // --spacing-2xl shadow --container-2xl, turning max-w-2xl into 48px.
    const match = flatCss.match(/\.max-w-2xl(?![\w-])[^{]*\{([^}]*)\}/);
    expect(match?.[1]).toContain("--container-2xl");
  });

  it("generates every token-backed class the components use", () => {
    const missing = usedTokenClasses().filter((c) => !generated(c));
    expect(
      missing,
      `classes that produce no CSS:\n  ${missing.join("\n  ")}`,
    ).toEqual([]);
  });

  // Dialog, Calendar and Toast carried `animate-in`, `fade-in-0`, `zoom-in-95`
  // and `slide-in-from-*` in their class lists from the day they were written,
  // and none of those utilities existed: tailwindcss-animate is a v3 plugin,
  // this package is CSS-first on v4, and nothing defined them. They were inert
  // strings, so none of those three ever animated. The class list looking right
  // is exactly why it went unnoticed - which is what this asserts against.
  it("generates the enter and exit animation utilities the components use", () => {
    const animation = [
      "animate-in",
      "animate-out",
      "fade-in-0",
      "fade-out-0",
      "zoom-in-95",
      "zoom-out-95",
      "slide-in-from-top-2",
      "slide-in-from-bottom-2",
      "slide-in-from-bottom-4",
      "slide-in-from-left-2",
      "slide-in-from-right-2",
      "animate-collapsible-down",
      "animate-collapsible-up",
    ];
    // `generated()` requires a leading dot, which is right for a bare utility -
    // but these are used behind `data-[state=closed]:` and friends, so the class
    // name sits after a colon in the selector. Accept either.
    const emitted = (cls: string) =>
      new RegExp(
        `[.:]${cls.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w-])`,
      ).test(flatCss);
    const missing = animation.filter((c) => !emitted(c));
    expect(
      missing,
      `animation utilities that produce no CSS:\n  ${missing.join("\n  ")}`,
    ).toEqual([]);
  });

  it("backs those utilities with real keyframes", () => {
    // A utility that sets animation-name to a keyframes block nobody declared
    // is the same dead end one level down.
    for (const name of [
      "nostromo-enter",
      "nostromo-exit",
      "nostromo-collapsible-down",
      "nostromo-collapsible-up",
    ]) {
      expect(css, `@keyframes ${name} missing`).toContain(`@keyframes ${name}`);
    }
  });

  it("defines every theme token the generated CSS references", () => {
    const theme = readFileSync(join(distDir, "themes/nostromo.css"), "utf8");
    const referenced = new Set(
      [...css.matchAll(/var\((--nostromo-[a-z0-9-]+)/g)].map((m) => m[1]!),
    );
    const undefinedTokens = [...referenced]
      .filter((name) => !theme.includes(`${name}:`))
      .sort();
    expect(
      undefinedTokens,
      `tokens referenced but never defined:\n  ${undefinedTokens.join("\n  ")}`,
    ).toEqual([]);
  });
});
