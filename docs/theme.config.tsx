import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Nostromo UI</span>,
  project: {
    link: 'https://github.com/JarlLyng/nostromo-ui',
  },
  chat: {
    link: 'https://github.com/JarlLyng/nostromo-ui/discussions',
  },
  docsRepositoryBase: 'https://github.com/JarlLyng/nostromo-ui',
  footer: {
    text: 'MIT © 2025 Nostromo UI.',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  toc: {
    backToTop: true,
  },
}

export default config