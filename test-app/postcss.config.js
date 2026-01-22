export default {
  plugins: {
    '@tailwindcss/postcss': {
      // Explicitly configure Tailwind to use our config
      config: './tailwind.config.ts',
    },
  },
};
