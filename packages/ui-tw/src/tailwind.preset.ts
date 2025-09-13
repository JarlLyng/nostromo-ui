import type { Config } from 'tailwindcss';

export const nostromoPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          50: 'hsl(var(--color-brand-50))',
          100: 'hsl(var(--color-brand-100))',
          200: 'hsl(var(--color-brand-200))',
          300: 'hsl(var(--color-brand-300))',
          400: 'hsl(var(--color-brand-400))',
          500: 'hsl(var(--color-brand-500))',
          600: 'hsl(var(--color-brand-600))',
          700: 'hsl(var(--color-brand-700))',
          800: 'hsl(var(--color-brand-800))',
          900: 'hsl(var(--color-brand-900))',
          950: 'hsl(var(--color-brand-950))',
        },
        // Neutral colors
        neutral: {
          50: 'hsl(var(--color-neutral-50))',
          100: 'hsl(var(--color-neutral-100))',
          200: 'hsl(var(--color-neutral-200))',
          300: 'hsl(var(--color-neutral-300))',
          400: 'hsl(var(--color-neutral-400))',
          500: 'hsl(var(--color-neutral-500))',
          600: 'hsl(var(--color-neutral-600))',
          700: 'hsl(var(--color-neutral-700))',
          800: 'hsl(var(--color-neutral-800))',
          900: 'hsl(var(--color-neutral-900))',
          950: 'hsl(var(--color-neutral-950))',
        },
        // Semantic colors
        success: {
          50: 'hsl(var(--color-success-50))',
          100: 'hsl(var(--color-success-100))',
          200: 'hsl(var(--color-success-200))',
          300: 'hsl(var(--color-success-300))',
          400: 'hsl(var(--color-success-400))',
          500: 'hsl(var(--color-success-500))',
          600: 'hsl(var(--color-success-600))',
          700: 'hsl(var(--color-success-700))',
          800: 'hsl(var(--color-success-800))',
          900: 'hsl(var(--color-success-900))',
          950: 'hsl(var(--color-success-950))',
        },
        warning: {
          50: 'hsl(var(--color-warning-50))',
          100: 'hsl(var(--color-warning-100))',
          200: 'hsl(var(--color-warning-200))',
          300: 'hsl(var(--color-warning-300))',
          400: 'hsl(var(--color-warning-400))',
          500: 'hsl(var(--color-warning-500))',
          600: 'hsl(var(--color-warning-600))',
          700: 'hsl(var(--color-warning-700))',
          800: 'hsl(var(--color-warning-800))',
          900: 'hsl(var(--color-warning-900))',
          950: 'hsl(var(--color-warning-950))',
        },
        error: {
          50: 'hsl(var(--color-error-50))',
          100: 'hsl(var(--color-error-100))',
          200: 'hsl(var(--color-error-200))',
          300: 'hsl(var(--color-error-300))',
          400: 'hsl(var(--color-error-400))',
          500: 'hsl(var(--color-error-500))',
          600: 'hsl(var(--color-error-600))',
          700: 'hsl(var(--color-error-700))',
          800: 'hsl(var(--color-error-800))',
          900: 'hsl(var(--color-error-900))',
          950: 'hsl(var(--color-error-950))',
        },
        info: {
          50: 'hsl(var(--color-info-50))',
          100: 'hsl(var(--color-info-100))',
          200: 'hsl(var(--color-info-200))',
          300: 'hsl(var(--color-info-300))',
          400: 'hsl(var(--color-info-400))',
          500: 'hsl(var(--color-info-500))',
          600: 'hsl(var(--color-info-600))',
          700: 'hsl(var(--color-info-700))',
          800: 'hsl(var(--color-info-800))',
          900: 'hsl(var(--color-info-900))',
          950: 'hsl(var(--color-info-950))',
        },
      },
      // Border radius
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      // Font families
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      // Font sizes
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
      },
      // Line heights
      lineHeight: {
        tight: 'var(--leading-tight)',
        normal: 'var(--leading-normal)',
        relaxed: 'var(--leading-relaxed)',
      },
      // Font weights
      fontWeight: {
        normal: 'var(--font-normal)',
        medium: 'var(--font-medium)',
        semibold: 'var(--font-semibold)',
        bold: 'var(--font-bold)',
      },
      // Box shadows
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      // Spacing
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
      },
    },
  },
  // Add custom utilities
  plugins: [
    function({ addUtilities }: any) {
      const newUtilities = {
        '.text-brand': {
          color: 'hsl(var(--color-brand-500))',
        },
        '.bg-brand': {
          backgroundColor: 'hsl(var(--color-brand-500))',
        },
        '.border-brand': {
          borderColor: 'hsl(var(--color-brand-500))',
        },
        '.rounded-theme': {
          borderRadius: 'var(--radius-md)',
        },
        '.font-heading': {
          fontFamily: 'var(--font-heading)',
        },
        '.font-body': {
          fontFamily: 'var(--font-body)',
        },
        '.font-mono': {
          fontFamily: 'var(--font-mono)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
