import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 600, fontSize: '1.2rem' }}>
      🚀 Nostromo UI
    </span>
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
        return <span className="nx-text-xs nx-font-semibold nx-text-gray-500 dark:nx-text-gray-400">{title}</span>
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