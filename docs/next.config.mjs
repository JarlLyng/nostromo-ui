import nextra from 'nextra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// No `theme` or `themeConfig`: Nextra 4 takes those as props on the Layout
// component in app/layout.tsx instead, and theme.config.tsx is gone.
//
// The theme used to be referenced under an alias here, because nextra 2's loader
// auto-injected an unlayered `import 'nextra-theme-docs/style.css'` that broke
// Tailwind v4's cascade. Nextra 4 declares its own cascade layers, so the alias
// and the layered re-import it existed for are both gone.
const withNextra = nextra({})

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
  output: 'export',
  trailingSlash: true,
  assetPrefix: basePath,
  basePath: basePath,
  // No react/react-dom resolve.alias. It used to pin one copy of React for the
  // workspace-linked library, but aliasing react to a directory path bypasses
  // its `react-server` export condition - so the server build got the client
  // React and prerendering died on `Cannot read properties of null (reading
  // 'useMemoCache')`. The pnpm.overrides in the root package.json pin a single
  // React version across the workspace, which is what actually prevents the
  // duplicate the alias was reaching for.
})
