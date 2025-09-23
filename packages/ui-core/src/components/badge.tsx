import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 shadow-badge hover:shadow-badge-hover",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand-500 text-white hover:bg-brand-600 shadow-badge hover:shadow-badge-hover",
        secondary:
          "border-transparent bg-neutral-200 text-neutral-900 hover:bg-neutral-300 shadow-badge hover:shadow-badge-hover",
        destructive:
          "border-transparent bg-error-500 text-white hover:bg-error-600 shadow-badge hover:shadow-badge-hover",
        outline: 
          "border-2 border-neutral-300 text-neutral-900 hover:border-brand-500 hover:text-brand-600 hover:shadow-badge",
        success:
          "border-transparent bg-success-500 text-white hover:bg-success-600 shadow-badge hover:shadow-badge-hover",
        warning:
          "border-transparent bg-warning-500 text-white hover:bg-warning-600 shadow-badge hover:shadow-badge-hover",
        info:
          "border-transparent bg-info-500 text-white hover:bg-info-600 shadow-badge hover:shadow-badge-hover",
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
  }
);

/**
 * Props for the Badge component
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * The visual variant of the badge
   * @default "default"
   */
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info";
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
function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
