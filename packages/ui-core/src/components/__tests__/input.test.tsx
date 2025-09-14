import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { Input } from '../input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('flex', 'h-10', 'w-full', 'rounded-md');
  });

  it('renders with label', () => {
    render(<Input label="Username" placeholder="Enter username" />);
    const label = screen.getByText('Username');
    const input = screen.getByPlaceholderText('Enter username');
    
    expect(label).toBeInTheDocument();
    expect(input).toHaveAttribute('id');
    expect(label).toHaveAttribute('for', input.id);
  });

  it('renders with helper text', () => {
    render(<Input helperText="This is helpful" placeholder="Enter text" />);
    const helperText = screen.getByText('This is helpful');
    const input = screen.getByPlaceholderText('Enter text');
    
    expect(helperText).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('renders in error state', () => {
    render(<Input error helperText="This is an error" placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    const helperText = screen.getByText('This is an error');
    
    expect(input).toHaveClass('border-destructive');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(helperText).toHaveClass('text-destructive');
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    
    await user.type(input, 'Hello World');
    expect(input).toHaveValue('Hello World');
  });

  it('handles different input types', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" placeholder="Password" />);
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');

    rerender(<Input type="number" placeholder="Number" />);
    expect(screen.getByPlaceholderText('Number')).toHaveAttribute('type', 'number');
  });

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText('Disabled input');
    
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Custom" />);
    const input = screen.getByPlaceholderText('Custom');
    expect(input).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Input ref={ref} placeholder="Ref test" />);
    expect(ref).toHaveBeenCalled();
  });

  it('generates unique IDs for accessibility', () => {
    render(
      <div>
        <Input label="First" helperText="First helper" />
        <Input label="Second" helperText="Second helper" />
      </div>
    );
    
    const firstInput = screen.getByLabelText('First');
    const secondInput = screen.getByLabelText('Second');
    
    expect(firstInput.id).not.toBe(secondInput.id);
    expect(firstInput.getAttribute('aria-describedby')).not.toBe(
      secondInput.getAttribute('aria-describedby')
    );
  });

  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    
    render(<Input onFocus={onFocus} onBlur={onBlur} placeholder="Focus test" />);
    const input = screen.getByPlaceholderText('Focus test');
    
    await user.click(input);
    expect(onFocus).toHaveBeenCalled();
    
    await user.tab();
    expect(onBlur).toHaveBeenCalled();
  });

  it('supports controlled and uncontrolled modes', async () => {
    const user = userEvent.setup();
    
    // Uncontrolled
    render(<Input defaultValue="initial" placeholder="Uncontrolled" />);
    const uncontrolledInput = screen.getByPlaceholderText('Uncontrolled');
    expect(uncontrolledInput).toHaveValue('initial');
    
    await user.clear(uncontrolledInput);
    await user.type(uncontrolledInput, 'new value');
    expect(uncontrolledInput).toHaveValue('new value');
    
    // Controlled
    const ControlledInput = () => {
      const [value, setValue] = React.useState('controlled');
      return (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Controlled"
        />
      );
    };
    
    render(<ControlledInput />);
    const controlledInput = screen.getByPlaceholderText('Controlled');
    expect(controlledInput).toHaveValue('controlled');
    
    await user.clear(controlledInput);
    await user.type(controlledInput, 'updated');
    expect(controlledInput).toHaveValue('updated');
  });
});
