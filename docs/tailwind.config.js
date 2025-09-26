// Minimal v4 config – tilpas globs til dine mapper
export default {
  content: [
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/nextra*/**/*.{js,jsx,ts,tsx}', // så Nextra-komponenter kan styles
  ],
  // theme: { ... }  // valgfrit
  // plugins: []     // v4 plugins går her (ikke i postcss)
}