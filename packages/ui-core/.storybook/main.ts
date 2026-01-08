import type { StorybookConfig } from '@storybook/react-vite';
import { join } from 'path';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)',
    '../../ui-marketing/src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: { builder: '@storybook/builder-vite' },
  // Configure base path for GitHub Pages deployment
  // This is read from environment variable set in CI/CD
  // Defaults to root path for local development
  base: process.env.STORYBOOK_BASE_PATH || '/',
  viteFinal: async (config) => {
    // 1) React dedupe to avoid multiple React instances
    config.resolve = {
      ...config.resolve,
      dedupe: ['react', 'react-dom'],
    };

    // 2) Tailwind CSS v4 Vite plugin (required for Tailwind v4)
    // Vite plugin automatically finds tailwind.config.js in the project root
    const tailwindVite = (await import('@tailwindcss/vite')).default;
    config.plugins = [...(config.plugins ?? []), tailwindVite()];

    // 3) Configure base path for Vite (for GitHub Pages subpath deployment)
    // This ensures all assets are loaded from the correct subpath
    const basePath = process.env.STORYBOOK_BASE_PATH || '/';
    if (basePath !== '/') {
      config.base = basePath.endsWith('/') ? basePath : `${basePath}/`;
    }

    // 4) Optimize dependencies for faster builds
    config.optimizeDeps = {
      ...(config.optimizeDeps ?? {}),
      force: true,
      include: [
        'react', 'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
      ],
    };

    return config;
  },
};

export default config;