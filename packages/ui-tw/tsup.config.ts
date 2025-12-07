import { defineConfig } from 'tsup';
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
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
          
          // Copy styles directory
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
        } catch (error) {
          console.error('Error copying CSS files:', error);
        }
      },
    },
  ],
});
