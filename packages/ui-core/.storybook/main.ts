import type { StorybookConfig } from '@storybook/react-vite';
import autoprefixer from 'autoprefixer';
import tailwindPostcss from '@tailwindcss/postcss';

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

    // Ensure Tailwind v4 runs inside Storybook's Vite pipeline
    // Create/merge css.postcss config so utilities get generated for stories
    // @ts-ignore - config.css may be undefined on incoming type
    config.css = config.css || {};
    // @ts-ignore
    const existingPostcss = (config.css as any).postcss || {};
    const existingPlugins = Array.isArray((existingPostcss as any).plugins)
      ? (existingPostcss as any).plugins
      : [];
    // @ts-ignore
    (config.css as any).postcss = {
      ...(existingPostcss as any),
      plugins: [
        ...existingPlugins,
        tailwindPostcss(),
        autoprefixer(),
      ],
    };

    return config;
  }
};
export default config;