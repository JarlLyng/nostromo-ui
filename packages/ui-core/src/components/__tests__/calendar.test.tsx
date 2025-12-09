import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Calendar } from '../calendar';

describe('Calendar', () => {
  it('renders calendar button', () => {
    render(<Calendar />);
    
    const button = screen.getByRole('button', { name: /open calendar|select date/i });
    expect(button).toBeInTheDocument();
  });

  it('opens calendar popover when button is clicked', async () => {
    render(<Calendar />);
    
    const button = screen.getByRole('button', { name: /open calendar|select date/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /previous month/i })).toBeInTheDocument();
    });
  });

  it('displays current month and year', async () => {
    render(<Calendar />);
    
    const button = screen.getByRole('button', { name: /open calendar|select date/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      const today = new Date();
      const monthYear = today.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      });
      expect(screen.getByText(monthYear)).toBeInTheDocument();
    });
  });

  it('selects a date in single mode', async () => {
    const onChange = vi.fn();
    render(<Calendar mode="single" onChange={onChange} />);
    
    const button = screen.getByRole('button', { name: /open calendar|select date/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      // Find today's date button
      const today = new Date();
      const todayLabel = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const todayButton = screen.getByLabelText(todayLabel);
      fireEvent.click(todayButton);
    });
    
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('selects date range in range mode', async () => {
    const onChange = vi.fn();
    render(<Calendar mode="range" onChange={onChange} />);
    
    const button = screen.getByRole('button', { name: /open calendar|select date/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      const today = new Date();
      const todayLabel = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const todayButton = screen.getByLabelText(todayLabel);
      fireEvent.click(todayButton);
    });
    
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ from: expect.any(Date) })
      );
    });
  });

  it('selects multiple dates in multiple mode', async () => {
    const onChange = vi.fn();
    render(<Calendar mode="multiple" onChange={onChange} />);
    
    const button = screen.getByRole('button', { name: /open calendar|select date/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      const today = new Date();
      const todayLabel = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const todayButton = screen.getByLabelText(todayLabel);
      fireEvent.click(todayButton);
    });
    
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(expect.arrayContaining([expect.any(Date)]));
    });
  });

  it('navigates to previous month', async () => {
    render(<Calendar />);
    
    const button = screen.getByRole('button', { name: /open calendar|select date/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      const prevButton = screen.getByRole('button', { name: /previous month/i });
      fireEvent.click(prevButton);
    });
    
    // Month should have changed
    await waitFor(() => {
      const prevMonth = new Date();
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      const monthYear = prevMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      });
      expect(screen.getByText(monthYear)).toBeInTheDocument();
    });
  });

  it('navigates to next month', async () => {
    render(<Calendar />);
    
    const button = screen.getByRole('button', { name: /open calendar|select date/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      const nextButton = screen.getByRole('button', { name: /next month/i });
      fireEvent.click(nextButton);
    });
    
    // Month should have changed
    await waitFor(() => {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const monthYear = nextMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      });
      expect(screen.getByText(monthYear)).toBeInTheDocument();
    });
  });

  it('navigates to today when Today button is clicked', async () => {
    render(<Calendar />);
    
    const button = screen.getByRole('button', { name: /open calendar|select date/i });
    fireEvent.click(button);
    
    // Navigate away from current month
    await waitFor(() => {
      const nextButton = screen.getByRole('button', { name: /next month/i });
      fireEvent.click(nextButton);
    });
    
    // Click Today button
    await waitFor(() => {
      const todayButton = screen.getByText('Today');
      fireEvent.click(todayButton);
    });
    
    // Should be back to current month
    await waitFor(() => {
      const today = new Date();
      const monthYear = today.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      });
      expect(screen.getByText(monthYear)).toBeInTheDocument();
    });
  });

  it('disables dates before minDate', async () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 5); // 5 days from now
    
    render(<Calendar minDate={minDate} />);
    
    const button = screen.getByRole('button', { name: /open calendar|select date/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      const today = new Date();
      const todayLabel = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const todayButton = screen.getByLabelText(todayLabel);
      expect(todayButton).toBeDisabled();
    });
  });

  it('disables dates after maxDate', async () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 5); // 5 days ago
    
    render(<Calendar maxDate={maxDate} />);
    
    const button = screen.getByRole('button', { name: /open calendar|select date/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      const today = new Date();
      const todayLabel = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const todayButton = screen.getByLabelText(todayLabel);
      expect(todayButton).toBeDisabled();
    });
  });

  it('displays custom placeholder', () => {
    render(<Calendar placeholder="Choose a date" />);
    
    expect(screen.getByText('Choose a date')).toBeInTheDocument();
  });

  it('displays label when provided', () => {
    render(<Calendar label="Birth Date" />);
    
    expect(screen.getByText('Birth Date')).toBeInTheDocument();
  });

  it('displays helper text when provided', () => {
    render(<Calendar helperText="Select your birth date" />);
    
    expect(screen.getByText('Select your birth date')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(<Calendar error={true} helperText="Date is required" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-invalid', 'true');
  });
});

