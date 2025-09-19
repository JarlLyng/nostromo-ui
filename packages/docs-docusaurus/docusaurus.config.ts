import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Nostromo UI',
  tagline: 'Space-grade UI Components for React',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://jarl.l.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/nostromo-ui/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'jarl.l', // Usually your GitHub org/user name.
  projectName: 'nostromo-ui', // Usually your repo name.

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/jarl.l/nostromo-ui/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/jarl.l/nostromo-ui/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        // TypeDoc options
        id: 'api',
        entryPoints: ['../ui-core/src/index.ts'],
        tsconfig: '../ui-core/tsconfig.json',
        out: 'api',
        readme: 'none',
        plugin: ['typedoc-plugin-markdown'],
        watch: process.env.NODE_ENV === 'development',
        // Remove invalid options that were causing errors
        excludePrivate: true,
        excludeProtected: true,
        excludeExternals: true,
        sort: ['source-order'],
        categorizeByGroup: true,
        defaultCategory: 'Other',
        categoryOrder: [
          'Components',
          'Utilities',
          'Types',
          'Other'
        ],
        searchInComments: true,
        cleanOutputDir: true
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Nostromo UI',
      logo: {
        alt: 'Nostromo UI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Components',
        },
        {
          to: '/docs/getting-started',
          label: 'Getting Started',
          position: 'left',
        },
        {
          to: '/docs/theming',
          label: 'Theming',
          position: 'left',
        },
        {
          to: '/api',
          label: 'API Reference',
          position: 'left',
        },
        {
          to: '/storybook',
          label: 'Storybook',
          position: 'right',
        },
        {
          href: 'https://github.com/jarl.l/nostromo-ui',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'Components',
              to: '/docs/components',
            },
            {
              label: 'Theming',
              to: '/docs/theming',
            },
            {
              label: 'API Reference',
              to: '/api',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Storybook',
              to: '/storybook',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/jarl.l/nostromo-ui',
            },
            {
              label: 'NPM',
              href: 'https://www.npmjs.com/package/@nostromo/ui-core',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Issues',
              href: 'https://github.com/jarl.l/nostromo-ui/issues',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/jarl.l/nostromo-ui/discussions',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Nostromo UI Team. Built with ❤️ and inspired by the USCSS Nostromo.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
