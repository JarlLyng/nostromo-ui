import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * `@radix-ui/react-popover` was already a dependency - Calendar mounts its month
 * grid in one - but it was never exposed, so a consumer wanting a popover had to
 * add the package a second time and theme it themselves.
 */

const popoverContentVariants = cva(
  "z-50 rounded-lg border border-border bg-background p-4 text-foreground shadow-lg outline-none " +
    "data-[state=open]:animate-in data-[state=closed]:animate-out " +
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 " +
    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      size: {
        sm: "w-56",
        default: "w-72",
        lg: "w-96",
        auto: "w-auto",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverClose = PopoverPrimitive.Close;

type PopoverContentBase = Omit<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
  "aria-label" | "aria-labelledby"
> &
  VariantProps<typeof popoverContentVariants>;

/**
 * An accessible name is required, not optional.
 *
 * Radix gives the content `role="dialog"`, and a dialog without a name is an
 * `aria-dialog-name` violation - axe flags it, and a screen reader announces
 * "dialog" and nothing else. It is not something a default can solve, because a
 * generic "Popover" label is worse than useless. So the type asks for one of the
 * two ways to supply it, which turns a runtime audit finding into a compile
 * error.
 */
export type PopoverContentProps = PopoverContentBase &
  (
    | { "aria-label": string; "aria-labelledby"?: never }
    | { "aria-labelledby": string; "aria-label"?: never }
  );

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 8, size, ...props }, ref) => (
  // Portalled by default: an un-portalled popover inherits `overflow: hidden`
  // and any stacking context from whatever it happens to be nested in, which is
  // how popovers end up clipped inside cards and tables.
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(popoverContentVariants({ size }), className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const PopoverArrow = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Arrow
    ref={ref}
    className={cn("fill-background", className)}
    {...props}
  />
));
PopoverArrow.displayName = PopoverPrimitive.Arrow.displayName;

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverClose,
  PopoverArrow,
  popoverContentVariants,
};
