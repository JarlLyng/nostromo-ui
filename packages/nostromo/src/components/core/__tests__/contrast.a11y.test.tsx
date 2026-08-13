/**
 * Contrast Accessibility Tests
 *
 * Validates WCAG AA contrast for the token pairs components actually render
 * together, across every theme in both colour schemes.
 *
 * NOTE: This reads the theme stylesheets rather than rendered components, because
 * CSS variables are not resolved in jsdom. The theme variables are the source of
 * truth for component colours.
 *
 * This used to check one theme - mother - with a comment calling it the default,
 * which it is not; the package and the docs both use nostromo. Worse, it resolved
 * tokens with its own extractor that fell back to hardcoded values, so when a
 * token could not be read it silently compared the *fallback* instead and
 * reported that as the theme's contrast. Resolution now lives in
 * src/test/theme-tokens.ts, shared with scripts/validate-theme-contrasts.ts, and
 * throws instead of guessing.
 */

import { describe, it, expect } from "vitest";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { validateContrast } from "../../../lib/contrast-validator";
import {
  readTheme,
  resolveToken,
  THEMES,
  TOKEN_PAIRS,
} from "../../../test/theme-tokens";

const themeDir = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../themes",
);

// Name carries "accessibility": test:a11y selects by -t, so renaming this away
// silently dropped 96 contrast checks from the accessibility job.
describe("theme contrast accessibility", () => {
  for (const theme of THEMES) {
    const css = readTheme(themeDir, theme);

    for (const scheme of ["light", "dark"] as const) {
      // The light block is the base declaration; dark overrides it.
      const section = scheme === "light" ? css.light : css.dark;

      describe(`${theme} / ${scheme}`, () => {
        for (const [foregroundToken, backgroundToken] of TOKEN_PAIRS) {
          it(`${foregroundToken} on ${backgroundToken} meets WCAG AA`, () => {
            const foreground = resolveToken(section, css.full, foregroundToken);
            const background = resolveToken(section, css.full, backgroundToken);
            const result = validateContrast(foreground, background, "normal");

            expect(result.contrastRatio).toBeGreaterThanOrEqual(4.5);
            expect(result.meetsWCAGAA).toBe(true);
          });
        }
      });
    }
  }
});
