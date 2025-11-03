import nostromoPreset from '@nostromo/ui-tw/tailwind.preset.js';

export default {
  content: [
    // Storybook stories
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    // Component source files - IMPORTANT: ensures all Tailwind classes are included
    '../src/**/*.{js,jsx,ts,tsx}',
    // Also scan node_modules for installed packages
    '../node_modules/@nostromo/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [nostromoPreset],
}
