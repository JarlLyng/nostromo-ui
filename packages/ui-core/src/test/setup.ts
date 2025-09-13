import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock CSS variables for testing
const mockCSSVariables = {
  '--color-brand-500': '262 84% 52%',
  '--color-brand-600': '262 84% 45%',
  '--color-neutral-50': '0 0% 98%',
  '--color-neutral-900': '0 0% 9%',
  '--color-neutral-200': '0 0% 90%',
  '--color-neutral-300': '0 0% 83%',
  '--color-error-500': '0 84% 60%',
  '--color-error-600': '0 84% 50%',
  '--radius-md': '0.5rem',
  '--text-sm': '0.875rem',
  '--text-base': '1rem',
  '--text-lg': '1.125rem',
  '--font-medium': '500',
  '--font-semibold': '600',
  '--shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  '--shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
};

// Apply mock CSS variables to document
Object.entries(mockCSSVariables).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value);
});
