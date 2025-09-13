import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.story.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
      viteFinal: async (config) => {
        // Disable PostCSS to avoid conflicts
        config.css = {
          postcss: false,
        };

        // Add alias for our CSS files
        config.resolve = config.resolve || {};
        config.resolve.alias = {
          ...config.resolve.alias,
          '@nostromo/ui-tw': '../../packages/ui-tw/src',
        };

        return config;
      },
};

export default config;
