import type { Config } from 'tailwindcss';

const nostromoPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          50: 'hsl(var(--color-brand-50) / <alpha-value>)',
          100: 'hsl(var(--color-brand-100) / <alpha-value>)',
          200: 'hsl(var(--color-brand-200) / <alpha-value>)',
          300: 'hsl(var(--color-brand-300) / <alpha-value>)',
          400: 'hsl(var(--color-brand-400) / <alpha-value>)',
          500: 'hsl(var(--color-brand-500) / <alpha-value>)',
          600: 'hsl(var(--color-brand-600) / <alpha-value>)',
          700: 'hsl(var(--color-brand-700) / <alpha-value>)',
          800: 'hsl(var(--color-brand-800) / <alpha-value>)',
          900: 'hsl(var(--color-brand-900) / <alpha-value>)',
          950: 'hsl(var(--color-brand-950) / <alpha-value>)',
        },
        // Neutral colors
        neutral: {
          50: 'hsl(var(--color-neutral-50) / <alpha-value>)',
          100: 'hsl(var(--color-neutral-100) / <alpha-value>)',
          200: 'hsl(var(--color-neutral-200) / <alpha-value>)',
          300: 'hsl(var(--color-neutral-300) / <alpha-value>)',
          400: 'hsl(var(--color-neutral-400) / <alpha-value>)',
          500: 'hsl(var(--color-neutral-500) / <alpha-value>)',
          600: 'hsl(var(--color-neutral-600) / <alpha-value>)',
          700: 'hsl(var(--color-neutral-700) / <alpha-value>)',
          800: 'hsl(var(--color-neutral-800) / <alpha-value>)',
          900: 'hsl(var(--color-neutral-900) / <alpha-value>)',
          950: 'hsl(var(--color-neutral-950) / <alpha-value>)',
        },
        // Semantic colors
        success: {
          DEFAULT: 'hsl(var(--color-success-500))',
          foreground: 'hsl(var(--color-success-foreground))',
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
          DEFAULT: 'hsl(var(--color-warning-500))',
          foreground: 'hsl(var(--color-warning-foreground))',
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
          DEFAULT: 'hsl(var(--color-error-500))',
          foreground: 'hsl(var(--color-error-foreground))',
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
          DEFAULT: 'hsl(var(--color-info-500))',
          foreground: 'hsl(var(--color-info-foreground))',
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
        // Semantic colors for component theming
        background: 'hsl(var(--color-background))',
        foreground: 'hsl(var(--color-foreground))',
        muted: {
          DEFAULT: 'hsl(var(--color-muted))',
          foreground: 'hsl(var(--color-muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--color-popover))',
          foreground: 'hsl(var(--color-popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--color-card))',
          foreground: 'hsl(var(--color-card-foreground))',
        },
        border: 'hsl(var(--color-border))',
        input: 'hsl(var(--color-input))',
        primary: {
          DEFAULT: 'hsl(var(--color-primary))',
          foreground: 'hsl(var(--color-primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary))',
          foreground: 'hsl(var(--color-secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--color-accent))',
          foreground: 'hsl(var(--color-accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--color-destructive))',
          foreground: 'hsl(var(--color-destructive-foreground))',
        },
        ring: 'hsl(var(--color-ring))',
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
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
        button: 'var(--shadow-button)',
        'button-hover': 'var(--shadow-button-hover)',
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        input: 'var(--shadow-input)',
        'input-focus': 'var(--shadow-input-focus)',
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
      // Transitions
      transitionDuration: {
        fast: 'var(--transition-fast)',
        normal: 'var(--transition-normal)',
        slow: 'var(--transition-slow)',
      },
      transitionTimingFunction: {
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  // Add custom utilities
  plugins: [
    function({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
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
        '.transition-button': {
          transition: 'var(--transition-button)',
        },
        '.transition-input': {
          transition: 'var(--transition-input)',
        },
        '.transition-card': {
          transition: 'var(--transition-card)',
        },
        '.transition-modal': {
          transition: 'var(--transition-modal)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default nostromoPreset;
