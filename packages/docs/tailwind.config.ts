import type { Config } from 'tailwindcss'
import { nostromoPreset } from '@nostromo/ui-tw'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // Include our UI components
    '../../packages/ui-core/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [nostromoPreset],
  theme: {
    extend: {
      // Add any docs-specific theme extensions here
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
