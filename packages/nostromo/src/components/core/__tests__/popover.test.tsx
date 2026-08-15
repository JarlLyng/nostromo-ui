import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../popover";

function Example({ size }: { size?: "sm" | "default" | "lg" | "auto" }) {
  return (
    <Popover>
      <PopoverTrigger>Open settings</PopoverTrigger>
      <PopoverContent size={size} aria-label="Settings">
        <p>Panel body</p>
        <PopoverClose>Dismiss</PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("stays closed until the trigger is used", () => {
    render(<Example />);
    expect(screen.queryByText("Panel body")).not.toBeInTheDocument();
  });

  it("opens on click and closes again on Escape", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Open settings"));
    expect(await screen.findByText("Panel body")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("Panel body")).not.toBeInTheDocument();
  });

  it("closes from PopoverClose", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Open settings"));
    await user.click(await screen.findByText("Dismiss"));
    expect(screen.queryByText("Panel body")).not.toBeInTheDocument();
  });

  it("marks the trigger's expanded state for assistive tech", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByText("Open settings");

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("applies the size variant", async () => {
    const user = userEvent.setup();
    render(<Example size="sm" />);

    await user.click(screen.getByText("Open settings"));
    const content = (await screen.findByText("Panel body")).closest("div");
    expect(content?.className).toContain("w-56");
  });

  // Radix gives the content role="dialog", and a nameless dialog is an
  // aria-dialog-name violation. PopoverContentProps requires aria-label or
  // aria-labelledby for exactly that reason, so this asserts the requirement
  // actually buys something.
  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByText("Open settings"));
    await screen.findByText("Panel body");

    // Portalled content lands outside `container`, so audit the document.
    const results = await axe(document.body);
    expect(results.violations).toHaveLength(0);
  });
});
