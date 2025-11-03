import type { Preview } from '@storybook/react';
import React from 'react';

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
  // Set theme on HTML element - ensure it's set before render
  decorators: [
    (Story) => {
      React.useEffect(() => {
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', 'nostromo');
          document.documentElement.setAttribute('data-color-scheme', 'light');
          // Force CSS variable update
          const style = getComputedStyle(document.documentElement);
          const brand500 = style.getPropertyValue('--color-brand-500');
          console.log('Theme applied, --color-brand-500:', brand500);
        }
      }, []);
      return React.createElement(Story);
    },
  ],
};

export default preview;
