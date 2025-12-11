import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

/** @type {import('next').NextConfig} */
export default withNextra({
  images: { unoptimized: true },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  output: 'export',
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/nostromo-ui' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/nostromo-ui' : '',
  // Explicitly exclude /api from being treated as an API route
  async rewrites() {
    return []
  },
})