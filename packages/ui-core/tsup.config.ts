import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/vue/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'vue'],
  treeshake: true,
  minify: true,
  target: 'es2022',
  outDir: 'dist',
});
