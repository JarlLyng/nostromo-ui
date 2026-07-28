import "@testing-library/jest-dom/vitest";

// The library's Popover/Tooltip/Progress paths touch these; jsdom has neither.
// Kept minimal on purpose - if a component needs more than this to mount, that
// is worth knowing rather than papering over.
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: NoopObserver,
});
Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: NoopObserver,
});
