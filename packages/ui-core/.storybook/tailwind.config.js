import nostromoPreset from '@jarllyng/ui-tw/tailwind.preset.js';
import { join } from 'path';

export default {
  content: [
    // Storybook stories
    join(__dirname, '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'),
    // Component source files - IMPORTANT: ensures all Tailwind classes are included
    join(__dirname, '../src/**/*.{js,jsx,ts,tsx}'),
    // Also scan node_modules for installed packages
    join(__dirname, '../node_modules/@jarllyng/**/*.{js,jsx,ts,tsx}'),
  ],
  presets: [nostromoPreset],
}
