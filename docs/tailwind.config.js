import nostromoPreset from '@jarllyng/nostromo/preset'

export default {
  content: [
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/nextra*/**/*.{js,jsx,ts,tsx}',
    // Scan installed packages
    './node_modules/@jarllyng/nostromo/**/*.{js,jsx,ts,tsx}',
    // IMPORTANT: Also scan source files to ensure all Tailwind classes are included
    '../../packages/nostromo/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [nostromoPreset],
}