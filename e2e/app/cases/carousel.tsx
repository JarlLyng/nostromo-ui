import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@jarllyng/nostromo";

/**
 * Five slides, no `loop`, in a container of a known width.
 *
 * `loop` is deliberately off. The unit tests have to switch it on, because
 * looping snap points do not depend on measurement and are the only way to move
 * a carousel in jsdom. Here there is a real viewport, so the honest case works -
 * and the disabled-button state at each end becomes testable.
 */
export function CarouselCase() {
  return (
    <div style={{ padding: 64 }}>
      <div style={{ width: 400 }}>
        <Carousel aria-label="Numbers">
          <CarouselContent data-testid="track">
            {[1, 2, 3, 4, 5].map((n) => (
              <CarouselItem key={n} data-testid={`slide-${n}`}>
                <div className="flex h-32 items-center justify-center rounded-lg border border-border bg-card text-2xl font-semibold">
                  {n}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
