import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-badge hover:shadow-badge-hover",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90 shadow-badge hover:shadow-badge-hover",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-badge hover:shadow-badge-hover",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-badge hover:shadow-badge-hover",
        outline:
          "border-2 border-border text-foreground hover:border-primary hover:text-primary hover:shadow-badge",
        success:
          "border-transparent bg-success text-success-foreground hover:bg-success-600 shadow-badge hover:shadow-badge-hover",
        warning:
          "border-transparent bg-warning text-warning-foreground hover:bg-warning-600 shadow-badge hover:shadow-badge-hover",
        info: "border-transparent bg-info text-info-foreground hover:bg-info-600 shadow-badge hover:shadow-badge-hover",
        error:
          "border-transparent bg-error text-error-foreground hover:bg-error-600 shadow-badge hover:shadow-badge-hover",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Props for the Badge component
 */
export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * The visual variant of the badge
   * @default "default"
   */
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "info";
  /**
   * The size of the badge
   * @default "default"
   */
  size?: "sm" | "default" | "lg";
}

/**
 * Badge component for displaying small status indicators or labels
 *
 * @example
 * ```tsx
 * <Badge variant="default">New</Badge>
 * <Badge variant="secondary">Beta</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="outline">Draft</Badge>
 * <Badge variant="success">Success</Badge>
 * <Badge variant="warning">Warning</Badge>
 * <Badge variant="info">Info</Badge>
 * <Badge size="sm">Small</Badge>
 * <Badge size="lg">Large</Badge>
 * ```
 */
function BadgeComponent({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

// Memoize Badge for performance optimization
const Badge = React.memo(BadgeComponent) as any as typeof BadgeComponent;

export { Badge, badgeVariants };
