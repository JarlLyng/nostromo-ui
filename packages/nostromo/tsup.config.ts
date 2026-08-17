import { defineConfig } from "tsup";
import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "fs";
import { join } from "path";

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
    "src/index.ts",
    // Core component entries for tree-shaking
    "src/components/core/accordion.tsx",
    "src/components/core/alert.tsx",
    "src/components/core/avatar.tsx",
    "src/components/core/badge.tsx",
    "src/components/core/breadcrumb.tsx",
    "src/components/core/button.tsx",
    "src/components/core/calendar.tsx",
    "src/components/core/card.tsx",
    "src/components/core/charts-lazy.tsx",
    "src/components/core/charts.tsx",
    "src/components/core/popover.tsx",
    "src/components/core/dropdown-menu.tsx",
    "src/components/core/sheet.tsx",
    "src/components/core/alert-dialog.tsx",
    "src/components/core/toggle.tsx",
    "src/components/core/context-menu.tsx",
    "src/components/core/hover-card.tsx",
    "src/components/core/scroll-area.tsx",
    "src/components/core/slider.tsx",
    "src/components/core/form.tsx",
    "src/components/core/carousel.tsx",
    "src/components/core/input-otp.tsx",
    "src/components/core/resizable.tsx",
    "src/components/core/command.tsx",
    "src/components/core/drawer.tsx",
    "src/components/core/menubar.tsx",
    "src/components/core/navigation-menu.tsx",
    "src/components/core/aspect-ratio.tsx",
    "src/components/core/collapsible.tsx",
    "src/components/core/chart-composable.tsx",
    "src/components/core/checkbox.tsx",
    "src/components/core/data-table.tsx",
    "src/components/core/dialog.tsx",
    "src/components/core/error-boundary.tsx",
    "src/components/core/error-message.tsx",
    "src/components/core/helper-text.tsx",
    "src/components/core/icon.tsx",
    "src/components/core/input.tsx",
    "src/components/core/label.tsx",
    "src/components/core/pagination.tsx",
    "src/components/core/progress.tsx",
    "src/components/core/radio-group.tsx",
    "src/components/core/select.tsx",
    "src/components/core/separator.tsx",
    "src/components/core/skeleton.tsx",
    "src/components/core/switch.tsx",
    "src/components/core/table.tsx",
    "src/components/core/tabs.tsx",
    "src/components/core/textarea.tsx",
    "src/components/core/toast.tsx",
    "src/components/core/tooltip.tsx",
    // Marketing component entries
    "src/components/marketing/features.tsx",
    "src/components/marketing/gallery.tsx",
    "src/components/marketing/hero.tsx",
    "src/components/marketing/logo-wall.tsx",
    "src/components/marketing/pricing.tsx",
    "src/components/marketing/testimonials.tsx",
    // Performance utilities
    "src/lib/lazy.tsx",
    "src/lib/performance.ts",
  ],
  format: ["cjs", "esm"],
  dts: true,
  // Enable code splitting for better chunk optimization
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "tailwindcss"],
  treeshake: true,
  minify: true,
  target: "es2022",
  outDir: "dist",
  // Plugin to copy CSS files after build (cross-platform)
  plugins: [
    {
      name: "copy-css-files",
      buildEnd() {
        try {
          // Copy themes directory
          const themesSrc = join(process.cwd(), "src/themes");
          const themesDest = join(process.cwd(), "dist/themes");
          copyDir(themesSrc, themesDest);

          // Copy styles directory (tailwind.css, tokens.css, base.css) flat into
          // dist/, which is what the ./tailwind.css export and the @source glob
          // inside it assume.
          const stylesSrc = join(process.cwd(), "src/styles");
          const stylesDest = join(process.cwd(), "dist");
          const stylesEntries = readdirSync(stylesSrc, { withFileTypes: true });
          for (const entry of stylesEntries) {
            if (entry.isFile()) {
              copyFileSync(
                join(stylesSrc, entry.name),
                join(stylesDest, entry.name),
              );
            }
          }
        } catch (error) {
          console.error("Error copying CSS files:", error);
        }
      },
    },
    {
      // Written after the bundler has finished, not before it. esbuild strips
      // top-level directives, so a `"use client"` in the source never survives,
      // and tsup's `banner` option is dropped by the minifier - both verified by
      // building and grepping dist. Prepending here is the only placement
      // nothing downstream can remove.
      //
      // Applied to every emitted module, chunks included: entry files are thin
      // re-exports, so marking only the entries would leave the actual component
      // code in an unmarked chunk.
      name: "use-client-directive",
      buildEnd() {
        const DIRECTIVE = '"use client";\n';
        const dist = join(process.cwd(), "dist");
        let marked = 0;

        const visit = (dir: string) => {
          for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const full = join(dir, entry.name);
            if (entry.isDirectory()) {
              visit(full);
              continue;
            }
            if (!/\.(js|cjs)$/.test(entry.name)) continue;
            const source = readFileSync(full, "utf8");
            if (source.startsWith(DIRECTIVE)) continue;
            writeFileSync(full, DIRECTIVE + source);
            marked++;
          }
        };

        try {
          visit(dist);
          console.log(`use-client-directive: marked ${marked} modules`);
        } catch (error) {
          console.error("Error adding use client directives:", error);
          throw error;
        }
      },
    },
  ],
  // Optimize bundle size
  esbuildOptions: (options) => {
    options.drop = ["console", "debugger"];
    options.treeShaking = true;
    if (process.env.NODE_ENV === "production") {
      options.minifyIdentifiers = true;
      options.minifySyntax = true;
      options.minifyWhitespace = true;
    }
  },
  // Bundle analysis
  metafile: process.env.ANALYZE === "true",
});
