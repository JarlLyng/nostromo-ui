import * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";
import { DotsSixVertical } from "phosphor-react";

import { cn } from "../../lib/utils";

/**
 * Panels the user can resize by dragging the divider between them: a file tree
 * next to an editor, a list next to a preview.
 *
 * Thin wrappers over react-resizable-panels, which owns the sizing, the pointer
 * and keyboard handling, and the ARIA on the divider. Only the look is ours.
 *
 * ## The group sizes itself, so size its parent
 *
 * The group sets `display`, `flex-direction`, `width: 100%` and `height: 100%`
 * as *inline* styles. Inline styles beat classes, so `className="h-96"` on the
 * group does nothing at all - a silent no-op, which is why it is written down
 * here. Put the height on the element around the group, or pass
 * `style={{ height: "24rem" }}`, which merges with the library's own.
 *
 * For the same reason there are no layout classes on `ResizablePanelGroup`
 * below. `flex`, `w-full` and a flex-direction switch would all be overridden
 * by the inline styles, and dead classes are worse than none.
 *
 * ## `aria-orientation` on the divider is the divider's own axis
 *
 * A horizontal group - panels side by side - has a *vertical* divider, so it
 * reports `aria-orientation="vertical"`. The styling below reads it that way
 * round: the default is a vertical hairline, and the `aria-[orientation=
 * horizontal]` variants flip it to a horizontal one.
 *
 * ## A class on a panel lands on an inner element
 *
 * `ResizablePanel` renders a wrapper that the library controls with flex, and
 * puts `className` on a child inside it. That is deliberate on their side: it
 * keeps padding and borders from fighting the flex sizing. It does mean a
 * background on a panel paints the inner box, which is what you want anyway.
 */

const ResizablePanelGroup = React.forwardRef<
  HTMLDivElement,
  ResizablePrimitive.GroupProps
>(({ className, ...props }, ref) => (
  <ResizablePrimitive.Group
    elementRef={ref}
    className={cn(className)}
    {...props}
  />
));
ResizablePanelGroup.displayName = "ResizablePanelGroup";

const ResizablePanel = React.forwardRef<
  HTMLDivElement,
  ResizablePrimitive.PanelProps
>(({ ...props }, ref) => (
  <ResizablePrimitive.Panel elementRef={ref} {...props} />
));
ResizablePanel.displayName = "ResizablePanel";

export interface ResizableHandleProps
  extends ResizablePrimitive.SeparatorProps {
  /**
   * Draw a grip on the divider.
   *
   * A one-pixel line is a small target and gives no hint that it can be
   * dragged. The grip is worth it anywhere the divider is not obvious.
   */
  withHandle?: boolean;
}

const ResizableHandle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  ({ withHandle, className, ...props }, ref) => (
    <ResizablePrimitive.Separator
      elementRef={ref}
      className={cn(
        "relative flex w-px items-center justify-center bg-border",
        // A 1px line is a 1px hit area. This widens the grab zone without
        // moving the panels, which is why it is a pseudo-element.
        "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        "aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full",
        "aria-[orientation=horizontal]:after:inset-x-0 aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:top-1/2 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:-translate-y-1/2 aria-[orientation=horizontal]:after:translate-x-0",
        "[&[aria-orientation=horizontal]>div]:rotate-90",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-border bg-border">
          <DotsSixVertical className="h-3 w-3" aria-hidden="true" />
        </div>
      )}
    </ResizablePrimitive.Separator>
  ),
);
ResizableHandle.displayName = "ResizableHandle";

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
