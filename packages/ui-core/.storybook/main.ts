import type { StorybookConfig } from '@storybook/react-vite';
import { join } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: { builder: '@storybook/builder-vite' },
  viteFinal: async (config) => {
    // 1) React dedupe
    config.resolve = {
      ...config.resolve,
      dedupe: ['react', 'react-dom'],
    };

    // 2) PostCSS direkte - ingen Vite plugin
    config.css = {
      ...(config.css ?? {}),
      postcss: {
        plugins: [
          require('postcss-import'),
          require('@tailwindcss/postcss'),
          require('autoprefixer'),
        ],
      },
    };

    // 3) Basic optimizeDeps
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