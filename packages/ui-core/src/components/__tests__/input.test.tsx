import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('h-10', 'px-3', 'py-2', 'text-sm');
  });

  it('renders with custom className', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('renders with label', () => {
    render(<Input label="Email Address" />);
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<Input helperText="Enter your email address" />);
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders with success message', () => {
    render(<Input success="Email is valid" />);
    expect(screen.getByText('Email is valid')).toBeInTheDocument();
  });

  it('prioritizes error over success message', () => {
    render(<Input error="Error message" success="Success message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Success message')).not.toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Input variant="default" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-neutral-300');

    rerender(<Input variant="error" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-error-500');

    rerender(<Input variant="success" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-success-500');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Input size="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-8', 'px-2', 'text-xs');

    rerender(<Input size="md" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-10', 'px-3', 'py-2', 'text-sm');

    rerender(<Input size="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-12', 'px-4', 'py-3', 'text-base');
  });

  it('handles input events', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'test input');
    expect(handleChange).toHaveBeenCalled();
  });

  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    const input = screen.getByRole('textbox');
    
    await user.click(input);
    expect(handleFocus).toHaveBeenCalled();
    
    await user.tab();
    expect(handleBlur).toHaveBeenCalled();
  });

  it('supports different input types', () => {
    const { rerender } = render(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" />);
    expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password');

    rerender(<Input type="number" />);
    expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'number');
  });

  it('supports disabled state', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
  });

  it('supports required attribute', () => {
    render(<Input required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  it('supports placeholder', () => {
    render(<Input placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('supports value and defaultValue', () => {
    const { rerender } = render(<Input value="test value" readOnly />);
    expect(screen.getByRole('textbox')).toHaveValue('test value');

    rerender(<Input defaultValue="default value" key="new" />);
    expect(screen.getByRole('textbox')).toHaveValue('default value');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('generates unique IDs for accessibility', () => {
    render(
      <>
        <Input label="First input" error="First error" />
        <Input label="Second input" error="Second error" />
      </>
    );
    
    const firstInput = screen.getByLabelText('First input');
    const secondInput = screen.getByLabelText('Second input');
    
    expect(firstInput).toHaveAttribute('id');
    expect(secondInput).toHaveAttribute('id');
    expect(firstInput.getAttribute('id')).not.toBe(secondInput.getAttribute('id'));
  });

  it('associates error message with input via aria-describedby', () => {
    render(<Input error="Error message" />);
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByText('Error message');
    
    expect(input).toHaveAttribute('aria-describedby');
    expect(errorMessage).toHaveAttribute('id');
    expect(input.getAttribute('aria-describedby')).toContain(errorMessage.getAttribute('id'));
  });

  it('associates helper text with input via aria-describedby', () => {
    render(<Input helperText="Helper text" />);
    const input = screen.getByRole('textbox');
    const helperText = screen.getByText('Helper text');
    
    expect(input).toHaveAttribute('aria-describedby');
    expect(helperText).toHaveAttribute('id');
    expect(input.getAttribute('aria-describedby')).toContain(helperText.getAttribute('id'));
  });

  it('associates both error and helper text with input', () => {
    render(<Input error="Error message" helperText="Helper text" />);
    const input = screen.getByRole('textbox');
    const errorMessage = screen.getByText('Error message');
    const helperText = screen.queryByText('Helper text');
    
    // Error should be shown, helper text should be hidden
    expect(input.getAttribute('aria-describedby')).toContain(errorMessage.getAttribute('id'));
    expect(helperText).not.toBeInTheDocument();
  });

  it('applies error variant when error prop is provided', () => {
    render(<Input variant="default" error="Error message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-error-500');
  });

  it('applies success variant when success prop is provided', () => {
    render(<Input variant="default" success="Success message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-success-500');
  });
});
