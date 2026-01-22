import { defineConfig } from 'tsup';
import { copyFileSync, mkdirSync, readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Cross-platform copy function
function copyDir(src: string, dest: string) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

export default defineConfig({
  entry: [
    // Main entry
    'src/index.ts',
    // Plugin entry
    'src/plugin.ts',
    // Preset entry
    'src/preset.ts',
    // Core component entries for tree-shaking
    'src/components/core/accordion.tsx',
    'src/components/core/alert.tsx',
    'src/components/core/avatar.tsx',
    'src/components/core/badge.tsx',
    'src/components/core/breadcrumb.tsx',
    'src/components/core/button.tsx',
    'src/components/core/calendar.tsx',
    'src/components/core/card.tsx',
    'src/components/core/charts-lazy.tsx',
    'src/components/core/charts.tsx',
    'src/components/core/checkbox.tsx',
    'src/components/core/data-table.tsx',
    'src/components/core/dialog.tsx',
    'src/components/core/error-boundary.tsx',
    'src/components/core/error-message.tsx',
    'src/components/core/helper-text.tsx',
    'src/components/core/icon.tsx',
    'src/components/core/input.tsx',
    'src/components/core/label.tsx',
    'src/components/core/pagination.tsx',
    'src/components/core/progress.tsx',
    'src/components/core/radio-group.tsx',
    'src/components/core/select.tsx',
    'src/components/core/separator.tsx',
    'src/components/core/skeleton.tsx',
    'src/components/core/switch.tsx',
    'src/components/core/table.tsx',
    'src/components/core/tabs.tsx',
    'src/components/core/textarea.tsx',
    'src/components/core/toast.tsx',
    'src/components/core/tooltip.tsx',
    // Marketing component entries
    'src/components/marketing/features.tsx',
    'src/components/marketing/gallery.tsx',
    'src/components/marketing/hero.tsx',
    'src/components/marketing/logo-wall.tsx',
    'src/components/marketing/pricing.tsx',
    'src/components/marketing/testimonials.tsx',
    // Performance utilities
    'src/lib/lazy.tsx',
    'src/lib/performance.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  // Enable code splitting for better chunk optimization
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'tailwindcss'],
  treeshake: true,
  minify: true,
  target: 'es2022',
  outDir: 'dist',
  // Plugin to copy CSS files after build (cross-platform)
  plugins: [
    {
      name: 'copy-css-files',
      buildEnd() {
        try {
          // Copy themes directory
          const themesSrc = join(process.cwd(), 'src/themes');
          const themesDest = join(process.cwd(), 'dist/themes');
          copyDir(themesSrc, themesDest);
          
          // Copy styles directory (base.css)
          const stylesSrc = join(process.cwd(), 'src/styles');
          const stylesDest = join(process.cwd(), 'dist');
          const stylesEntries = readdirSync(stylesSrc, { withFileTypes: true });
          for (const entry of stylesEntries) {
            if (entry.isFile()) {
              copyFileSync(
                join(stylesSrc, entry.name),
                join(stylesDest, entry.name)
              );
            }
          }
          
          // Copy plugin.css (if it exists) - but we need to process @import paths
          const pluginCssSrc = join(process.cwd(), 'src/plugin.css');
          const pluginCssDest = join(process.cwd(), 'dist/plugin.css');
          try {
            if (statSync(pluginCssSrc).isFile()) {
              // Read and process plugin.css to fix import paths
              let pluginCssContent = readFileSync(pluginCssSrc, 'utf-8');
              // Replace relative paths with dist paths
              pluginCssContent = pluginCssContent.replace(
                /@import\s+"\.\/styles\/base\.css"/g,
                '@import "./base.css"'
              );
              pluginCssContent = pluginCssContent.replace(
                /@import\s+"\.\/themes\//g,
                '@import "./themes/'
              );
              writeFileSync(pluginCssDest, pluginCssContent);
            }
          } catch (error) {
            // plugin.css might not exist, that's okay
            console.warn('plugin.css not found, skipping');
          }
        } catch (error) {
          console.error('Error copying CSS files:', error);
        }
      },
    },
  ],
  // Optimize bundle size
  esbuildOptions: (options) => {
    options.drop = ['console', 'debugger'];
    options.treeShaking = true;
    if (process.env.NODE_ENV === 'production') {
      options.minifyIdentifiers = true;
      options.minifySyntax = true;
      options.minifyWhitespace = true;
    }
  },
  // Bundle analysis
  metafile: process.env.ANALYZE === 'true',
});
