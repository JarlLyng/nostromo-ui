import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { toHaveNoViolations } from 'jest-axe';
import { axe } from 'jest-axe';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);
expect.extend(toHaveNoViolations);

// Make axe available globally for tests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).axe = axe;

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = '';
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
Object.defineProperty(window, 'matchMedia', {
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
