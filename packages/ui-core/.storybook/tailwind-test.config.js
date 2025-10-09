export default {
  content: [
    './.storybook/test-content.html',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: 'hsl(var(--color-brand-500) / <alpha-value>)',
        },
      },
    },
  },
  safelist: [
    'bg-brand-500',
    '__tw-config-loaded',
  ],
  plugins: [
    ({ addUtilities }) => addUtilities({ '.__tw-config-loaded': { outline: '3px solid lime' } })
  ],
};
