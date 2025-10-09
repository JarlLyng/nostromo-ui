// .storybook/postcss.config.js
console.log('🔧 PostCSS config loading...');

export default {
  plugins: {
    'postcss-import': {},
    '@tailwindcss/postcss': {
      config: './tailwind-test.config.js'
    },
    autoprefixer: {},
  },
};