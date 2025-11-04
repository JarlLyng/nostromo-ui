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
  // Safelist: Ensure critical classes are always generated
  // This is more robust than explicit CSS rules in preview.css
  safelist: [
    // Brand colors - all variants
    {
      pattern: /(bg|text|border|ring|hover:bg|focus-visible:ring|focus-visible:border)-brand-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
    {
      pattern: /(border|ring)-brand-(400|500)\/(10|20)/,
    },
    // Error colors
    {
      pattern: /(bg|text|border|ring|hover:bg|focus-visible:ring|focus-visible:border)-error-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
    {
      pattern: /(border|ring)-error-(400|500)\/(10|20)/,
    },
    // Success colors
    {
      pattern: /(bg|text|border|ring|hover:bg|focus-visible:ring|focus-visible:border)-success-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
    {
      pattern: /(border|ring)-success-(400|500)\/(10|20)/,
    },
    // Neutral colors
    {
      pattern: /(bg|text|border|hover:bg|hover:border|focus-visible:bg|focus-visible:border)-neutral-(50|100|200|300|400|700|900)/,
    },
    {
      pattern: /bg-neutral-(50|100|200)\/(50|80)/,
    },
    // Checked states
    {
      pattern: /data-\[state=checked\]:(bg|text|border)-(brand|error|success)-(500|600)/,
    },
    // Focus states
    {
      pattern: /focus-visible:(ring|border)-(brand|error|success)-(500|600)/,
      variants: ['focus-visible'],
    },
    {
      pattern: /focus-visible:ring-(brand|error|success)-(500|600)\/(10|20)/,
    },
    // Shadows
    {
      pattern: /(shadow|hover:shadow|focus-visible:shadow)-(sm|md|lg)/,
    },
    // Spacing utilities (commonly used)
    {
      pattern: /(space-x|space-y)-(2|3|4)/,
    },
    {
      pattern: /(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap)-(1|2|3|4|6|8|10)/,
    },
    // Text colors
    {
      pattern: /text-(muted-foreground|destructive|white|error-600|success-600)/,
    },
    // Background colors
    {
      pattern: /bg-(background|white)/,
    },
  ],
  // Diagnostic plugin: tilføj en klar indikator hvis config læses
  plugins: [
    ({ addUtilities }) => addUtilities({ '.__tw-config-loaded': { outline: '3px solid lime' } })
  ],
};
