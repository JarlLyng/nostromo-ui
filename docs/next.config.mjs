import nextra from 'nextra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


// The theme is referenced under an alias (mapped in the webpack config below)
// rather than by its real name on purpose: nextra's loader auto-injects
// `import 'nextra-theme-docs/style.css'` for its two official theme names, and
// that import is unlayered, which breaks Tailwind v4's cascade. Under an alias
// the injection is skipped and _app.tsx imports the CSS wrapped in a layer
// instead. See styles/nextra-layered.css.
const withNextra = nextra({
  theme: 'nextra-theme-docs-layered',
  themeConfig: './theme.config.tsx',
})

// basePath can be set via NEXT_PUBLIC_BASE_PATH environment variable
// IMPORTANT: allow empty string as a valid value (custom domain)
// For custom domain (nostromo-ui.dev): NEXT_PUBLIC_BASE_PATH=""
// For GitHub Pages: NEXT_PUBLIC_BASE_PATH="/nostromo-ui"
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : process.env.NODE_ENV === 'production'
      ? '/nostromo-ui'
      : ''

/** @type {import('next').NextConfig} */
export default withNextra({
  outputFileTracingRoot: path.join(__dirname, '../'),
  transpilePackages: ['@jarllyng/nostromo'],
  images: { unoptimized: true },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  output: 'export',
  trailingSlash: true,
  assetPrefix: basePath,
  basePath: basePath,
  // Disable Turbopack temporarily - Nextra 2.x uses webpack config
  // TODO: Remove this when upgrading to Nextra 4.x (issue #89, #91)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      // Resolves the aliased theme name below to the real theme component.
      'nextra-theme-docs-layered': path.resolve(
        __dirname,
        'node_modules/nextra-theme-docs/dist/index.js'
      ),
    };
    return config;
  },
})
