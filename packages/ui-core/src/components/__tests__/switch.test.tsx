import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Switch } from "../switch";
import { describe, it, expect, vi } from "vitest";
import React from "react";

describe("Switch", () => {
  it("renders without crashing", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders with a label", () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByLabelText("Enable notifications")).toBeInTheDocument();
  });

  it("renders with helper text", () => {
    render(<Switch helperText="This is helper text" />);
    expect(screen.getByText("This is helper text")).toBeInTheDocument();
  });

  it("renders with error state", () => {
    render(<Switch error helperText="This is an error" />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("This is an error")).toHaveClass("text-destructive");
  });

  it("renders as checked when defaultChecked is true", () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("renders as checked when controlled with checked prop", () => {
    render(<Switch checked readOnly />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("calls onChange when clicked", async () => {
    const handleChange = vi.fn();
    render(<Switch onCheckedChange={handleChange} />);
    const switchElement = screen.getByRole("switch");
    fireEvent.click(switchElement);
    await waitFor(() => expect(handleChange).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(handleChange).toHaveBeenCalledWith(true));
  });

  it("does not call onChange when disabled and clicked", () => {
    const handleChange = vi.fn();
    render(<Switch onCheckedChange={handleChange} disabled />);
    const switchElement = screen.getByRole("switch");
    fireEvent.click(switchElement);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders as disabled", () => {
    render(<Switch disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("associates label with switch using htmlFor and id", () => {
    render(<Switch label="My Switch" id="my-switch" />);
    const switchElement = screen.getByRole("switch");
    const label = screen.getByText("My Switch");
    expect(label).toHaveAttribute("for", "my-switch");
    expect(switchElement).toHaveAttribute("id", "my-switch");
  });

  it("applies custom className", () => {
    render(<Switch className="custom-class" />);
    expect(screen.getByRole("switch")).toHaveClass("custom-class");
  });

  it("renders required indicator when required prop is true", () => {
    render(<Switch label="Agree" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not render required indicator when required prop is false", () => {
    render(<Switch label="Agree" />);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("applies correct variant styling based on prop", () => {
    const { rerender } = render(<Switch variant="default" />);
    expect(screen.getByRole("switch")).toHaveClass("data-[state=checked]:bg-primary");

    rerender(<Switch variant="error" />);
    expect(screen.getByRole("switch")).toHaveClass("data-[state=checked]:bg-destructive");

    rerender(<Switch variant="success" />);
    expect(screen.getByRole("switch")).toHaveClass("data-[state=checked]:bg-success");
  });

  it("applies correct size styling based on prop", () => {
    const { rerender } = render(<Switch size="sm" />);
    expect(screen.getByRole("switch")).toHaveClass("h-4 w-7");

    rerender(<Switch size="default" />);
    expect(screen.getByRole("switch")).toHaveClass("h-6 w-11");

    rerender(<Switch size="lg" />);
    expect(screen.getByRole("switch")).toHaveClass("h-8 w-14");
  });

  it("handles controlled state correctly", () => {
    const { rerender } = render(<Switch checked={false} onCheckedChange={vi.fn()} />);
    expect(screen.getByRole("switch")).not.toBeChecked();

    rerender(<Switch checked={true} onCheckedChange={vi.fn()} />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("handles uncontrolled state correctly", () => {
    render(<Switch defaultChecked={true} />);
    expect(screen.getByRole("switch")).toBeChecked();
  });
});
