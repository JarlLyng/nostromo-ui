import type { StorybookConfig } from '@storybook/react-vite';
import fs from 'node:fs';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
  addons: [
    // Tilføj kun essentials hvis du vil:
    // '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: { builder: '@storybook/builder-vite' },
  viteFinal: async (config) => {
    // 1) React dedupe og ESM/browser bias + symlink strategy
    config.resolve = {
      ...config.resolve,
      dedupe: ['react', 'react-dom'],
      // Bias ESM/browser-exports (hjælper i edge-cases):
      conditions: ['browser', 'module', 'import', 'default'],
      // Symlink strategy for pnpm monorepo
      preserveSymlinks: false
    };


    // 2) Tailwind v4 Vite plugin (⭐️ nøglepunktet)
    const tailwindVite = (await import('@tailwindcss/vite')).default;
    config.plugins = [...(config.plugins ?? []), tailwindVite()];

    // Diagnostic plugin: warn when raw CJS (`require(`) slips through to the browser
    const findRawRequire = {
      name: 'find-raw-require',
      enforce: 'pre',
      load(id) {
        // Only check library and workspace outputs
        if (!id.includes('node_modules') && !id.includes('/packages/')) return null;
        try {
          if (fs.existsSync(id)) {
            const code = fs.readFileSync(id, 'utf8');
            // If Vite/rollup transformed CJS, you'd see __commonJS wrappers; we only warn on raw requires
            if (/\brequire\s*\(/.test(code) && !code.includes('__commonJS')) {
              // eslint-disable-next-line no-console
              console.warn('[RAW-CJS] Served to browser:', id);
            }
          }
        } catch {}
        return null;
      },
    };
    config.plugins = [...(config.plugins ?? []), findRawRequire as unknown as Plugin];


    // 3) optimizeDeps: workspace packages are included (force prebundle)
    config.optimizeDeps = {
      ...(config.optimizeDeps ?? {}),
      force: true,
      include: [
        // Common external deps (IKKE workspace packages)
        'react', 'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'aria-hidden', 'react-remove-scroll',
        '@floating-ui/core', '@floating-ui/dom', '@floating-ui/react-dom',
        'phosphor-react',
        'tailwind-merge',
        'class-variance-authority', 'clsx',
        // Radix packages used in stories
        '@radix-ui/react-accordion',
        '@radix-ui/react-avatar',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-label',
        '@radix-ui/react-radio-group',
        '@radix-ui/react-select',
        '@radix-ui/react-switch',
        '@radix-ui/react-toggle'
      ],
      // Gør det nemmere for Vite at opdage entrypunkter i monorepoet
      entries: [
        '../src/**/*.stories.{ts,tsx,mdx}',
        '../src/**/*.tsx',
      ],
      esbuildOptions: {
        // Bias ESM/browser ved prebundle
        mainFields: ['module', 'browser', 'exports', 'main'],
        // platform: 'browser' er default, men eksplicit kan hjælpe i nogle setups
        platform: 'browser',
      },
    };

    return config;
  },
};
export default config;