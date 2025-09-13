import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.dark,
    base: 'dark',
    colorPrimary: '#8b5cf6',
    colorSecondary: '#06b6d4',
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
    brandTitle: 'Nostromo UI - Vue',
    brandUrl: 'https://github.com/nostromo-ui/nostromo-ui',
    brandImage: undefined,
    brandTarget: '_self',
  },
  toolbar: {
    'storybook/theme': { showName: true },
    'storybook/background': { showName: true },
    'storybook/viewport': { showName: true },
    'storybook/measure': { showName: true },
    'storybook/outline': { showName: true },
  },
});
