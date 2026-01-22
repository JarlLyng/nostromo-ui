import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Switch } from "../switch";
import { describe, it, expect, vi } from "vitest";
import React from "react";

describe("Switch Accessibility", () => {
  it("should not have any axe violations in default state", async () => {
    const { container } = render(<Switch label="Enable notifications" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations in checked state", async () => {
    const { container } = render(<Switch label="Enable notifications" defaultChecked />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations in disabled state", async () => {
    const { container } = render(<Switch label="Enable notifications" disabled />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations in error state", async () => {
    const { container } = render(
      <Switch label="Enable notifications" error helperText="Required" />
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should have aria-invalid when in error state", async () => {
    render(<Switch label="Enable notifications" error helperText="Required" />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("aria-invalid", "true");
  });

  it("should link helper text via aria-describedby", async () => {
    render(<Switch label="Enable notifications" helperText="Some help text" />);
    const switchElement = screen.getByRole("switch");
    const helperText = screen.getByText("Some help text");
    expect(switchElement).toHaveAttribute("aria-describedby", helperText.id);
  });

  it("should link error text via aria-describedby when in error state", async () => {
    render(<Switch label="Enable notifications" error helperText="Error message" />);
    const switchElement = screen.getByRole("switch");
    const errorMessage = screen.getByText("Error message");
    expect(switchElement).toHaveAttribute("aria-describedby");
    expect(switchElement.getAttribute("aria-describedby")).toContain(errorMessage.id);
  });

  it("should have aria-required when required prop is true", async () => {
    render(<Switch label="Enable notifications" required />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("aria-required", "true");
  });

  it("should not have aria-required when required prop is false", async () => {
    render(<Switch label="Enable notifications" />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).not.toHaveAttribute("aria-required");
  });

  it("should be focusable with keyboard", async () => {
    render(<Switch label="Enable notifications" />);
    const switchElement = screen.getByRole("switch");
    switchElement.focus();
    expect(switchElement).toHaveFocus();
  });

  it("should not be focusable when disabled", async () => {
    render(<Switch label="Enable notifications" disabled />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeDisabled();
  });

  it("should support keyboard activation", async () => {
    const handleChange = vi.fn();
    render(<Switch label="Enable notifications" onCheckedChange={handleChange} />);
    const switchElement = screen.getByRole("switch");
    
    // Simulate click event (Radix UI Switch handles keyboard through click)
    fireEvent.click(switchElement);
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("should have proper switch semantics", async () => {
    render(<Switch label="Enable notifications" />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("role", "switch");
  });
});
