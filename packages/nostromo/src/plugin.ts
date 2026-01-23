/**
 * Nostromo UI Tailwind CSS Plugin
 * 
 * This plugin:
 * - Registers the Tailwind preset with all design tokens
 * - CSS variables and base styles should be imported separately in user's CSS
 * 
 * Usage in CSS:
 * @import "tailwindcss";
 * @plugin "nostromo";
 * @import "@jarllyng/nostromo/base.css";
 * @import "@jarllyng/nostromo/themes/nostromo.css";
 * 
 * Or use the plugin.css file which includes everything:
 * @import "tailwindcss";
 * @plugin "nostromo";
 * @import "@jarllyng/nostromo/plugin.css";
 */

import type { Config } from 'tailwindcss';
import nostromoPreset from './preset';

// Tailwind CSS v4 plugin - returns a config object
const plugin = (): Partial<Config> => {
  return {
    ...nostromoPreset,
  };
};

// Export as default for Tailwind v4 @plugin syntax
export default plugin;

// Also export named export for compatibility
export { plugin as nostromoPlugin };
