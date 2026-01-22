import type { Preview } from '@storybook/react';
import React from 'react';

// Import theme CSS FIRST to ensure CSS variables are available
// This must be imported before preview.css to ensure variables are defined
import '@jarllyng/ui-tw/themes/nostromo.css';

// Import CSS - this triggers Tailwind processing
import './preview.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    // Ensure theme is applied
    backgrounds: {
      default: 'light',
    },
  },
  // Theme is set synchronously in preview-head.html, but ensure it's still set
  // in case preview-head.html doesn't execute (defensive programming)
  decorators: [
    (Story) => {
      // Set theme synchronously if not already set (fallback)
      if (typeof document !== 'undefined') {
        if (!document.documentElement.hasAttribute('data-theme')) {
          document.documentElement.setAttribute('data-theme', 'nostromo');
        }
        if (!document.documentElement.hasAttribute('data-color-scheme')) {
          document.documentElement.setAttribute('data-color-scheme', 'light');
        }
      }
      return React.createElement(Story);
    },
  ],
};

export default preview;
