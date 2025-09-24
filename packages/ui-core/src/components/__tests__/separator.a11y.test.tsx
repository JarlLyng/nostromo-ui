import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Separator } from "../separator";
import { describe, it, expect } from "vitest";
import React from "react";

describe("Separator Accessibility", () => {
  it("should not have any axe violations in default state", async () => {
    const { container } = render(<Separator />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations with vertical orientation", async () => {
    const { container } = render(<Separator orientation="vertical" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations with different variants", async () => {
    const { container } = render(<Separator variant="muted" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations when used as separator", async () => {
    const { container } = render(<Separator decorative={false} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should have proper role when decorative", () => {
    render(<Separator />);
    const separator = screen.getByRole("none");
    expect(separator).toHaveAttribute("role", "none");
  });

  it("should have proper role when not decorative", () => {
    render(<Separator decorative={false} />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("role", "separator");
  });

  it("should have proper aria-orientation", () => {
    const { rerender } = render(<Separator orientation="horizontal" />);
    expect(screen.getByRole("none")).toHaveAttribute("aria-orientation", "horizontal");

    rerender(<Separator orientation="vertical" />);
    expect(screen.getByRole("none")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("should be properly styled for visual separation", () => {
    render(<Separator />);
    const separator = screen.getByRole("none");
    expect(separator).toHaveClass("bg-border", "shrink-0");
  });

  it("should have proper semantic structure", () => {
    render(<Separator />);
    const separator = screen.getByRole("none");
    expect(separator.tagName).toBe("DIV");
  });

  it("should support different visual variants", () => {
    const { rerender } = render(<Separator variant="default" />);
    expect(screen.getByRole("none")).toHaveClass("bg-border");

    rerender(<Separator variant="muted" />);
    expect(screen.getByRole("none")).toHaveClass("bg-muted");

    rerender(<Separator variant="subtle" />);
    expect(screen.getByRole("none")).toHaveClass("bg-muted/50");
  });

  it("should have proper color contrast", async () => {
    const { container } = render(<Separator />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should be accessible to screen readers when decorative", () => {
    render(<Separator />);
    const separator = screen.getByRole("none");
    // Decorative separators should not be announced by screen readers
    expect(separator).toHaveAttribute("role", "none");
  });

  it("should be accessible to screen readers when not decorative", () => {
    render(<Separator decorative={false} />);
    const separator = screen.getByRole("separator");
    // Non-decorative separators should be announced by screen readers
    expect(separator).toHaveAttribute("role", "separator");
  });

  it("should handle orientation changes correctly", () => {
    const { rerender } = render(<Separator orientation="horizontal" />);
    let separator = screen.getByRole("none");
    expect(separator).toHaveClass("h-[1px]", "w-full");

    rerender(<Separator orientation="vertical" />);
    separator = screen.getByRole("none");
    expect(separator).toHaveClass("h-full", "w-[1px]");
  });

  it("should work in different contexts", async () => {
    const { container } = render(
      <div>
        <div>Content above</div>
        <Separator />
        <div>Content below</div>
      </div>
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should work with multiple separators", async () => {
    const { container } = render(
      <div>
        <Separator orientation="horizontal" />
        <Separator orientation="vertical" />
        <Separator decorative={false} />
      </div>
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
