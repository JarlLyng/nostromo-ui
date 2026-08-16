import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * Holds a box at a fixed ratio while its width is free: video embeds, image
 * grids, map panes.
 *
 * Written here rather than pulled from `@radix-ui/react-aspect-ratio`. That
 * package exists for the padding-bottom trick browsers needed before the CSS
 * `aspect-ratio` property, and every browser this library supports has had it
 * for years. Gallery already relies on it through Tailwind's `aspect-[3/4]`. A
 * dependency to set one CSS property would be a dependency to maintain, audit
 * and ship for nothing.
 */

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width divided by height. `16 / 9` for video, `1` for a square, `4 / 3` for
   * a photo. Written as a division rather than a string so the intent survives
   * in the source.
   */
  ratio?: number;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      // `overflow-hidden` so an oversized child is cropped to the box rather
      // than spilling out of it, which is what a caller means by giving it a
      // ratio in the first place.
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: String(ratio), ...style }}
      {...props}
    >
      {children}
    </div>
  ),
);
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
