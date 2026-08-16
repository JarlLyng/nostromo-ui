import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "../hover-card";
import { ScrollArea } from "../scroll-area";

function Example() {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger href="#profile">@jarllyng</HoverCardTrigger>
      <HoverCardContent>
        <p>Jarl Lyng</p>
        <p>Builds component libraries.</p>
      </HoverCardContent>
    </HoverCard>
  );
}

describe("HoverCard", () => {
  it("stays closed until the trigger is hovered", () => {
    render(<Example />);
    expect(screen.queryByText("Jarl Lyng")).not.toBeInTheDocument();
  });

  it("opens on hover and closes when the pointer leaves", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.hover(screen.getByText("@jarllyng"));
    expect(await screen.findByText("Jarl Lyng")).toBeInTheDocument();

    await user.unhover(screen.getByText("@jarllyng"));
    await waitFor(() =>
      expect(screen.queryByText("Jarl Lyng")).not.toBeInTheDocument(),
    );
  });

  it("opens on keyboard focus, not only on hover", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.tab();
    expect(screen.getByText("@jarllyng")).toHaveFocus();
    expect(await screen.findByText("Jarl Lyng")).toBeInTheDocument();
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.hover(screen.getByText("@jarllyng"));
    await screen.findByText("Jarl Lyng");

    const results = await axe(document.body, {
      rules: { region: { enabled: false } },
    });
    expect(results.violations).toHaveLength(0);
  });
});

describe("ScrollArea", () => {
  it("renders its children inside a viewport", () => {
    render(
      <ScrollArea className="h-32" data-testid="area">
        <p>Scrollable body</p>
      </ScrollArea>,
    );
    expect(screen.getByText("Scrollable body")).toBeInTheDocument();
    expect(screen.getByTestId("area").className).toContain("overflow-hidden");
  });

  // Radix only mounts a scrollbar once the content overflows, and in jsdom every
  // size is 0, so nothing ever overflows. `type="always"` is the documented prop
  // for keeping them mounted, so this exercises the real component rather than a
  // stub.
  it("renders a vertical scrollbar by default", () => {
    const { container } = render(
      <ScrollArea className="h-32" type="always">
        <p>Body</p>
      </ScrollArea>,
    );
    const bars = container.querySelectorAll("[data-orientation]");
    expect([...bars].map((b) => b.getAttribute("data-orientation"))).toEqual([
      "vertical",
    ]);
  });

  it("renders both scrollbars when asked", () => {
    const { container } = render(
      <ScrollArea className="h-32" orientation="both" type="always">
        <p>Body</p>
      </ScrollArea>,
    );
    const orientations = [...container.querySelectorAll("[data-orientation]")]
      .map((b) => b.getAttribute("data-orientation"))
      .sort();
    expect(orientations).toEqual(["horizontal", "vertical"]);
  });

  it("passes viewportClassName through to the scrolling element", () => {
    const { container } = render(
      <ScrollArea viewportClassName="max-h-40">
        <p>Body</p>
      </ScrollArea>,
    );
    expect(container.querySelector(".max-h-40")).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ScrollArea className="h-32">
        <p>Body</p>
      </ScrollArea>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
