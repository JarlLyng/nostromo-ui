import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts', 
    // Individual component entries
    'src/components/button.tsx',
    'src/components/badge.tsx',
    'src/components/card.tsx',
    'src/components/avatar.tsx',
    'src/components/input.tsx',
    'src/components/dialog.tsx',
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
  },
});
