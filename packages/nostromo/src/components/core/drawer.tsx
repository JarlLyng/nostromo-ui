import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "../../lib/utils";

/**
 * A panel that slides in from an edge and can be dragged shut.
 *
 * Built on [vaul](https://vaul.emilkowal.ski/), which is a Radix Dialog
 * underneath - the same primitive `Sheet` uses, so the focus trap and the escape
 * handling come from the same place.
 *
 * ## Drawer or Sheet?
 *
 * They look alike, and the difference is the gesture:
 *
 * - `Sheet` is a dialog anchored to an edge. It opens and closes, and that is
 *   all. Cheaper, and the right choice on a desktop-first surface.
 * - `Drawer` adds the touch model: drag it to dismiss, snap points to open it
 *   part of the way, and a grabber that says it can be moved. That is the mobile
 *   convention, and it costs the extra dependency.
 *
 * If you would not use the drag, use `Sheet`.
 *
 * One difference in how they are modal: vaul does not put `aria-modal` on the
 * dialog. It aria-hides the rest of the page instead, which confines a screen
 * reader the same way. Both are valid, and this one is pinned by a test so it
 * cannot quietly become neither.
 *
 * ## Positioning comes from a data attribute
 *
 * `direction` is a prop on the root, and vaul writes it onto the content as
 * `data-vaul-drawer-direction`. The content styling below reads that rather than
 * taking a variant of its own, so the two can never disagree - the drawer cannot
 * be told to come from the left and then be styled along the bottom.
 */

const Drawer = DrawerPrimitive.Root;
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

/**
 * The grabber.
 *
 * vaul's own, not a decorative div: it carries a hit area larger than the bar you
 * see, so the drag target is a reasonable size on a touch screen, and it is
 * `aria-hidden` because dragging is not the only way to close.
 */
const DrawerHandle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Handle>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Handle>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Handle
    ref={ref}
    className={cn(
      "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted",
      className,
    )}
    {...props}
  />
));
DrawerHandle.displayName = "DrawerHandle";

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className,
    )}
    {...props}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

export interface DrawerContentProps extends React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Content
> {
  /**
   * Draw the grabber. Defaults to true, and it is hidden by CSS for a drawer
   * coming from the left or right, where a horizontal bar would be wrong.
   */
  withHandle?: boolean;
}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ className, children, withHandle = true, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        // The group is what lets the header and the grabber react to the
        // direction without being told it separately.
        "group/drawer-content fixed z-50 flex h-auto flex-col border-border bg-background",
        "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
        "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
        "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
        "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <DrawerHandle className="hidden group-data-[vaul-drawer-direction=bottom]/drawer-content:block group-data-[vaul-drawer-direction=top]/drawer-content:mb-4 group-data-[vaul-drawer-direction=top]/drawer-content:mt-0 group-data-[vaul-drawer-direction=top]/drawer-content:block" />
      )}
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-1.5 p-4",
      // Centred when it comes from an edge you look down at, left-aligned when it
      // is a side panel and reads like a page.
      "group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center",
      "md:text-left",
      className,
    )}
    {...props}
  />
));
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
));
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-foreground",
      className,
    )}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";

/**
 * A drawer opened from inside another one, which scales the parent back rather
 * than stacking two overlays. Use in place of `Drawer` for the inner one.
 */
const DrawerNested = DrawerPrimitive.NestedRoot;

export {
  Drawer,
  DrawerNested,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
