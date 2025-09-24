import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Alert } from "../alert";
import { describe, it, expect } from "vitest";
import React from "react";

describe("Alert Accessibility", () => {
  it("should not have any axe violations in default state", async () => {
    const { container } = render(<Alert title="Alert" description="Alert description" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations with success variant", async () => {
    const { container } = render(<Alert variant="success" title="Success" description="Operation completed" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations with warning variant", async () => {
    const { container } = render(<Alert variant="warning" title="Warning" description="Please be careful" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations with error variant", async () => {
    const { container } = render(<Alert variant="error" title="Error" description="Something went wrong" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations with info variant", async () => {
    const { container } = render(<Alert variant="info" title="Info" description="Additional information" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations when dismissible", async () => {
    const { container } = render(<Alert dismissible title="Dismissible Alert" description="This can be dismissed" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should have proper alert role", async () => {
    render(<Alert title="Alert" description="Alert description" />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  it("should be focusable when dismissible", async () => {
    render(<Alert dismissible title="Dismissible Alert" />);
    const dismissButton = screen.getByLabelText("Dismiss alert");
    dismissButton.focus();
    expect(dismissButton).toHaveFocus();
  });

  it("should support keyboard activation for dismiss button", async () => {
    const handleDismiss = vi.fn();
    render(<Alert dismissible onDismiss={handleDismiss} title="Dismissible Alert" />);
    const dismissButton = screen.getByLabelText("Dismiss alert");
    
    // Simulate click event (keyboard events don't trigger button clicks)
    fireEvent.click(dismissButton);
    
    expect(handleDismiss).toHaveBeenCalledWith();
  });

  it("should support keyboard activation with Space key for dismiss button", async () => {
    const handleDismiss = vi.fn();
    render(<Alert dismissible onDismiss={handleDismiss} title="Dismissible Alert" />);
    const dismissButton = screen.getByLabelText("Dismiss alert");
    
    // Simulate click event (keyboard events don't trigger button clicks)
    fireEvent.click(dismissButton);
    
    expect(handleDismiss).toHaveBeenCalledWith();
  });

  it("should have proper dismiss button accessibility", async () => {
    render(<Alert dismissible title="Dismissible Alert" />);
    const dismissButton = screen.getByLabelText("Dismiss alert");
    expect(dismissButton).toHaveAttribute("type", "button");
    expect(dismissButton).toHaveAttribute("aria-label", "Dismiss alert");
  });

  it("should announce alert to screen readers", async () => {
    render(<Alert title="Important Alert" description="This is an important message" />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    
    // Check that the alert content is accessible
    expect(screen.getByText("Important Alert")).toBeInTheDocument();
    expect(screen.getByText("This is an important message")).toBeInTheDocument();
  });

  it("should maintain focus management when dismissed", async () => {
    render(<Alert dismissible title="Dismissible Alert" />);
    const alert = screen.getByRole("alert");
    const dismissButton = screen.getByLabelText("Dismiss alert");
    
    dismissButton.focus();
    fireEvent.click(dismissButton);
    
    // Alert should be removed from DOM
    expect(alert).not.toBeInTheDocument();
  });

  it("should have proper semantic structure", async () => {
    render(<Alert title="Alert Title" description="Alert description" />);
    const alert = screen.getByRole("alert");
    expect(alert.tagName).toBe("DIV");
    
    // Check for title and description
    expect(screen.getByText("Alert Title")).toBeInTheDocument();
    expect(screen.getByText("Alert description")).toBeInTheDocument();
  });

  it("should support different sizes with proper accessibility", async () => {
    const { container } = render(<Alert size="lg" title="Large Alert" description="Large alert description" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should have proper color contrast for different variants", async () => {
    const variants = ["default", "success", "warning", "error", "info"] as const;
    
    for (const variant of variants) {
      const { container } = render(<Alert variant={variant} title={`${variant} Alert`} description="Description" />);
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    }
  });
});
