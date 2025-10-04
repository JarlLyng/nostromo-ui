import nostromoPreset from '@nostromo/ui-tw/tailwind.preset.js'

export default {
  content: [
    '../src/**/*.{js,jsx,ts,tsx}',
    '../src/**/*.stories.{js,jsx,ts,tsx}',
    '../src/**/__stories__/*.stories.{js,jsx,ts,tsx}',
  ],
  presets: [nostromoPreset],
}
