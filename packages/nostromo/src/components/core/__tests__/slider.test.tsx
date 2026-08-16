import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import { Slider } from "../slider";

describe("Slider", () => {
  it("exposes a slider with its value", () => {
    render(<Slider defaultValue={[40]} thumbLabel="Volume" />);
    const slider = screen.getByRole("slider", { name: "Volume" });
    expect(slider).toHaveAttribute("aria-valuenow", "40");
  });

  it("moves with the arrow keys", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Slider
        defaultValue={[40]}
        thumbLabel="Volume"
        onValueChange={onValueChange}
      />,
    );

    screen.getByRole("slider", { name: "Volume" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalledWith([41]);
  });

  it("respects step", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Slider
        defaultValue={[40]}
        step={10}
        thumbLabel="Volume"
        onValueChange={onValueChange}
      />,
    );

    screen.getByRole("slider", { name: "Volume" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalledWith([50]);
  });

  // One thumb per value, so a range is the same component with two numbers
  // rather than a second component.
  it("renders one thumb per value", () => {
    render(
      <Slider defaultValue={[20, 80]} thumbLabel={["Minimum", "Maximum"]} />,
    );
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });

  it("labels each thumb of a range separately", () => {
    render(
      <Slider defaultValue={[20, 80]} thumbLabel={["Minimum", "Maximum"]} />,
    );
    expect(screen.getByRole("slider", { name: "Minimum" })).toHaveAttribute(
      "aria-valuenow",
      "20",
    );
    expect(screen.getByRole("slider", { name: "Maximum" })).toHaveAttribute(
      "aria-valuenow",
      "80",
    );
  });

  it("does not move when disabled", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Slider
        defaultValue={[40]}
        disabled
        thumbLabel="Volume"
        onValueChange={onValueChange}
      />,
    );

    await user.keyboard("{ArrowRight}");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Slider defaultValue={[40]} thumbLabel="Volume" />,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
