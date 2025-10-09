import type { Preview } from '@storybook/react';

// Import CSS med PostCSS
import './preview.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
};

export default preview;
