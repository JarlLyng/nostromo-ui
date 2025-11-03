import nostromoPreset from '@nostromo/ui-tw/tailwind.preset.js'

export default {
  content: [
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/nextra*/**/*.{js,jsx,ts,tsx}',
    // Scan installed packages
    './node_modules/@nostromo/**/*.{js,jsx,ts,tsx}',
    // IMPORTANT: Also scan source files to ensure all Tailwind classes are included
    '../../packages/ui-core/src/**/*.{js,jsx,ts,tsx}',
    '../../packages/ui-marketing/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [nostromoPreset],
}