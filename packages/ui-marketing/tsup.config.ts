import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    // Individual component entries for tree-shaking
    'src/components/hero.tsx',
    'src/components/testimonials.tsx',
    'src/components/features.tsx',
    'src/components/pricing.tsx',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', '@nostromo/ui-core'],
  treeshake: true,
  minify: true,
  target: 'es2022',
  outDir: 'dist',
});
