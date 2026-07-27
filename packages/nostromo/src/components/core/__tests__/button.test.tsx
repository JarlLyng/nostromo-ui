import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("inline-flex", "items-center", "justify-center");
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toHaveClass("border-2", "border-border");

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button")).toHaveClass("hover:bg-muted");

    rerender(<Button variant="subtle">Subtle</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-muted");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-8", "px-3", "text-xs");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-11", "px-6", "text-base");

    rerender(<Button size="icon">Icon</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-10", "w-10");
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state", () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");

    // Check for loading spinner
    const spinner = button.querySelector("svg");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      "disabled:pointer-events-none",
      "disabled:opacity-50",
    );
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Ref test</Button>);
    expect(ref).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("supports keyboard navigation", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Keyboard</Button>);
    const button = screen.getByRole("button");

    button.focus();
    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);

    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it("has proper accessibility attributes", () => {
    render(<Button aria-label="Custom label">Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Custom label");
  });

  it("renders with different state variants", () => {
    const { rerender } = render(<Button state="success">Success</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-success");

    rerender(<Button state="error">Error</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");

    rerender(<Button state="loading">Loading</Button>);
    expect(screen.getByRole("button")).toHaveClass("cursor-wait");
  });

  it("applies active scale transform", () => {
    render(<Button>Active Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("active:scale-[0.98]");
  });

  describe("asChild", () => {
    it("renders the child element instead of a button", () => {
      render(
        <Button asChild>
          <a href="/getting-started">Initialize Protocol</a>
        </Button>,
      );

      const link = screen.getByRole("link", { name: /initialize protocol/i });
      expect(link).toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("merges button styling onto the child", () => {
      render(
        <Button asChild variant="outline" size="xl" className="custom-class">
          <a href="/components">Explore</a>
        </Button>,
      );

      const link = screen.getByRole("link");
      expect(link).toHaveClass("inline-flex", "border-2", "custom-class");
    });

    it("renders the spinner alongside the child while loading", () => {
      render(
        <Button asChild loading>
          <a href="/components">Explore</a>
        </Button>,
      );

      const link = screen.getByRole("link");
      const spinner = link.querySelector("svg");
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass("animate-spin");
      expect(link).toHaveTextContent("Explore");
    });

    it("prefers loadingText over the child content while loading", () => {
      render(
        <Button asChild loading loadingText="Working…">
          <a href="/components">Explore</a>
        </Button>,
      );

      const link = screen.getByRole("link");
      expect(link).toHaveTextContent("Working…");
      expect(link).not.toHaveTextContent("Explore");
    });
  });
});
