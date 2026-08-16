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

afterEach(() => {
  document.body.innerHTML = "";
});
