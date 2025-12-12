import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-sm">
        N
      </div>
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