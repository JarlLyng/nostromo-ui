import type { StorybookConfig } from '@storybook/react-vite';

import { join, dirname } from "path"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)",
    "../src/**/__stories__/*.stories.@(js|jsx|mjs|ts|tsx|mdx)"
  ],
  "addons": [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding')
  ],
  "framework": {
    "name": getAbsolutePath('@storybook/react-vite'),
    "options": {}
  },
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "viteFinal": async (config) => {
    // Configure base URL for GitHub Pages deployment
    config.base = '/nostromo-ui/storybook-static/';
    
    // Add Tailwind CSS support
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      css: {
        postcss: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        },
      },
    });
  }
};
export default config;