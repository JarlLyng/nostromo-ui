import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/tailwind.preset.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['tailwindcss'],
  treeshake: true,
  minify: true,
  target: 'es2022',
  outDir: 'dist',
  // Copy CSS files to dist
  publicDir: 'src/styles',
  // Ensure CSS files are included
  loader: {
    '.css': 'copy',
  },
});
