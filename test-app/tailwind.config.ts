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
  // Comprehensive safelist to ensure all component classes are generated
  safelist: [
    // Button base classes
    'inline-flex', 'items-center', 'justify-center', 'whitespace-nowrap',
    'rounded-md', 'text-sm', 'font-medium', 'transition-all', 'duration-200',
    'focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-ring',
    'focus-visible:ring-offset-2', 'disabled:pointer-events-none', 'disabled:opacity-50',
    // Button variants
    {
      pattern: /^(bg|text|border)-(primary|secondary|destructive|muted|success|warning|error|info)(\/\d+)?$/,
      variants: ['hover', 'active', 'focus-visible'],
    },
    {
      pattern: /^(bg|text)-(primary|secondary|destructive|muted|success|warning|error|info)-foreground$/,
    },
    {
      pattern: /^border-(border|primary|destructive|success|warning|error|info)(\/\d+)?$/,
      variants: ['hover', 'focus-visible'],
    },
    // Button sizes
    'h-8', 'h-10', 'h-11', 'h-12',
    'px-2', 'px-2.5', 'px-3', 'px-4', 'px-6', 'px-8',
    'py-0.5', 'py-1', 'py-2',
    'text-xs', 'text-sm', 'text-base', 'text-lg',
    'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-full',
    // Badge classes
    'shadow-badge', 'hover:shadow-badge-hover',
    // Input classes
    'flex', 'w-full', 'bg-background', 'ring-offset-background',
    'file:border-0', 'file:bg-transparent', 'file:text-sm', 'file:font-medium',
    'placeholder:text-muted-foreground', 'disabled:cursor-not-allowed',
    'focus-visible:ring-ring/20', 'focus-visible:border-ring',
    'focus-visible:shadow-md', 'hover:border-border',
    // Card classes
    'bg-card', 'text-card-foreground', 'hover:shadow-md', 'hover:shadow-xl',
    'hover:scale-[1.02]', 'focus-within:border-primary', 'focus-within:shadow-sm',
    'cursor-pointer',
    // Common utilities
    'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl',
    'active:scale-[0.98]', 'active:shadow-sm',
    'space-y-2', 'leading-none',
  ],
} satisfies Config;
