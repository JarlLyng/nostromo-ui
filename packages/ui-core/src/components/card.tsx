import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const cardVariants = cva(
  [
    'rounded-lg border bg-white text-neutral-950 shadow-sm',
    'transition-colors duration-200',
  ],
  {
    variants: {
      variant: {
        default: 'border-neutral-200',
        outlined: 'border-neutral-300 border-2',
        elevated: 'border-neutral-200 shadow-lg',
        ghost: 'border-transparent shadow-none',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5',
  {
    variants: {
      size: {
        sm: 'p-3 pb-2',
        md: 'p-4 pb-3',
        lg: 'p-6 pb-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const cardTitleVariants = cva(
  'text-lg font-semibold leading-none tracking-tight',
  {
    variants: {
      size: {
        sm: 'text-base',
        md: 'text-lg',
        lg: 'text-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const cardDescriptionVariants = cva(
  'text-sm text-neutral-500',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const cardContentVariants = cva(
  'text-neutral-950',
  {
    variants: {
      size: {
        sm: 'p-3 pt-2',
        md: 'p-4 pt-3',
        lg: 'p-6 pt-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const cardFooterVariants = cva(
  'flex items-center',
  {
    variants: {
      size: {
        sm: 'p-3 pt-2',
        md: 'p-4 pt-3',
        lg: 'p-6 pt-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface CardProps extends VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface CardHeaderProps extends VariantProps<typeof cardHeaderVariants> {
  children: React.ReactNode;
  className?: string;
}

export interface CardTitleProps extends VariantProps<typeof cardTitleVariants> {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface CardDescriptionProps extends VariantProps<typeof cardDescriptionVariants> {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface CardContentProps extends VariantProps<typeof cardContentVariants> {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps extends VariantProps<typeof cardFooterVariants> {
  children: React.ReactNode;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardHeaderVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : 'h3';
    return (
      <Comp
        ref={asChild ? undefined : ref}
        className={cn(cardTitleVariants({ size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, size, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : 'p';
    return (
      <Comp
        ref={asChild ? undefined : ref}
        className={cn(cardDescriptionVariants({ size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardContentVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardFooterVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardFooter.displayName = 'CardFooter';
