import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

// basePath can be set via NEXT_PUBLIC_BASE_PATH environment variable
// For custom domain (nostromo-ui.dev): NEXT_PUBLIC_BASE_PATH=""
// For GitHub Pages: NEXT_PUBLIC_BASE_PATH="/nostromo-ui"
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/nostromo-ui' : '')

/** @type {import('next').NextConfig} */
export default withNextra({
  images: { unoptimized: true },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  output: 'export',
  trailingSlash: true,
  assetPrefix: basePath,
  basePath: basePath,
})