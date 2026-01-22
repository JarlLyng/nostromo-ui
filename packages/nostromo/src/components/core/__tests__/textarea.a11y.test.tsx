import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { Textarea } from "../textarea";
import { describe, it, expect } from "vitest";
import React from "react";

describe("Textarea Accessibility", () => {
  it("should not have any axe violations in default state", async () => {
    const { container } = render(<Textarea label="Message" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations with placeholder", async () => {
    const { container } = render(<Textarea label="Message" placeholder="Enter your message" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations in disabled state", async () => {
    const { container } = render(<Textarea label="Message" disabled />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations in error state", async () => {
    const { container } = render(
      <Textarea label="Message" error helperText="Required" />
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should have aria-invalid when in error state", async () => {
    render(<Textarea label="Message" error helperText="Required" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });

  it("should link helper text via aria-describedby", async () => {
    render(<Textarea label="Message" helperText="Some help text" />);
    const textarea = screen.getByRole("textbox");
    const helperText = screen.getByText("Some help text");
    expect(textarea).toHaveAttribute("aria-describedby", helperText.id);
  });

  it("should link error text via aria-describedby when in error state", async () => {
    render(<Textarea label="Message" error helperText="Error message" />);
    const textarea = screen.getByRole("textbox");
    const errorMessage = screen.getByText("Error message");
    expect(textarea).toHaveAttribute("aria-describedby");
    expect(textarea.getAttribute("aria-describedby")).toContain(errorMessage.id);
  });

  it("should have aria-required when required prop is true", async () => {
    render(<Textarea label="Message" required />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("aria-required", "true");
  });

  it("should not have aria-required when required prop is false", async () => {
    render(<Textarea label="Message" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).not.toHaveAttribute("aria-required");
  });

  it("should be focusable with keyboard", async () => {
    render(<Textarea label="Message" />);
    const textarea = screen.getByRole("textbox");
    textarea.focus();
    expect(textarea).toHaveFocus();
  });

  it("should not be focusable when disabled", async () => {
    render(<Textarea label="Message" disabled />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
  });

  it("should support keyboard navigation", async () => {
    render(<Textarea label="Message" />);
    const textarea = screen.getByRole("textbox");
    
    // Tab to focus
    textarea.focus();
    expect(textarea).toHaveFocus();
    
    // Type text
    fireEvent.change(textarea, { target: { value: "Test input" } });
    expect(textarea).toHaveValue("Test input");
  });

  it("should have proper textarea semantics", async () => {
    render(<Textarea label="Message" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("should support multiline text input", async () => {
    render(<Textarea label="Message" />);
    const textarea = screen.getByRole("textbox");
    
    const multilineText = "Line 1\nLine 2\nLine 3";
    fireEvent.change(textarea, { target: { value: multilineText } });
    expect(textarea).toHaveValue(multilineText);
  });

  it("should have proper label association", async () => {
    render(<Textarea label="Message" id="message-textarea" />);
    const textarea = screen.getByRole("textbox");
    const label = screen.getByText("Message");
    
    expect(textarea).toHaveAttribute("id", "message-textarea");
    expect(label).toHaveAttribute("for", "message-textarea");
  });
});
