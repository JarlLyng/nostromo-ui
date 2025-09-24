import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RadioGroup, RadioItem } from "../radio-group";

describe("RadioGroup", () => {
  it("renders a radio group", () => {
    render(
      <RadioGroup>
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toBeInTheDocument();
  });

  it("renders with a label", () => {
    render(
      <RadioGroup label="Choose an option">
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.getByText("Choose an option")).toBeInTheDocument();
  });

  it("renders with helper text", () => {
    render(
      <RadioGroup helperText="Select one option">
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.getByText("Select one option")).toBeInTheDocument();
  });

  it("shows required indicator when required", () => {
    render(
      <RadioGroup label="Required selection" required>
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("applies error styling when error is true", () => {
    render(
      <RadioGroup error>
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const radioItems = screen.getAllByRole("radio");
    radioItems.forEach(radio => {
      expect(radio).toHaveClass("border-error-500");
    });
  });

  it("applies success styling when variant is success", () => {
    render(
      <RadioGroup>
        <RadioItem value="option1" label="Option 1" variant="success" />
        <RadioItem value="option2" label="Option 2" variant="success" />
      </RadioGroup>
    );
    
    const radioItems = screen.getAllByRole("radio");
    radioItems.forEach(radio => {
      expect(radio).toHaveClass("border-success-500");
    });
  });

  it("applies size variants correctly", () => {
    const { rerender } = render(
      <RadioGroup>
        <RadioItem value="option1" label="Option 1" size="sm" />
        <RadioItem value="option2" label="Option 2" size="sm" />
      </RadioGroup>
    );
    
    let radioItems = screen.getAllByRole("radio");
    radioItems.forEach(radio => {
      expect(radio).toHaveClass("h-3", "w-3");
    });

    rerender(
      <RadioGroup>
        <RadioItem value="option1" label="Option 1" size="lg" />
        <RadioItem value="option2" label="Option 2" size="lg" />
      </RadioGroup>
    );
    
    radioItems = screen.getAllByRole("radio");
    radioItems.forEach(radio => {
      expect(radio).toHaveClass("h-5", "w-5");
    });
  });

  it("handles checked state", () => {
    render(
      <RadioGroup defaultValue="option1">
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const firstRadio = screen.getByLabelText("Option 1");
    expect(firstRadio).toBeChecked();
  });

  it("handles disabled state", () => {
    render(
      <RadioGroup disabled>
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const radioItems = screen.getAllByRole("radio");
    radioItems.forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });

  it("calls onChange when clicked", () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup onValueChange={handleChange}>
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const firstRadio = screen.getByLabelText("Option 1");
    fireEvent.click(firstRadio);
    expect(handleChange).toHaveBeenCalledWith("option1");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(
      <RadioGroup ref={ref}>
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    expect(ref).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(
      <RadioGroup className="custom-class">
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toHaveClass("custom-class");
  });

  it("has proper accessibility attributes", () => {
    render(
      <RadioGroup error helperText="Error message" label="Test group">
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toHaveAttribute("aria-invalid", "true");
    expect(radioGroup).toHaveAttribute("aria-describedby");
  });

  it("supports horizontal orientation", () => {
    render(
      <RadioGroup orientation="horizontal">
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
        <RadioItem value="option3" label="Option 3" />
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toHaveClass("grid-cols-2");
  });

  it("supports vertical orientation", () => {
    render(
      <RadioGroup orientation="vertical">
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toHaveClass("grid-cols-1");
  });
});

describe("RadioItem", () => {
  it("renders a radio input", () => {
    render(<RadioItem value="option1" label="Option 1" />);
    
    const radio = screen.getByRole("radio");
    expect(radio).toBeInTheDocument();
    expect(radio).toHaveAttribute("type", "radio");
    expect(radio).toHaveAttribute("value", "option1");
  });

  it("renders with a label", () => {
    render(<RadioItem value="option1" label="Option 1" />);
    
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
  });

  it("handles disabled state", () => {
    render(<RadioItem value="option1" label="Option 1" disabled />);
    
    const radio = screen.getByRole("radio");
    expect(radio).toBeDisabled();
  });

  it("applies size variants correctly", () => {
    const { rerender } = render(<RadioItem value="option1" label="Option 1" size="sm" />);
    
    let radio = screen.getByRole("radio");
    expect(radio).toHaveClass("h-3", "w-3");

    rerender(<RadioItem value="option1" label="Option 1" size="lg" />);
    radio = screen.getByRole("radio");
    expect(radio).toHaveClass("h-5", "w-5");
  });

  it("applies variant styling correctly", () => {
    const { rerender } = render(<RadioItem value="option1" label="Option 1" variant="error" />);
    
    let radio = screen.getByRole("radio");
    expect(radio).toHaveClass("border-error-500");

    rerender(<RadioItem value="option1" label="Option 1" variant="success" />);
    radio = screen.getByRole("radio");
    expect(radio).toHaveClass("border-success-500");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<RadioItem value="option1" label="Option 1" ref={ref} />);
    
    expect(ref).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<RadioItem value="option1" label="Option 1" className="custom-class" />);
    
    const radio = screen.getByRole("radio");
    expect(radio).toHaveClass("custom-class");
  });
});
