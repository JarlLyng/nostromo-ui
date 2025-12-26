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
    'src/components/icon.tsx',
    'src/components/progress.tsx',
    'src/components/table.tsx',
    'src/components/toast.tsx',
    'src/components/tooltip.tsx',
    'src/components/accordion.tsx',
    'src/components/skeleton.tsx',
    'src/components/checkbox.tsx',
    'src/components/radio-group.tsx',
    'src/components/switch.tsx',
    'src/components/textarea.tsx',
    'src/components/alert.tsx',
    'src/components/breadcrumb.tsx',
    'src/components/pagination.tsx',
    'src/components/separator.tsx',
    'src/components/data-table.tsx',
    'src/components/calendar.tsx',
    'src/components/charts.tsx',
    'src/components/charts-lazy.tsx',
    // Performance utilities
    'src/lib/lazy.tsx',
    'src/lib/performance.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  // Enable code splitting for better chunk optimization
  // This creates separate chunks for heavy components (Charts, DataTable, Calendar)
  splitting: true,
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
  // Bundle analysis - will be handled by analyze script
  metafile: process.env.ANALYZE === 'true',
});
