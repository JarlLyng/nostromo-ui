import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * A value picked by dragging along a range: volume, price, opacity.
 *
 * Radix renders one thumb per entry in `value`, so a range slider is the same
 * component with two numbers rather than a separate one. The thumbs are rendered
 * from the value rather than hardcoded here for that reason.
 */

const sliderTrackVariants = cva(
  "relative grow overflow-hidden rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "h-1",
        default: "h-1.5",
        lg: "h-2.5",
      },
    },
    defaultVariants: { size: "default" },
  },
);

const sliderThumbVariants = cva(
  "block rounded-full border-2 border-primary bg-background shadow transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
    "disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5",
        default: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: { size: "default" },
  },
);

export interface SliderProps
  extends
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderTrackVariants> {
  /**
   * Label for each thumb, so a screen reader says "Minimum" and "Maximum"
   * rather than "slider" twice. One string labels a single thumb; an array
   * labels them in order.
   */
  thumbLabel?: string | string[];
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, size, thumbLabel, ...props }, ref) => {
  // One thumb per value. Radix drives this from `value` or `defaultValue`, so
  // reading it here keeps a range slider working without a second component.
  const values = props.value ?? props.defaultValue ?? [0];
  const labels = Array.isArray(thumbLabel) ? thumbLabel : [thumbLabel];

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className={cn(sliderTrackVariants({ size }))}>
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {values.map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={cn(sliderThumbVariants({ size }))}
          aria-label={labels[i] ?? labels[0]}
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider, sliderTrackVariants, sliderThumbVariants };
