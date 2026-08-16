import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { AspectRatio } from "../aspect-ratio";
import { Toggle, ToggleGroup, ToggleGroupItem } from "../toggle";

describe("Toggle", () => {
  it("announces itself as a pressed button rather than a checkbox", async () => {
    const user = userEvent.setup();
    render(<Toggle aria-label="Bold">B</Toggle>);

    const toggle = screen.getByRole("button", { name: "Bold" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("reports changes to the caller", async () => {
    const onPressedChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Toggle aria-label="Bold" onPressedChange={onPressedChange}>
        B
      </Toggle>,
    );

    await user.click(screen.getByRole("button", { name: "Bold" }));
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it("honours defaultPressed", () => {
    render(
      <Toggle aria-label="Bold" defaultPressed>
        B
      </Toggle>,
    );
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("cannot be pressed when disabled", async () => {
    const onPressedChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Toggle aria-label="Bold" disabled onPressedChange={onPressedChange}>
        B
      </Toggle>,
    );

    await user.click(screen.getByRole("button", { name: "Bold" }));
    expect(onPressedChange).not.toHaveBeenCalled();
  });

  it("applies the outline variant", () => {
    render(
      <Toggle aria-label="Bold" variant="outline">
        B
      </Toggle>,
    );
    expect(screen.getByRole("button", { name: "Bold" }).className).toContain(
      "border",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Toggle aria-label="Bold">B</Toggle>);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

describe("ToggleGroup", () => {
  it("keeps a single selection in single mode", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single" defaultValue="left" aria-label="Alignment">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
      </ToggleGroup>,
    );

    expect(screen.getByText("Left")).toHaveAttribute("data-state", "on");

    await user.click(screen.getByText("Center"));
    expect(screen.getByText("Center")).toHaveAttribute("data-state", "on");
    expect(screen.getByText("Left")).toHaveAttribute("data-state", "off");
  });

  it("allows several in multiple mode", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="multiple" aria-label="Formatting">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>,
    );

    await user.click(screen.getByText("Bold"));
    await user.click(screen.getByText("Italic"));

    expect(screen.getByText("Bold")).toHaveAttribute("data-state", "on");
    expect(screen.getByText("Italic")).toHaveAttribute("data-state", "on");
  });

  // Passed through context rather than by cloning children, so an item still
  // gets the group's styling when a consumer wraps it in their own markup.
  it("passes its size down to items", () => {
    render(
      <ToggleGroup type="single" size="lg" aria-label="Alignment">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByText("Left").className).toContain("h-10");
  });

  it("lets an item override the group's size", () => {
    render(
      <ToggleGroup type="single" size="lg" aria-label="Alignment">
        <ToggleGroupItem value="left" size="sm">
          Left
        </ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByText("Left").className).toContain("h-8");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ToggleGroup type="single" aria-label="Alignment">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
      </ToggleGroup>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

describe("AspectRatio", () => {
  it("sets the CSS aspect-ratio property rather than padding", () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="box">
        <img src="/x.png" alt="" />
      </AspectRatio>,
    );
    const box = screen.getByTestId("box");
    // jsdom normalises a bare number to "<n> / 1".
    expect(box.style.aspectRatio).toBe(`${16 / 9} / 1`);
    // The padding-bottom trick is what the Radix package exists for; native CSS
    // does not need it, and its absence is the point of not taking that dependency.
    expect(box.style.paddingBottom).toBe("");
  });

  it("defaults to square", () => {
    render(<AspectRatio data-testid="box" />);
    expect(screen.getByTestId("box").style.aspectRatio).toBe("1 / 1");
  });

  it("crops an oversized child", () => {
    render(<AspectRatio data-testid="box" />);
    expect(screen.getByTestId("box").className).toContain("overflow-hidden");
  });

  it("lets a caller override the ratio through style", () => {
    render(
      <AspectRatio
        ratio={1}
        style={{ aspectRatio: "4 / 3" }}
        data-testid="box"
      />,
    );
    expect(screen.getByTestId("box").style.aspectRatio).toBe("4 / 3");
  });
});
