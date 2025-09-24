import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { axe, toHaveNoViolations } from "jest-axe";
import { Checkbox } from "../checkbox";

expect.extend(toHaveNoViolations);

describe("Checkbox Accessibility", () => {
  it("should not have accessibility violations", async () => {
    const { container } = render(<Checkbox label="Test checkbox" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not have accessibility violations with error state", async () => {
    const { container } = render(
      <Checkbox 
        label="Test checkbox" 
        error 
        helperText="This field is required" 
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not have accessibility violations when disabled", async () => {
    const { container } = render(
      <Checkbox 
        label="Disabled checkbox" 
        disabled 
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not have accessibility violations with helper text", async () => {
    const { container } = render(
      <Checkbox 
        label="Test checkbox" 
        helperText="Additional information" 
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not have accessibility violations when required", async () => {
    const { container } = render(
      <Checkbox 
        label="Required checkbox" 
        required 
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should have proper ARIA attributes", () => {
    render(
      <Checkbox 
        label="Test checkbox" 
        error 
        helperText="Error message" 
      />
    );
    
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAttribute("aria-describedby");
  });

  it("should have proper label association", () => {
    render(<Checkbox label="Test checkbox" />);
    
    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Test checkbox");
    
    expect(checkbox).toHaveAttribute("id");
    expect(label).toHaveAttribute("for", checkbox.getAttribute("id"));
  });

  it("should be focusable with keyboard", () => {
    render(<Checkbox label="Test checkbox" />);
    
    const checkbox = screen.getByRole("checkbox");
    checkbox.focus();
    expect(checkbox).toHaveFocus();
  });

  it("should not be focusable when disabled", () => {
    render(<Checkbox label="Disabled checkbox" disabled />);
    
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });
});
