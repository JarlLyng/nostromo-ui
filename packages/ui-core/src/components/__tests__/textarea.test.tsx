import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Textarea } from "../textarea";
import { describe, it, expect, vi } from "vitest";
import React from "react";

describe("Textarea", () => {
  it("renders without crashing", () => {
    render(<Textarea />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders with a label", () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders with helper text", () => {
    render(<Textarea helperText="This is helper text" />);
    expect(screen.getByText("This is helper text")).toBeInTheDocument();
  });

  it("renders with error state", () => {
    render(<Textarea error helperText="This is an error" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("This is an error")).toHaveClass("text-destructive");
  });

  it("renders with placeholder", () => {
    render(<Textarea placeholder="Enter your message" />);
    expect(screen.getByPlaceholderText("Enter your message")).toBeInTheDocument();
  });

  it("renders with default value", () => {
    render(<Textarea defaultValue="Default text" />);
    expect(screen.getByDisplayValue("Default text")).toBeInTheDocument();
  });

  it("renders with controlled value", () => {
    render(<Textarea value="Controlled text" readOnly />);
    expect(screen.getByDisplayValue("Controlled text")).toBeInTheDocument();
  });

  it("calls onChange when text changes", async () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "New text" } });
    await waitFor(() => expect(handleChange).toHaveBeenCalledTimes(1));
  });

  it("calls onInput when text is typed", async () => {
    const handleInput = vi.fn();
    render(<Textarea onInput={handleInput} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.input(textarea, { target: { value: "Typed text" } });
    await waitFor(() => expect(handleInput).toHaveBeenCalledTimes(1));
  });

  it("renders as disabled", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("associates label with textarea using htmlFor and id", () => {
    render(<Textarea label="My Textarea" id="my-textarea" />);
    const textarea = screen.getByRole("textbox");
    const label = screen.getByText("My Textarea");
    expect(label).toHaveAttribute("for", "my-textarea");
    expect(textarea).toHaveAttribute("id", "my-textarea");
  });

  it("applies custom className", () => {
    render(<Textarea className="custom-class" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom-class");
  });

  it("renders required indicator when required prop is true", () => {
    render(<Textarea label="Message" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not render required indicator when required prop is false", () => {
    render(<Textarea label="Message" />);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("applies correct variant styling based on prop", () => {
    const { rerender } = render(<Textarea variant="default" />);
    expect(screen.getByRole("textbox")).toHaveClass("border-border");

    rerender(<Textarea variant="error" />);
    expect(screen.getByRole("textbox")).toHaveClass("border-destructive");

    rerender(<Textarea variant="success" />);
    expect(screen.getByRole("textbox")).toHaveClass("border-success");
  });

  it("applies correct size styling based on prop", () => {
    const { rerender } = render(<Textarea size="sm" />);
    expect(screen.getByRole("textbox")).toHaveClass("min-h-[60px]");

    rerender(<Textarea size="default" />);
    expect(screen.getByRole("textbox")).toHaveClass("min-h-[80px]");

    rerender(<Textarea size="lg" />);
    expect(screen.getByRole("textbox")).toHaveClass("min-h-[120px]");
  });

  it("handles auto-resize functionality", () => {
    render(<Textarea autoResize />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("resize-none");
  });

  it("disables auto-resize when autoResize is false", () => {
    render(<Textarea autoResize={false} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).not.toHaveClass("resize-none");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("handles controlled state correctly", () => {
    const { rerender } = render(<Textarea value="Initial" onChange={vi.fn()} />);
    expect(screen.getByDisplayValue("Initial")).toBeInTheDocument();

    rerender(<Textarea value="Updated" onChange={vi.fn()} />);
    expect(screen.getByDisplayValue("Updated")).toBeInTheDocument();
  });

  it("handles uncontrolled state correctly", () => {
    render(<Textarea defaultValue="Default" />);
    expect(screen.getByDisplayValue("Default")).toBeInTheDocument();
  });
});
