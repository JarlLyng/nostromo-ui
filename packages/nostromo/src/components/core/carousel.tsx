import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { CaretLeft, CaretRight } from "phosphor-react";

import { cn } from "../../lib/utils";
import { Button } from "./button";

/**
 * A horizontal or vertical strip of slides that snaps as you drag it.
 *
 * Embla does the measuring, the dragging and the snapping. This file is the
 * markup, the styling and the roles, plus the two buttons.
 *
 * ## `orientation` is the only axis control
 *
 * Embla takes `axis: "x" | "y"`, and this component derives it from
 * `orientation`, because the padding on `CarouselItem` and the placement of the
 * two buttons have to agree with it. Setting `opts={{ axis: "y" }}` will not
 * work: `orientation` overwrites it. One control, so the styling cannot drift
 * out of sync with the behaviour.
 *
 * ## Anything beyond next and previous goes through `setApi`
 *
 * Dots, autoplay, a progress bar, "slide 3 of 7" - all of that reads state
 * embla owns, and wrapping each one would mean guessing which you want. `setApi`
 * hands you the embla instance instead, and its `on("select")` event is the hook
 * for the rest.
 */

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps {
  /** Embla options. `axis` is ignored - use `orientation`. */
  opts?: CarouselOptions;
  /** Embla plugins, for example autoplay. */
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  /** Receives the embla instance, for dots, autoplay or a slide counter. */
  setApi?: (api: CarouselApi) => void;
}

interface CarouselContextValue extends CarouselProps {
  carouselRef: UseEmblaCarouselType[0];
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation: "horizontal" | "vertical";
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used inside a <Carousel>.");
  }
  return context;
}

/** Arrow keys mean "move the caret" inside a text field, not "change slide". */
function isTextEntry(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins,
    );
    // Whether there is anywhere to scroll lives in embla, not here, so it is
    // read rather than mirrored. An effect that copied it into state would
    // render once with both buttons wrongly disabled before the effect ran, and
    // would set state synchronously inside an effect, which is a cascading
    // render. Subscribing is both correct and simpler.
    const subscribe = React.useCallback(
      (onStoreChange: () => void) => {
        if (!api) return () => {};
        api.on("select", onStoreChange);
        api.on("reInit", onStoreChange);
        return () => {
          api.off("select", onStoreChange);
          api.off("reInit", onStoreChange);
        };
      },
      [api],
    );
    const canScrollPrev = React.useSyncExternalStore(
      subscribe,
      () => api?.canScrollPrev() ?? false,
      () => false,
    );
    const canScrollNext = React.useSyncExternalStore(
      subscribe,
      () => api?.canScrollNext() ?? false,
      () => false,
    );

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (isTextEntry(event.target)) return;
        const [back, forward] =
          orientation === "horizontal"
            ? ["ArrowLeft", "ArrowRight"]
            : ["ArrowUp", "ArrowDown"];
        if (event.key === back) {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === forward) {
          event.preventDefault();
          scrollNext();
        }
      },
      [orientation, scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    const value = React.useMemo(
      () => ({
        carouselRef,
        api,
        opts,
        plugins,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }),
      [
        carouselRef,
        api,
        opts,
        plugins,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      ],
    );

    return (
      <CarouselContext.Provider value={value}>
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn(
            "relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            className,
          )}
          role="region"
          aria-roledescription="carousel"
          // A tab stop, so the arrow keys below are actually reachable. Without
          // it this div can never hold focus, the handler only ever fires for
          // keys pressed on something inside it, and a keyboard user tabbing
          // through the page gets the two buttons and no way to reach the
          // slides. Pass your own tabIndex to opt out.
          tabIndex={0}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

/**
 * The viewport and the track.
 *
 * Two elements rather than one: embla measures the outer one, which must clip,
 * and translates the inner one. The negative margin pairs with the padding on
 * `CarouselItem` so the gap between slides does not show up as an edge inset.
 */
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

export interface CarouselButtonProps extends React.ComponentPropsWithoutRef<
  typeof Button
> {
  /**
   * Screen-reader text for the button. The arrow is decorative, so this is the
   * button's only accessible name.
   */
  label?: string;
}

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  CarouselButtonProps
>(
  (
    {
      className,
      variant = "outline",
      size = "icon",
      label = "Previous slide",
      ...props
    },
    ref,
  ) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <CaretLeft className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselButtonProps>(
  (
    {
      className,
      variant = "outline",
      size = "icon",
      label = "Next slide",
      ...props
    },
    ref,
  ) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <CaretRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
};
export type { CarouselApi, CarouselOptions, CarouselPlugin, CarouselProps };
