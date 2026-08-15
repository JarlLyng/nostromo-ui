import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";

function Example({ defaultOpen }: { defaultOpen?: boolean }) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger>Filters</CollapsibleTrigger>
      <CollapsibleContent>
        <p>Filter body</p>
      </CollapsibleContent>
    </Collapsible>
  );
}

describe("Collapsible", () => {
  it("starts closed and opens on click", async () => {
    const user = userEvent.setup();
    render(<Example />);
    expect(screen.queryByText("Filter body")).not.toBeInTheDocument();

    await user.click(screen.getByText("Filters"));
    expect(screen.getByText("Filter body")).toBeInTheDocument();
  });

  it("honours defaultOpen", () => {
    render(<Example defaultOpen />);
    expect(screen.getByText("Filter body")).toBeInTheDocument();
  });

  it("toggles closed again", async () => {
    const user = userEvent.setup();
    render(<Example defaultOpen />);

    await user.click(screen.getByText("Filters"));
    expect(screen.queryByText("Filter body")).not.toBeInTheDocument();
  });

  it("marks the trigger's expanded state for assistive tech", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByText("Filters");

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  // The height transition needs --radix-collapsible-content-height, which only
  // exists on the content element - so the animation class belongs there and not
  // on whatever the caller wraps it in.
  it("carries the height animation on the content element", () => {
    render(<Example defaultOpen />);
    const content = screen.getByText("Filter body").parentElement;
    expect(content?.className).toContain("animate-collapsible-down");
    expect(content?.className).toContain("overflow-hidden");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Example defaultOpen />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
