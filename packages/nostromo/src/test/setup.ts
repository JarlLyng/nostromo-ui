import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test case.
//
// The awaited setImmediate is not decoration. React 19's scheduler queues work
// through setImmediate, and if a callback is still pending when vitest tears the
// jsdom environment down, it runs against a window that no longer exists:
//
//   ReferenceError: window is not defined
//     at react-dom-client.development.js
//     at Immediate.performWorkUntilDeadline (scheduler.development.js)
//
// vitest counts that as an unhandled error and exits non-zero even when every
// test passed - which is exactly how it surfaced: 1167 passed, exit 1. Yielding
// one macrotask lets the queue drain while the environment is still alive.
// Timing-dependent, so it only showed up in CI's full parallel run.
afterEach(async () => {
  cleanup();
  await new Promise((resolve) => setImmediate(resolve));
});

// Mock IntersectionObserver
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];

  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
} as typeof IntersectionObserver;

// Mock ResizeObserver
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
