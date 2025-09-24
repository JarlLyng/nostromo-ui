import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "../checkbox";

describe("Checkbox", () => {
  it("renders a checkbox input", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("type", "checkbox");
  });

  it("renders with a label", () => {
    render(<Checkbox label="Test checkbox" />);
    expect(screen.getByText("Test checkbox")).toBeInTheDocument();
    expect(screen.getByLabelText("Test checkbox")).toBeInTheDocument();
  });

  it("renders with helper text", () => {
    render(<Checkbox helperText="This is helper text" />);
    expect(screen.getByText("This is helper text")).toBeInTheDocument();
  });

  it("shows required indicator when required", () => {
    render(<Checkbox label="Required checkbox" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("applies error styling when error is true", () => {
    render(<Checkbox error />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("border-error-500");
  });

  it("applies success styling when variant is success", () => {
    render(<Checkbox variant="success" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("border-success-500");
  });

  it("applies size variants correctly", () => {
    const { rerender } = render(<Checkbox size="sm" />);
    let checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("h-3", "w-3");

    rerender(<Checkbox size="lg" />);
    checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("h-5", "w-5");
  });

  it("handles checked state", () => {
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("handles disabled state", () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("calls onChange when clicked", () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Checkbox ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<Checkbox className="custom-class" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("custom-class");
  });

  it("has proper accessibility attributes", () => {
    render(<Checkbox error helperText="Error message" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAttribute("aria-describedby");
  });

  it("generates unique id when not provided", () => {
    render(<Checkbox label="Test" />);
    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Test");
    expect(checkbox).toHaveAttribute("id");
    expect(label).toHaveAttribute("for", checkbox.getAttribute("id"));
  });

  it("uses provided id", () => {
    render(<Checkbox id="custom-id" label="Test" />);
    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Test");
    expect(checkbox).toHaveAttribute("id", "custom-id");
    expect(label).toHaveAttribute("for", "custom-id");
  });
});
