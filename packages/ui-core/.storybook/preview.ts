import type { Preview } from '@storybook/react-vite';
import { configure } from '@testing-library/react';
import React from 'react';
import '@nostromo/ui-tw/base.css';
import '@nostromo/ui-tw/themes/nostromo.css';

// Configure React Testing Library to suppress act warnings
configure({
  asyncUtilTimeout: 1000,
  // Suppress act warnings in Storybook
  getElementError: (message, container) => {
    const error = new Error(message || 'Element not found');
    error.name = 'TestingLibraryElementError';
    return error;
  },
});

// Suppress React 18 act warnings globally
if (typeof window !== 'undefined') {
  // Override React's act warning
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('The current testing environment is not configured to support act') ||
       args[0].includes('Warning: The current testing environment is not configured to support act') ||
       args[0].includes('isConcurrentActEnvironment') ||
       args[0].includes('warnIfUpdatesNotWrappedWithActDEV') ||
       args[0].includes('scheduleUpdateOnFiber') ||
       args[0].includes('dispatchSetStateInternal') ||
       args[0].includes('dispatchSetState'))
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };

  // Also suppress React's internal act warnings
  const originalError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('The current testing environment is not configured to support act') ||
       args[0].includes('Warning: The current testing environment is not configured to support act') ||
       args[0].includes('isConcurrentActEnvironment') ||
       args[0].includes('warnIfUpdatesNotWrappedWithActDEV') ||
       args[0].includes('scheduleUpdateOnFiber') ||
       args[0].includes('dispatchSetStateInternal') ||
       args[0].includes('dispatchSetState'))
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

// Suppress React 18 act warnings and Storybook manager errors
if (typeof window !== 'undefined') {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: The current testing environment is not configured to support act') ||
       args[0].includes('The current testing environment is not configured to support act') ||
       args[0].includes('manager received storyRenderPhaseChanged but was unable to determine the source of the event') ||
       args[0].includes('manager received storyRendered but was unable to determine the source of the event') ||
       args[0].includes('manager received storybook/docs/snippet-rendered but was unable to determine the source of the event') ||
       args[0].includes('isConcurrentActEnvironment') ||
       args[0].includes('warnIfUpdatesNotWrappedWithActDEV') ||
       args[0].includes('scheduleUpdateOnFiber') ||
       args[0].includes('dispatchSetStateInternal') ||
       args[0].includes('dispatchSetState'))
    ) {
      return;
    }
    originalConsoleError.apply(console, args);
  };

  // Suppress unhandled promise rejections from Storybook
  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason &&
      typeof event.reason === 'string' &&
      (event.reason.includes('storyRenderPhaseChanged') || 
       event.reason.includes('storyRendered') ||
       event.reason.includes('storybook/docs/snippet-rendered'))
    ) {
      event.preventDefault();
    }
  });

  // Global error handler for Storybook manager errors
  window.addEventListener('error', (event) => {
    if (
      event.message &&
      event.message.includes('manager received') &&
      event.message.includes('but was unable to determine the source of the event')
    ) {
      event.preventDefault();
    }
  });
}

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
