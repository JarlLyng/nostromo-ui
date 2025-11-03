import type { Preview } from '@storybook/react';

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
  // Set theme on HTML element
  decorators: [
    (Story) => {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', 'nostromo');
        document.documentElement.setAttribute('data-color-scheme', 'light');
      }
      return <Story />;
    },
  ],
};

export default preview;
