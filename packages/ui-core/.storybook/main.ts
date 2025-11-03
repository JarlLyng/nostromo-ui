import type { StorybookConfig } from '@storybook/react-vite';
import { join } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: { builder: '@storybook/builder-vite' },
  viteFinal: async (config) => {
    // 1) React dedupe to avoid multiple React instances
    config.resolve = {
      ...config.resolve,
      dedupe: ['react', 'react-dom'],
    };

    // 2) Tailwind CSS v4 Vite plugin (required for Tailwind v4)
    // Explicitly point to the tailwind config file
    const tailwindVite = (await import('@tailwindcss/vite')).default;
    config.plugins = [...(config.plugins ?? []), tailwindVite({
      config: join(__dirname, '../tailwind.config.js'),
    })];

    // 3) Optimize dependencies for faster builds
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