import * as React from "react";

/**
 * The width below which a layout should switch to its narrow form.
 *
 * 768px, matching Tailwind's `md`, so a component that branches in JS and a
 * class that branches in CSS agree about where the break is.
 */
export const MOBILE_BREAKPOINT = 768;

/**
 * True while the viewport is narrower than {@link MOBILE_BREAKPOINT}.
 *
 * Some things cannot be done in CSS. `Sidebar` renders a `Sheet` on a phone and
 * a fixed column on a desktop, which is a different tree, not a different set of
 * classes - so the branch has to happen in JS.
 *
 * Built on `useSyncExternalStore` rather than an effect that copies the match
 * into state. The effect version renders once with the wrong answer, and prefer
 * anything that reads a live browser value to be read rather than mirrored.
 * `false` is the server snapshot: a layout that assumes desktop and corrects on
 * hydration is the safer of the two guesses, since the mobile branch is a
 * portalled dialog.
 */
export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT): boolean {
  const query = `(max-width: ${breakpoint - 1}px)`;

  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined" || !window.matchMedia) return () => {};
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  return React.useSyncExternalStore(
    subscribe,
    () =>
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia(query).matches
        : false,
    () => false,
  );
}
