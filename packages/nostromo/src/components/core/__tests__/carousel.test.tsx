import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
  type CarouselApi,
  type CarouselProps,
} from "../carousel";

/**
 * jsdom has no layout, so every element is 0 wide. Embla measures to work out
 * where the snap points are, and with no width it finds exactly one - which
 * makes both buttons permanently disabled and nothing scrollable.
 *
 * `loop: true` is the way round it. Looping snaps do not depend on measurement,
 * so embla reports the real slide count and actually moves between them. That is
 * verified, not assumed: without loop, `scrollSnapList()` is `[0]` and
 * `scrollTo(1)` is a no-op; with it, the list has one entry per slide and
 * `scrollTo(1)` fires `select` and changes the selected snap.
 *
 * So the behavioural tests below opt into loop. The two that do not are marked,
 * and they assert the un-measurable state honestly: buttons disabled.
 */
function setup(props: CarouselProps = {}, slides = 4) {
  return (
    <Carousel aria-label="Photos" {...props}>
      <CarouselContent>
        {Array.from({ length: slides }, (_, i) => (
          <CarouselItem key={i}>Slide {i + 1}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

/** Reads the embla state the component is driving its buttons from. */
function selectedIndex(api: CarouselApi) {
  return api?.selectedScrollSnap();
}

describe("Carousel", () => {
  it("announces itself as a carousel of slides", () => {
    render(setup());
    const region = screen.getByRole("region", { name: "Photos" });
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
    const slides = screen.getAllByRole("group");
    expect(slides).toHaveLength(4);
    expect(slides[0]).toHaveAttribute("aria-roledescription", "slide");
  });

  it("names both buttons for a screen reader", () => {
    render(setup());
    expect(
      screen.getByRole("button", { name: "Previous slide" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next slide" })).toBeVisible();
  });

  it("takes custom button labels", () => {
    render(
      <Carousel aria-label="Photos">
        <CarouselContent>
          <CarouselItem>a</CarouselItem>
        </CarouselContent>
        <CarouselPrevious label="Forrige" />
        <CarouselNext label="Næste" />
      </Carousel>,
    );
    expect(screen.getByRole("button", { name: "Forrige" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Næste" })).toBeInTheDocument();
  });

  // Not a limitation of the component: with no layout there is genuinely
  // nowhere to scroll to, and disabled is the correct answer.
  it("disables both buttons when there is only one snap point", () => {
    render(setup());
    expect(
      screen.getByRole("button", { name: "Previous slide" }),
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next slide" })).toBeDisabled();
  });

  it("hands out the embla instance through setApi", async () => {
    const setApi = vi.fn();
    render(setup({ setApi }));
    await waitFor(() => expect(setApi).toHaveBeenCalled());
    const api = setApi.mock.calls[0]![0] as CarouselApi;
    expect(api?.slideNodes()).toHaveLength(4);
  });

  it("advances when Next is clicked", async () => {
    const user = userEvent.setup();
    let api: CarouselApi;
    render(setup({ opts: { loop: true }, setApi: (a) => (api = a) }));
    await waitFor(() => expect(api).toBeTruthy());
    expect(selectedIndex(api!)).toBe(0);

    await user.click(screen.getByRole("button", { name: "Next slide" }));
    await waitFor(() => expect(selectedIndex(api!)).toBe(1));

    await user.click(screen.getByRole("button", { name: "Previous slide" }));
    await waitFor(() => expect(selectedIndex(api!)).toBe(0));
  });

  // Without a tab stop the arrow-key handler is unreachable: the div cannot
  // hold focus, so it only ever sees keys pressed on something inside it.
  it("is a tab stop, and gives that up on request", async () => {
    const user = userEvent.setup();
    const { unmount } = render(setup());
    await user.tab();
    expect(screen.getByRole("region", { name: "Photos" })).toHaveFocus();
    unmount();

    render(setup({}, 2));
    render(
      <Carousel aria-label="Opt out" tabIndex={-1}>
        <CarouselContent>
          <CarouselItem>a</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );
    expect(screen.getByRole("region", { name: "Opt out" })).toHaveAttribute(
      "tabindex",
      "-1",
    );
  });

  it("moves with the left and right arrow keys", async () => {
    const user = userEvent.setup();
    let api: CarouselApi;
    render(setup({ opts: { loop: true }, setApi: (a) => (api = a) }));
    await waitFor(() => expect(api).toBeTruthy());

    const region = screen.getByRole("region", { name: "Photos" });
    region.focus();
    await user.type(region, "{ArrowRight}");
    await waitFor(() => expect(selectedIndex(api!)).toBe(1));
    await user.type(region, "{ArrowLeft}");
    await waitFor(() => expect(selectedIndex(api!)).toBe(0));
  });

  // Vertical means up and down. Left/right on a vertical carousel would be a
  // second, wrong way to drive it.
  it("uses up and down when it is vertical", async () => {
    const user = userEvent.setup();
    let api: CarouselApi;
    render(
      setup({
        orientation: "vertical",
        opts: { loop: true },
        setApi: (a) => (api = a),
      }),
    );
    await waitFor(() => expect(api).toBeTruthy());

    const region = screen.getByRole("region", { name: "Photos" });
    await user.type(region, "{ArrowDown}");
    await waitFor(() => expect(selectedIndex(api!)).toBe(1));

    await user.type(region, "{ArrowRight}");
    await new Promise((r) => setTimeout(r, 30));
    expect(selectedIndex(api!)).toBe(1);
  });

  // The keydown handler is on capture, so without this guard it would eat the
  // arrow keys of any input inside a slide - you could not move the caret.
  it("leaves arrow keys alone inside a text field", async () => {
    const user = userEvent.setup();
    let api: CarouselApi;
    render(
      <Carousel
        aria-label="Photos"
        opts={{ loop: true }}
        setApi={(a) => (api = a)}
      >
        <CarouselContent>
          <CarouselItem>
            <input aria-label="Caption" defaultValue="abc" />
          </CarouselItem>
          <CarouselItem>two</CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>,
    );
    await waitFor(() => expect(api).toBeTruthy());

    const input = screen.getByLabelText("Caption") as HTMLInputElement;
    await user.click(input);
    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    // Caret moved inside the input, and the carousel did not move.
    expect(input.selectionStart).toBe(1);
    expect(selectedIndex(api!)).toBe(0);
  });

  it("throws when a part is used outside a Carousel", () => {
    function Orphan() {
      useCarousel();
      return null;
    }
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Orphan />)).toThrow(
      /must be used inside a <Carousel>/,
    );
    spy.mockRestore();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(setup());
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
