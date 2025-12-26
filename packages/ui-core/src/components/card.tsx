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
          "border-border shadow-sm bg-card text-card-foreground",
          "hover:shadow-md hover:border-border"
        ],
        // Enhanced elevated with better shadow
        elevated: [
          "border-border shadow-lg bg-card text-card-foreground",
          "hover:shadow-xl hover:border-border"
        ],
        // Enhanced outlined with better focus
        outlined: [
          "border-2 border-border shadow-none bg-card text-card-foreground",
          "hover:border-primary hover:shadow-sm",
          "focus-within:border-primary focus-within:shadow-sm"
        ],
        // Enhanced filled with better contrast
        filled: [
          "border-border bg-muted text-card-foreground",
          "hover:bg-muted/80 hover:shadow-sm"
        ],
        // Enhanced interactive with better feedback
        interactive: [
          "border-border shadow-sm cursor-pointer bg-card text-card-foreground",
          "hover:shadow-md hover:border-primary hover:scale-[1.02]",
          "active:scale-[0.98] active:shadow-sm"
        ],
        // Subtle variant for less prominent cards
        subtle: [
          "border-border bg-muted/50 text-muted-foreground",
          "hover:bg-muted hover:border-border"
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

const CardComponent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, className }))}
      {...props}
    />
  )
);
CardComponent.displayName = "Card";

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

export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };

// Memoize Card for performance optimization (after all subcomponents are defined)
const Card = React.memo(CardComponent) as typeof CardComponent & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
};

// Attach subcomponents to Card for compound component pattern
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export { Card };
