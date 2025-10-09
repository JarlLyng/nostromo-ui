import preset from '@nostromo/ui-tw/tailwind.preset.js';

export default {
  presets: [preset],
  // I v4 med Vite-plugin er content ofte auto, men i monorepos er det sundt at være eksplicit:
  content: [
    './src/**/*.{ts,tsx,mdx}',
    '.storybook/**/*.{ts,tsx,mdx,html}',
    '../ui-marketing/src/**/*.{ts,tsx,mdx}',
    '../ui-tw/src/**/*.{ts,tsx,mdx}',
  ],
  // Midlertidig "bælte & seler": safelist kritiske klasser, så du ser dem straks
  safelist: [
    'bg-brand-500',
    'hover:bg-brand-600',
    'ring-brand-500',
    'border-brand-400/20',
    'text-brand-500',
    'border-brand-500',
  ],
  // Diagnostic plugin: tilføj en klar indikator hvis config læses
  plugins: [
    ({ addUtilities }) => addUtilities({ '.__tw-config-loaded': { outline: '3px solid lime' } })
  ],
};
