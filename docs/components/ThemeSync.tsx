"use client";

import { useEffect } from "react";
import { track } from "../lib/analytics";

/**
 * Bridges Nextra's dark mode to the library's, and reports theme changes.
 *
 * Nextra styles dark mode off a `dark` class on <html> (via next-themes), while
 * the library reads `data-color-scheme`. Without a bridge the toggle restyles
 * Nextra's chrome and leaves every component on the light palette.
 *
 * next-themes can write both at once, and Nextra's own types advertise it -
 * `attribute?: 'class' | ` + "`data-${string}`" + ` | (...)[]`. It does not work:
 * the schema is `z.union([attributeSchema, z.array(attributeSchema)])` and
 * attributeSchema calls `value.startsWith("data-")`, which *throws* on an array
 * rather than returning false, so the union never reaches its array branch and
 * the build dies in zod. Hence doing it here.
 *
 * Also carries the theme-change analytics that used to live in the Pages Router
 * `_app.tsx`, since it is already observing the same element.
 */
export function ThemeSync() {
  useEffect(() => {
    const root = document.documentElement;

    const sync = () => {
      const scheme = root.classList.contains("dark") ? "dark" : "light";
      // Guard the write: setting the attribute re-triggers this observer, and an
      // unconditional set would loop.
      if (root.getAttribute("data-color-scheme") !== scheme) {
        root.setAttribute("data-color-scheme", scheme);
      }
    };

    let previousTheme = root.getAttribute("data-theme");
    let previousScheme = root.getAttribute("data-color-scheme");

    const observer = new MutationObserver(() => {
      sync();
      const nextTheme = root.getAttribute("data-theme");
      const nextScheme = root.getAttribute("data-color-scheme");
      if (nextTheme !== previousTheme || nextScheme !== previousScheme) {
        previousTheme = nextTheme;
        previousScheme = nextScheme;
        track("theme_change", { theme: nextTheme, colorScheme: nextScheme });
      }
    });

    // next-themes applies the stored theme in a pre-hydration script, so the
    // class is already correct by the time this runs - sync once up front rather
    // than waiting for the first toggle.
    sync();
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-color-scheme"],
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
