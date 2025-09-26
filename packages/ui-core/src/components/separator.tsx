import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const separatorVariants = cva(
  "shrink-0 bg-border",
  {
    variants: {
      orientation: {
        horizontal: "h-[1px] w-full",
        vertical: "h-full w-[1px]",
      },
      variant: {
        default: "bg-border",
        muted: "bg-muted",
        subtle: "bg-muted/50",
      },
      size: {
        default: "",
        sm: "h-px",
        lg: "h-0.5",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      variant: "default",
      size: "default",
    },
  }
);

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      variant = "default",
      size = "default",
      decorative = true,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role={decorative ? "none" : "separator"}
        {...(decorative ? {} : { "aria-orientation": orientation || undefined })}
        className={cn(separatorVariants({ orientation, variant, size }), className)}
        {...props}
      />
    );
  }
);
Separator.displayName = "Separator";

export { Separator, separatorVariants };
