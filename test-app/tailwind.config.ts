import type { Config } from 'tailwindcss';
import nostromoPreset from '@jarllyng/ui-tw/tailwind.preset.js';
import { join } from 'path';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Scan source files from packages (workspace dependencies)
    join(__dirname, "../packages/ui-core/src/**/*.{js,jsx,ts,tsx}"),
    join(__dirname, "../packages/ui-marketing/src/**/*.{js,jsx,ts,tsx}"),
    // Also scan dist files as fallback
    join(__dirname, "./node_modules/@jarllyng/ui-core/dist/components/**/*.{js,jsx,ts,tsx}"),
    join(__dirname, "./node_modules/@jarllyng/ui-marketing/dist/components/**/*.{js,jsx,ts,tsx}"),
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
    // Size variants
    'h-8', 'h-10', 'h-11', 'px-3', 'px-4', 'px-6',
    'rounded-md', 'rounded-sm', 'rounded-lg',
  ],
} satisfies Config;
