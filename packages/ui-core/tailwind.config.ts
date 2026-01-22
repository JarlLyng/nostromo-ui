import preset from '@jarllyng/ui-tw/tailwind.preset.js';

export default {
  presets: [preset],
  // I v4 med Vite-plugin er content ofte auto, men i monorepos er det sundt at være eksplicit:
  content: [
    './src/**/*.{ts,tsx,mdx}',
    '../ui-marketing/src/**/*.{ts,tsx,mdx}',
    '../ui-tw/src/**/*.{ts,tsx,mdx}',
    '.storybook/**/*.{ts,tsx,mdx}',
  ],
  // Midlertidig "bælte & seler": safelist kritiske klasser, så du ser dem straks
  safelist: [
    'bg-brand-500',
    'hover:bg-brand-600',
    'ring-brand-500',
    'border-brand-400/20',
  ],
  // Diagnostic plugin: tilføj en klar indikator hvis config læses
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        '.__tw-config-loaded': { 
          outline: '3px solid lime',
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },
      });
    },
  ],
};
