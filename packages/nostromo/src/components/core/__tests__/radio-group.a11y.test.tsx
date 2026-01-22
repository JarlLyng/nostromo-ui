import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { axe, toHaveNoViolations } from "jest-axe";
import { RadioGroup, RadioItem } from "../radio-group";

expect.extend(toHaveNoViolations);

describe("RadioGroup Accessibility", () => {
  it("should not have accessibility violations", async () => {
    const { container } = render(
      <RadioGroup label="Choose an option">
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not have accessibility violations with error state", async () => {
    const { container } = render(
      <RadioGroup 
        label="Choose an option" 
        error 
        helperText="This field is required" 
      >
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not have accessibility violations when disabled", async () => {
    const { container } = render(
      <RadioGroup 
        label="Disabled radio group" 
        disabled 
      >
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not have accessibility violations with helper text", async () => {
    const { container } = render(
      <RadioGroup 
        label="Choose an option" 
        helperText="Select one option from the list" 
      >
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should not have accessibility violations when required", async () => {
    const { container } = render(
      <RadioGroup 
        label="Required selection" 
        required 
      >
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should have proper ARIA attributes", () => {
    render(
      <RadioGroup 
        label="Choose an option" 
        error 
        helperText="Error message" 
      >
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toHaveAttribute("aria-invalid", "true");
    expect(radioGroup).toHaveAttribute("aria-describedby");
    expect(radioGroup).toHaveAttribute("aria-labelledby");
  });

  it("should have proper label association", () => {
    render(
      <RadioGroup label="Choose an option">
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole("radiogroup");
    const label = screen.getByText("Choose an option");
    
    expect(radioGroup).toHaveAttribute("aria-labelledby");
    expect(label).toHaveAttribute("id");
  });

  it("should be focusable with keyboard", () => {
    render(
      <RadioGroup label="Choose an option">
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const radioItems = screen.getAllByRole("radio");
    radioItems.forEach(radio => {
      radio.focus();
      expect(radio).toHaveFocus();
    });
  });

  it("should not be focusable when disabled", () => {
    render(
      <RadioGroup label="Disabled radio group" disabled>
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const radioItems = screen.getAllByRole("radio");
    radioItems.forEach(radio => {
      expect(radio).toBeDisabled();
    });
  });

  it("should support keyboard navigation between radio items", () => {
    render(
      <RadioGroup label="Choose an option">
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
        <RadioItem value="option3" label="Option 3" />
      </RadioGroup>
    );
    
    const radioItems = screen.getAllByRole("radio");
    
    // First radio should be focusable
    radioItems[0].focus();
    expect(radioItems[0]).toHaveFocus();
    
    // All radios should be focusable
    radioItems.forEach(radio => {
      radio.focus();
      expect(radio).toHaveFocus();
    });
  });

  it("should have proper radio group semantics", () => {
    render(
      <RadioGroup label="Choose an option">
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    );
    
    const radioGroup = screen.getByRole("radiogroup");
    const radioItems = screen.getAllByRole("radio");
    
    expect(radioGroup).toBeInTheDocument();
    expect(radioItems).toHaveLength(2);
    
    // All radio items should have the same name attribute
    const names = radioItems.map(radio => radio.getAttribute("name"));
    expect(names.every(name => name === names[0])).toBe(true);
  });
});
