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

    // 2) PostCSS configuration - direct configuration without Vite plugin
    config.css = {
      ...(config.css ?? {}),
      postcss: {
        plugins: [
          require('postcss-import'),
          require('@tailwindcss/postcss')({
            // Explicitly point to our Tailwind config
            config: join(__dirname, 'tailwind.config.js'),
          }),
          require('autoprefixer'),
        ],
      },
    };

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