import type { Config } from 'tailwindcss';
import nostromoPreset from '@jarllyng/ui-tw/tailwind.preset.js';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@jarllyng/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [nostromoPreset],
  // Safelist to ensure semantic color classes are generated
  safelist: [
    // Button variants
    'bg-primary', 'text-primary-foreground', 'bg-primary/90',
    'bg-secondary', 'text-secondary-foreground', 'bg-secondary/80',
    'bg-destructive', 'text-destructive-foreground', 'bg-destructive/90',
    'bg-muted', 'text-muted-foreground', 'bg-muted/80',
    'border-border', 'border-primary', 'text-foreground',
    // Badge variants
    'bg-success', 'text-success-foreground', 'bg-success-600',
    'bg-warning', 'text-warning-foreground', 'bg-warning-600',
    'bg-error', 'text-error-foreground', 'bg-error-600',
    'bg-info', 'text-info-foreground', 'bg-info-600',
    // Common utilities
    'hover:bg-primary/90', 'hover:bg-secondary/80', 'hover:bg-destructive/90',
    'hover:bg-muted', 'hover:border-primary', 'hover:text-primary',
    'focus-visible:ring-ring', 'focus-visible:ring-offset-2',
  ],
} satisfies Config;
