import nostromoPreset from '@nostromo/ui-tw/tailwind.preset.js';

export default {
  presets: [nostromoPreset],
  // v4 kræver normalt ikke content, når du bruger Vite-plugin'et,
  // men det skader ikke at være eksplicit i monorepo:
  content: [
    './src/**/*.{ts,tsx,mdx}',
    '../ui-*/src/**/*.{ts,tsx,mdx}',          // andre lokale pakker
    '.storybook/**/*.{ts,tsx,mdx}',          // hvis du har decorators/story-helpers
  ],
};
