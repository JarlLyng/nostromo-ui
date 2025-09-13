import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: [
    '../src/vue/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/vue/**/*.story.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/vue3-vite',
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
    reactDocgen: 'vue-docgen-typescript',
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

    // Add Vue feature flags
    config.define = {
      ...config.define,
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
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
