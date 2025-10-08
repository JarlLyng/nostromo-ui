import type { Preview } from '@storybook/react-vite';
import React from 'react';
import './preview.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Suppress Storybook manager errors
    storyStoreV7: true,
    features: {
      storyStoreV7: true,
    },
    html: {
      root: '#root',
      removeEmptyComments: true,
    },
    docs: {
      source: {
        excludeDecorators: true,
      },
      theme: {
        base: 'dark',
        colorPrimary: '#8b5cf6', // Brand purple
        colorSecondary: '#06b6d4', // Cyan
        appBg: '#0a0a0a',
        appContentBg: '#0a0a0a',
        appPreviewBg: '#0a0a0a',
        appBorderColor: '#262626',
        appBorderRadius: 8,
        textColor: '#fafafa',
        textInverseColor: '#0a0a0a',
        textMutedColor: '#a3a3a3',
        barTextColor: '#fafafa',
        barSelectedColor: '#8b5cf6',
        barBg: '#171717',
        barHoverColor: '#8b5cf6',
        inputBg: '#171717',
        inputBorder: '#262626',
        inputTextColor: '#fafafa',
        inputBorderRadius: 6,
        buttonBg: '#171717',
        buttonBorder: '#262626',
        booleanBg: '#171717',
        booleanSelectedBg: '#8b5cf6',
        fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontCode: '"Fira Code", "Monaco", "Consolas", "Ubuntu Mono", monospace',
        brandTitle: 'Nostromo UI',
        brandUrl: 'https://github.com/nostromo-ui/nostromo-ui',
        brandImage: undefined,
        brandTarget: '_self',
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0a0a0a',
        },
        {
          name: 'neutral',
          value: '#f5f5f5',
        },
      ],
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
  decorators: [
    (Story) => {
      // Set theme attribute on document
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', 'nostromo');
      }
      return React.createElement(Story);
    },
  ],
};

export default preview;
