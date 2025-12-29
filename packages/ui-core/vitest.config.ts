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
    // Increased from 2 to 4 to improve test performance while maintaining stability
    maxConcurrency: process.env.CI ? 4 : 5, // Increased concurrency in CI for better performance
    // Disable coverage in CI to speed up tests (coverage can be run separately)
    coverage: process.env.CI ? undefined : {
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
    // Stop on first failure in CI to prevent hanging
    bail: process.env.CI ? 1 : 0,
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
