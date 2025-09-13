import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import './styles.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: {
        ...themes.dark,
        base: 'dark',
        colorPrimary: '#8b5cf6', // Brand purple
        colorSecondary: '#06b6d4', // Cyan
        appBg: '#0a0a0a',
        appContentBg: '#0a0a0a',
        appBorderColor: '#262626',
        appBorderRadius: 8,
        textColor: '#fafafa',
        textInverseColor: '#0a0a0a',
        textMutedColor: '#a3a3a3',
        barTextColor: '#fafafa',
        barSelectedColor: '#8b5cf6',
        barBg: '#171717',
        inputBg: '#171717',
        inputBorder: '#262626',
        inputTextColor: '#fafafa',
        inputBorderRadius: 6,
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
};

export default preview;
