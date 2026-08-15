import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * A panel that slides in from an edge: mobile navigation, a filter drawer, a
 * detail pane beside a table.
 *
 * Built on `@radix-ui/react-dialog` rather than on this package's own `Dialog`.
 * They are the same primitive underneath and a sheet is a dialog - but ours is
 * hand-rolled around a centred box, and bending it into an edge-anchored panel
 * would mean two layout modes in one component and a `variant` that changes what
 * every other prop means. Radix brings the focus trap, scroll lock and inert
 * background that a hand-rolled overlay has to get right on its own.
 */

const sheetVariants = cva(
  "fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-lg transition-none " +
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b border-border data-[state=closed]:slide-in-from-top-2 data-[state=open]:slide-in-from-top-2",
        bottom:
          "inset-x-0 bottom-0 border-t border-border data-[state=closed]:slide-in-from-bottom-2 data-[state=open]:slide-in-from-bottom-2",
        left: "inset-y-0 left-0 h-full w-3/4 border-r border-border sm:max-w-sm data-[state=closed]:slide-in-from-left-2 data-[state=open]:slide-in-from-left-2",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l border-border sm:max-w-sm data-[state=closed]:slide-in-from-right-2 data-[state=open]:slide-in-from-right-2",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-neutral-950/50 data-[state=open]:animate-in data-[state=closed]:animate-out " +
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

export interface SheetContentProps
  extends
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

/**
 * A `SheetTitle` is required, not decorative.
 *
 * Radix warns at runtime when a dialog has no title, and axe reports
 * `aria-dialog-name` - a screen reader announces "dialog" and nothing else. The
 * title can be visually hidden if the design has no room for one, which is what
 * `SheetTitle`'s `srOnly` is for; what it cannot be is absent.
 */
const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side, className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}
SheetHeader.displayName = "SheetHeader";

function SheetFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}
SheetFooter.displayName = "SheetFooter";

export interface SheetTitleProps extends React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Title
> {
  /**
   * Keeps the title for assistive technology while removing it visually, for
   * designs with no room for a heading. The accessible name still exists, which
   * is the part that is not optional.
   */
  srOnly?: boolean;
}

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  SheetTitleProps
>(({ className, srOnly, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      srOnly
        ? "absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
        : "text-lg font-semibold text-foreground",
      className,
    )}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetVariants,
};
