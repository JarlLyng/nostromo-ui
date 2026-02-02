import nextra from 'nextra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const withNextra = nextra({
  theme: 'nextra-theme-docs',
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
    };
    return config;
  },
})
