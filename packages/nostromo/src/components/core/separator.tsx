import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      // self-stretch, not just h-full: `height: 100%` against an auto-height
      // flex row resolves to nothing, and with the usual `items-center` the
      // item does not stretch either - so a vertical separator rendered 1px
      // wide and 0px tall, which looked like the prop did nothing at all.
      // Stretching fills the cross axis; h-full still covers non-flex parents.
      vertical: "w-[1px] self-stretch h-full",
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
});

export interface SeparatorProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "aria-orientation">,
    VariantProps<typeof separatorVariants> {
  decorative?: boolean;
  "aria-orientation"?: "horizontal" | "vertical";
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
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role={decorative ? "none" : "separator"}
        {...(decorative
          ? {}
          : { "aria-orientation": orientation || undefined })}
        className={cn(
          separatorVariants({ orientation, variant, size }),
          className,
        )}
        {...props}
      />
    );
  },
);
Separator.displayName = "Separator";

export { Separator, separatorVariants };
