import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const cardVariants = cva(
  // Base styles with improved spacing and transitions
  "rounded-lg border transition-all duration-200",
  {
    variants: {
      variant: {
        // Enhanced default with better depth
        default: [
          "border-neutral-200 shadow-sm bg-white text-neutral-900",
          "hover:shadow-md hover:border-neutral-300",
          "dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100"
        ],
        // Enhanced elevated with better shadow
        elevated: [
          "border-neutral-200 shadow-lg bg-white text-neutral-900",
          "hover:shadow-xl hover:border-neutral-300",
          "dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100"
        ],
        // Enhanced outlined with better focus
        outlined: [
          "border-2 border-neutral-300 shadow-none bg-white text-neutral-900",
          "hover:border-brand-500 hover:shadow-sm",
          "focus-within:border-brand-500 focus-within:shadow-sm",
          "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100"
        ],
        // Enhanced filled with better contrast
        filled: [
          "border-neutral-100 bg-neutral-50 text-neutral-900",
          "hover:bg-neutral-100 hover:shadow-sm",
          "dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100"
        ],
        // Enhanced interactive with better feedback
        interactive: [
          "border-neutral-200 shadow-sm cursor-pointer bg-white text-neutral-900",
          "hover:shadow-md hover:border-brand-500 hover:scale-[1.02]",
          "active:scale-[0.98] active:shadow-sm",
          "dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100"
        ],
        // Subtle variant for less prominent cards
        subtle: [
          "border-neutral-100 bg-neutral-50/50 text-neutral-700",
          "hover:bg-neutral-50 hover:border-neutral-200",
          "dark:bg-neutral-800/50 dark:border-neutral-700 dark:text-neutral-300"
        ]
      },
      size: {
        // Improved spacing for consistency
        sm: "p-3",
        default: "p-4 sm:p-6", 
        lg: "p-6 sm:p-8",
        xl: "p-8 sm:p-10",
        none: "p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

// Enhanced subcomponents with improved spacing
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-4 sm:p-6 pb-3", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl sm:text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("p-4 sm:p-6 pt-0", className)} 
    {...props} 
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 sm:p-6 pt-3", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
