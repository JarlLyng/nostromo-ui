import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts', 
    // Individual component entries for tree-shaking
    'src/components/button.tsx',
    'src/components/badge.tsx',
    'src/components/card.tsx',
    'src/components/avatar.tsx',
    'src/components/input.tsx',
    'src/components/dialog.tsx',
    'src/components/error-boundary.tsx',
    'src/components/tabs.tsx',
    'src/components/select.tsx',
    'src/components/label.tsx',
    'src/components/helper-text.tsx',
    'src/components/error-message.tsx',
    // Performance utilities
    'src/lib/lazy.tsx',
    'src/lib/performance.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  minify: true,
  target: 'es2022',
  outDir: 'dist',
  // Optimize bundle size
  esbuildOptions: (options) => {
    options.drop = ['console', 'debugger'];
    // Enable tree-shaking for better bundle optimization
    options.treeShaking = true;
    // Optimize for production
    if (process.env.NODE_ENV === 'production') {
      options.minifyIdentifiers = true;
      options.minifySyntax = true;
      options.minifyWhitespace = true;
    }
  },
  // Add bundle analysis in development
  onSuccess: process.env.ANALYZE === 'true' ? 'npx bundle-analyzer dist' : undefined,
});
