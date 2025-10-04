import nostromoPreset from '@nostromo/ui-tw/tailwind.preset.js'

export default {
  content: [
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/nextra*/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nostromo/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [nostromoPreset],
}