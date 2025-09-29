import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Nostromo UI</span>,
  project: {
    link: 'https://github.com/jarl.l/nostromo-ui',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/jarl.l/nostromo-ui',
  footer: {
    text: 'MIT © 2024 Nostromo UI.',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  toc: {
    backToTop: true,
  },
}

export default config