import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    // Timeout configuration to prevent hanging tests
    // Higher timeout in CI due to resource constraints
    testTimeout: process.env.CI ? 20000 : 10000, // 20s in CI, 10s locally
    hookTimeout: process.env.CI ? 20000 : 10000, // 20s in CI, 10s locally
    teardownTimeout: process.env.CI ? 20000 : 10000, // 20s in CI, 10s locally
    // Limit concurrency to prevent resource exhaustion in CI
    maxConcurrency: process.env.CI ? 2 : 5, // Lower concurrency in CI
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.stories.*',
        '**/*.test.*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': './src',
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
});
