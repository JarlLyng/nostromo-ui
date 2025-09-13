import { tv, type VariantProps } from 'tailwind-variants';

/**
 * Utility function to merge Tailwind CSS classes for Vue
 * Uses tailwind-variants for variant management
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Button variants using tailwind-variants
 */
export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      primary: 'bg-brand-500 text-neutral-50 hover:bg-brand-600 focus-visible:ring-brand-500',
      secondary: 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 focus-visible:ring-neutral-500',
      ghost: 'hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-neutral-500',
      destructive: 'bg-error-500 text-neutral-50 hover:bg-error-600 focus-visible:ring-error-500',
      outline: 'border border-neutral-300 bg-transparent hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-neutral-500',
      link: 'text-brand-500 underline-offset-4 hover:underline focus-visible:ring-brand-500',
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-8 text-base',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
