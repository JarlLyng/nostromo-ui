// Nostromo UI Advanced Documentation - Live Preview
// Initializes live component rendering on component pages

import('./live-components.js').then(() => {
  // Initialize the live component renderer when the script loads
  if (window.LiveComponentRenderer) {
    new window.LiveComponentRenderer();
  }
}).catch(error => {
  console.error('Failed to load live-components.js:', error);
});

// Alternative initialization if import fails
document.addEventListener('DOMContentLoaded', () => {
  // Check if live-components.js is available
  const script = document.createElement('script');
  script.src = '/assets/js/live-components.js';
  script.onload = () => {
    if (window.LiveComponentRenderer) {
      new window.LiveComponentRenderer();
    }
  };
  script.onerror = () => {
    console.warn('Live preview functionality is not available');
  };
  document.head.appendChild(script);
});
