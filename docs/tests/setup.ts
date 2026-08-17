import { afterEach } from "vitest";

// Without this, React logs "The current testing environment is not configured to
// support act(...)" and act() does not flush updates - which made the first
// version of the example harness read the error state before react-live had set
// it, so every example passed no matter how broken. React only honours the flag
// when it is on globalThis before the first render.
(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

// jsdom implements no ResizeObserver, and several Radix primitives measure with
// one - Slider and ScrollArea among them. Without this they throw
// "ReferenceError: ResizeObserver is not defined" while mounting, which looks
// like a broken example and is really a missing browser API. Every browser has
// had it for years, so stubbing it here is closing an environment gap rather
// than papering over a defect.
//
// It is a no-op on purpose: a callback that fires with a size would make layout
// assertions look meaningful when jsdom has no layout to measure.
class NoopResizeObserver implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (!("ResizeObserver" in globalThis)) {
  (globalThis as { ResizeObserver?: unknown }).ResizeObserver =
    NoopResizeObserver;
}

// Same gap, same reasoning: no IntersectionObserver in jsdom, and Embla
// constructs one to know which slides are on screen. A no-op means it is told
// about nothing, which is accurate here.
class NoopIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}
if (!("IntersectionObserver" in globalThis)) {
  (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver =
    NoopIntersectionObserver;
}

// jsdom does not implement window.matchMedia either, and Embla calls it to set
// up the `breakpoints` option - as `[...].map(ownerWindow.matchMedia)`, so an
// absent one fails as "TypeError: undefined is not a function" from inside
// Array.map, which reads like a broken Carousel example and is neither broken nor
// about the Carousel.
//
// `matches: false` says no breakpoint is active, which is the only answer that
// means anything when there is no viewport to measure. A plain function, not a
// method, because the caller above passes it unbound.
//
// Two details that cost a debugging round each. The test is `typeof !==
// "function"`, not `"matchMedia" in window`: jsdom declares the property as a
// getter that returns undefined, so `in` is true and a presence check skips the
// stub. And it goes in through defineProperty, because assigning over a
// getter-only property does nothing.
if (typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

afterEach(() => {
  document.body.innerHTML = "";
});
