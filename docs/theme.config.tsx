import { DocsThemeConfig } from 'nextra-theme-docs'

const basePath = process.env.NODE_ENV === 'production' ? '/nostromo-ui' : ''

const config: DocsThemeConfig = {
  logo: (
    <div className="flex items-center gap-2">
      <img
        src={`${basePath}/logo-black.svg`}
        alt="Nostromo UI"
        width={32}
        height={32}
        className="dark:hidden"
        style={{ display: 'inline-block' }}
      />
      <img
        src={`${basePath}/logo-white.svg`}
        alt="Nostromo UI"
        width={32}
        height={32}
        className="hidden dark:block"
        style={{ display: 'inline-block' }}
      />
      <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>
        Nostromo UI
      </span>
    </div>
  ),
  project: {
    link: 'https://github.com/JarlLyng/nostromo-ui',
  },
  chat: {
    link: 'https://github.com/JarlLyng/nostromo-ui/discussions',
  },
  docsRepositoryBase: 'https://github.com/JarlLyng/nostromo-ui',
  footer: {
    text: 'MIT © 2025 Nostromo UI. Built with Nextra.',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    titleComponent: ({ title, type }) => {
      if (type === 'separator') {
        return <span className="nx-text-xs nx-font-semibold nx-text-muted-foreground uppercase tracking-wider">{title}</span>
      }
      return <>{title}</>
    },
  },
  // Add scroll progress bar via custom script in _document.tsx
  toc: {
    backToTop: true,
  },
  search: {
    placeholder: 'Search documentation...',
  },
  primaryHue: 262, // Purple to match Nostromo theme
  primarySaturation: 84,
  useNextSeoProps: () => ({
    titleTemplate: '%s – Nostromo UI',
  }),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Nostromo UI" />
      <meta property="og:description" content="A modern UI library built with React, TypeScript and Tailwind CSS" />
    </>
  ),
}

export default config