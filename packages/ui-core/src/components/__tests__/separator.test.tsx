import { render, screen } from "@testing-library/react";
import { Separator } from "../separator";
import { describe, it, expect } from "vitest";
import React from "react";

describe("Separator", () => {
  it("renders without crashing", () => {
    render(<Separator />);
    expect(screen.getByRole("none")).toBeInTheDocument();
  });

  it("renders with horizontal orientation by default", () => {
    render(<Separator decorative={false} />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-orientation", "horizontal");
    expect(separator).toHaveClass("h-[1px]", "w-full");
  });

  it("renders with vertical orientation", () => {
    render(<Separator orientation="vertical" decorative={false} />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
    expect(separator).toHaveClass("h-full", "w-[1px]");
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Separator variant="default" />);
    expect(screen.getByRole("none")).toHaveClass("bg-border");

    rerender(<Separator variant="muted" />);
    expect(screen.getByRole("none")).toHaveClass("bg-muted");

    rerender(<Separator variant="subtle" />);
    expect(screen.getByRole("none")).toHaveClass("bg-muted/50");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Separator size="default" />);
    expect(screen.getByRole("none")).toHaveClass("h-[1px]");

    rerender(<Separator size="sm" />);
    expect(screen.getByRole("none")).toHaveClass("h-px");

    rerender(<Separator size="lg" />);
    expect(screen.getByRole("none")).toHaveClass("h-0.5");
  });

  it("renders as decorative by default", () => {
    render(<Separator />);
    const separator = screen.getByRole("none");
    expect(separator).toHaveAttribute("role", "none");
  });

  it("renders as separator when decorative is false", () => {
    render(<Separator decorative={false} />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveAttribute("role", "separator");
  });

  it("applies custom className", () => {
    render(<Separator className="custom-separator" />);
    const separator = screen.getByRole("none");
    expect(separator).toHaveClass("custom-separator");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Separator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("combines orientation and size classes correctly", () => {
    render(<Separator orientation="vertical" size="lg" decorative={false} />);
    const separator = screen.getByRole("separator");
    expect(separator).toHaveClass("w-[1px]", "h-0.5");
  });

  it("handles all props correctly", () => {
    render(
      <Separator 
        orientation="horizontal" 
        variant="muted" 
        size="sm" 
        decorative={false}
        data-testid="test-separator"
      />
    );
    const separator = screen.getByTestId("test-separator");
    expect(separator).toHaveAttribute("role", "separator");
    expect(separator).toHaveAttribute("aria-orientation", "horizontal");
    expect(separator).toHaveClass("bg-muted", "h-px", "w-full");
  });
});
