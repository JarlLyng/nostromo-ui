/**
 * Resolves theme tokens out of the theme stylesheets.
 *
 * Not shipped - `src/test` is not a tsup entry.
 *
 * This exists in one place on purpose. The contrast test and
 * `scripts/validate-theme-contrasts.ts` each had their own copy, and both copies
 * carried the same two defects: they could not follow a `var()` reference whose
 * target lived in a different block, and they fell back to a hardcoded value when
 * extraction failed. The combination reported the *fallback's* contrast as though
 * it were the theme's - so three themes showed five failures each that were pure
 * artefacts, while genuinely broken pairs elsewhere passed unnoticed.
 */
import { readFileSync } from "fs";

const CHANNELS = /^[\d.]+\s+[\d.]+%\s+[\d.]+%$/;

/**
 * The full declaration block for a selector, brace-matched.
 *
 * Splitting on the first `}` is not enough: the theme files nest media queries,
 * and cutting early leaves the neutral scale outside the slice, so every
 * reference into it resolves to nothing.
 */
export function extractBlock(css: string, selector: string): string {
  const start = css.indexOf(selector);
  if (start === -1) return "";
  const open = css.indexOf("{", start);
  if (open === -1) return "";

  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") {
      depth--;
      if (depth === 0) return css.slice(open + 1, i);
    }
  }
  return css.slice(open + 1);
}

/**
 * Resolves a token to bare HSL channels, following the cascade.
 *
 * The scheme block wins; anything it does not restate is inherited from the base
 * block - and that order has to hold at *every* hop of a reference chain, not
 * just the first. Throws rather than guessing: a wrong number here is worse than
 * a failed run, because it looks like a real result.
 */
export function resolveToken(
  section: string,
  full: string,
  name: string,
): string {
  const seen = new Set<string>();

  const raw = (scope: string, token: string): string | null => {
    const match = scope.match(
      new RegExp(`--nostromo-color-${token}:\\s*([^;]+);`),
    );
    return match?.[1] ? match[1].trim() : null;
  };

  const walk = (token: string): string | null => {
    if (seen.has(token)) return null;
    seen.add(token);

    const value = raw(section, token) ?? raw(full, token);
    if (!value) return null;

    // Whitespace-tolerant: prettier wraps long declarations across lines.
    const ref = value.match(/var\(\s*--nostromo-color-([a-z0-9-]+)\s*\)/);
    if (ref?.[1]) return walk(ref[1]);

    return CHANNELS.test(value) ? value : null;
  };

  const resolved = walk(name);
  if (!resolved) {
    throw new Error(
      `Could not resolve --nostromo-color-${name}. Fix the theme or this resolver; do not guess a value.`,
    );
  }
  return resolved;
}

export type ThemeName = "nostromo" | "mother" | "lv-426" | "sulaco";
export const THEMES: ThemeName[] = ["nostromo", "mother", "lv-426", "sulaco"];

/**
 * The token pairs a component actually renders together, so a failure here means
 * unreadable text somewhere real rather than a hypothetical combination.
 *
 * `error` pairs against `error-600` because that is what `tokens.css` maps
 * `--color-error` to; `error-500` stays available for borders and tints.
 */
export const TOKEN_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["foreground", "background"],
  ["muted-foreground", "muted"],
  ["card-foreground", "card"],
  ["popover-foreground", "popover"],
  ["primary-foreground", "primary"],
  ["secondary-foreground", "secondary"],
  ["destructive-foreground", "destructive"],
  ["accent-foreground", "accent"],
  ["success-foreground", "success-500"],
  ["warning-foreground", "warning-500"],
  ["error-foreground", "error-600"],
  ["info-foreground", "info-500"],
];

export function readTheme(themeDir: string, theme: ThemeName) {
  const full = readFileSync(`${themeDir}/${theme}.css`, "utf8");
  return {
    full,
    light: extractBlock(full, `[data-theme="${theme}"]`),
    dark: extractBlock(
      full,
      `[data-theme="${theme}"][data-color-scheme="dark"]`,
    ),
  };
}
