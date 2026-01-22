import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Tooltip, TooltipTrigger, TooltipContent } from '../tooltip';

describe('Tooltip', () => {

  it('renders tooltip with content', () => {
    render(
      <Tooltip content="Test tooltip">
        <button>Hover me</button>
      </Tooltip>
    );
    
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows tooltip on hover', async () => {
    render(
      <Tooltip content="Test tooltip" trigger="hover" delayDuration={0} skipDelayDuration={0}>
        <TooltipTrigger asChild>
          <button>Hover me</button>
        </TooltipTrigger>
      </Tooltip>
    );
    
    const button = screen.getByText('Hover me');
    
    await act(async () => {
      fireEvent.mouseEnter(button);
    });
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('hides tooltip on mouse leave', async () => {
    render(
      <Tooltip content="Test tooltip" trigger="hover" delayDuration={0} skipDelayDuration={0}>
        <TooltipTrigger asChild>
          <button>Hover me</button>
        </TooltipTrigger>
      </Tooltip>
    );
    
    const button = screen.getByText('Hover me');
    
    await act(async () => {
      fireEvent.mouseEnter(button);
    });
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    }, { timeout: 1000 });
    
    await act(async () => {
      fireEvent.mouseLeave(button);
    });
    
    await waitFor(() => {
      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('shows tooltip on click', async () => {
    render(
      <Tooltip content="Test tooltip" trigger="click" delayDuration={0} skipDelayDuration={0}>
        <TooltipTrigger asChild>
          <button>Click me</button>
        </TooltipTrigger>
      </Tooltip>
    );
    
    const button = screen.getByText('Click me');
    
    await act(async () => {
      fireEvent.click(button);
    });
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('toggles tooltip on click', async () => {
    const user = userEvent.setup();
    
    render(
      <Tooltip content="Test tooltip" trigger="click">
        <TooltipTrigger asChild>
          <button>Click me</button>
        </TooltipTrigger>
      </Tooltip>
    );
    
    const button = screen.getByText('Click me');
    
    // First click - show tooltip
    await user.click(button);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    }, { timeout: 1000 });
    
    // Second click - hide tooltip
    await user.click(button);
    await waitFor(() => {
      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('shows tooltip on focus', async () => {
    const user = userEvent.setup();
    
    render(
      <Tooltip content="Test tooltip" trigger="focus">
        <TooltipTrigger asChild>
          <button>Focus me</button>
        </TooltipTrigger>
      </Tooltip>
    );
    
    const button = screen.getByText('Focus me');
    await user.tab();
    await button.focus();
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('hides tooltip on blur', async () => {
    const user = userEvent.setup();
    
    render(
      <Tooltip content="Test tooltip" trigger="focus">
        <TooltipTrigger asChild>
          <button>Focus me</button>
        </TooltipTrigger>
      </Tooltip>
    );
    
    const button = screen.getByText('Focus me');
    await user.tab();
    await button.focus();
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    }, { timeout: 1000 });
    
    await user.tab();
    
    await waitFor(() => {
      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(
      <Tooltip content="Test tooltip" variant="success" open>
        <button>Test</button>
      </Tooltip>
    );
    expect(screen.getByText('Test tooltip').closest('div')).toHaveClass('bg-success', 'text-success-foreground');

    rerender(
      <Tooltip content="Test tooltip" variant="error" open>
        <button>Test</button>
      </Tooltip>
    );
    expect(screen.getByText('Test tooltip').closest('div')).toHaveClass('bg-destructive', 'text-destructive-foreground');

    rerender(
      <Tooltip content="Test tooltip" variant="warning" open>
        <button>Test</button>
      </Tooltip>
    );
    expect(screen.getByText('Test tooltip').closest('div')).toHaveClass('bg-warning', 'text-warning-foreground');

    rerender(
      <Tooltip content="Test tooltip" variant="info" open>
        <button>Test</button>
      </Tooltip>
    );
    expect(screen.getByText('Test tooltip').closest('div')).toHaveClass('bg-info', 'text-info-foreground');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(
      <Tooltip content="Test tooltip" size="sm" open>
        <button>Test</button>
      </Tooltip>
    );
    expect(screen.getByText('Test tooltip').closest('div')).toHaveClass('text-xs', 'px-2', 'py-1');

    rerender(
      <Tooltip content="Test tooltip" size="lg" open>
        <button>Test</button>
      </Tooltip>
    );
    expect(screen.getByText('Test tooltip').closest('div')).toHaveClass('text-base', 'px-4', 'py-3');
  });

  it('applies correct placement classes', () => {
    const { rerender } = render(
      <Tooltip content="Test tooltip" placement="top" open>
        <button>Test</button>
      </Tooltip>
    );
    expect(screen.getByText('Test tooltip').closest('div')).toHaveClass('bottom-full', 'left-1/2', '-translate-x-1/2');

    rerender(
      <Tooltip content="Test tooltip" placement="bottom" open>
        <button>Test</button>
      </Tooltip>
    );
    expect(screen.getByText('Test tooltip').closest('div')).toHaveClass('top-full', 'left-1/2', '-translate-x-1/2');

    rerender(
      <Tooltip content="Test tooltip" placement="left" open>
        <button>Test</button>
      </Tooltip>
    );
    expect(screen.getByText('Test tooltip').closest('div')).toHaveClass('right-full', 'top-1/2', '-translate-y-1/2');

    rerender(
      <Tooltip content="Test tooltip" placement="right" open>
        <button>Test</button>
      </Tooltip>
    );
    expect(screen.getByText('Test tooltip').closest('div')).toHaveClass('left-full', 'top-1/2', '-translate-y-1/2');
  });

  it('respects controlled open state', () => {
    const { rerender } = render(
      <Tooltip content="Test tooltip" open={false}>
        <button>Test</button>
      </Tooltip>
    );
    expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument();

    rerender(
      <Tooltip content="Test tooltip" open={true}>
        <button>Test</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('calls onOpenChange when open state changes', async () => {
    const onOpenChange = vi.fn();
    render(
      <Tooltip content="Test tooltip" onOpenChange={onOpenChange} delayDuration={0} skipDelayDuration={0}>
        <TooltipTrigger asChild>
          <button>Test</button>
        </TooltipTrigger>
      </Tooltip>
    );
    
    const button = screen.getByText('Test');
    await act(async () => {
      fireEvent.mouseEnter(button);
    });
    
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('does not show tooltip when disabled', () => {
    render(
      <Tooltip content="Test tooltip" disabled>
        <button>Test</button>
      </Tooltip>
    );
    
    const button = screen.getByText('Test');
    fireEvent.mouseEnter(button);
    
    expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Tooltip content="Test tooltip" open onOpenChange={() => {}}>
        <TooltipTrigger asChild>
          <button>Test</button>
        </TooltipTrigger>
        <TooltipContent className="custom-tooltip">
          Test tooltip
        </TooltipContent>
      </Tooltip>
    );
    
    // Brug getAllByRole og filtrer på custom-tooltip class
    const tooltips = screen.getAllByRole('tooltip');
    const customTooltip = tooltips.find(el => el.classList.contains('custom-tooltip'));
    expect(customTooltip).toBeInTheDocument();
    expect(customTooltip).toHaveClass('custom-tooltip');
  });

  it('applies custom content className', () => {
    render(
      <Tooltip content="Test tooltip" contentClassName="custom-content" open>
        <TooltipTrigger asChild>
          <button>Test</button>
        </TooltipTrigger>
      </Tooltip>
    );
    
    expect(screen.getByRole('tooltip')).toHaveClass('custom-content');
  });

  it('renders with delay duration', async () => {
    vi.useFakeTimers();
    
    render(
      <Tooltip content="Test tooltip" delayDuration={100}>
        <TooltipTrigger asChild>
          <button>Test</button>
        </TooltipTrigger>
      </Tooltip>
    );
    
    const button = screen.getByText('Test');
    
    // Før delay: ingen tooltip
    expect(screen.queryByRole('tooltip')).toBeNull();
    
    // Trig event
    fireEvent.mouseEnter(button);
    
    // Før delay: ingen tooltip
    expect(screen.queryByRole('tooltip')).toBeNull();
    
    // Kør timere INDE I act – sync er helt fint:
    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    
    // Evt. flush microtasks
    await Promise.resolve();
    
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    
    vi.useRealTimers();
  });

  it('renders with skip delay duration', async () => {
    vi.useFakeTimers();
    
    render(
      <Tooltip content="Test tooltip" skipDelayDuration={100} delayDuration={0}>
        <TooltipTrigger asChild>
          <button>Test</button>
        </TooltipTrigger>
      </Tooltip>
    );
    
    const button = screen.getByText('Test');
    
    // Trig event
    fireEvent.mouseEnter(button);
    
    // Should show immediately (no delay for opening)
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    
    // Test close delay
    fireEvent.mouseLeave(button);
    
    // Kør timere INDE I act – sync er helt fint:
    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    
    // Evt. flush microtasks
    await Promise.resolve();
    
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    
    vi.useRealTimers();
  });

  it('renders rich content', () => {
    const richContent = (
      <div>
        <div>Title</div>
        <div>Description</div>
      </div>
    );
    
    render(
      <Tooltip content={richContent} open>
        <TooltipTrigger asChild>
          <button>Test</button>
        </TooltipTrigger>
      </Tooltip>
    );
    
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});

describe('TooltipTrigger', () => {
  it('renders trigger element', () => {
    render(
      <Tooltip content="Test tooltip">
        <TooltipTrigger>
          <button>Test</button>
        </TooltipTrigger>
      </Tooltip>
    );
    
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles asChild prop', () => {
    render(
      <Tooltip content="Test tooltip">
        <TooltipTrigger asChild>
          <button>Test</button>
        </TooltipTrigger>
      </Tooltip>
    );
    
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

describe('TooltipContent', () => {
  it('renders content with correct classes', () => {
    render(
      <TooltipContent variant="success" size="lg" placement="top">
        Test content
      </TooltipContent>
    );
    
    const content = screen.getByText('Test content');
    expect(content).toHaveClass('bg-success', 'text-success-foreground', 'text-base', 'px-4', 'py-3');
  });

  it('renders arrow with correct classes', () => {
    render(
      <TooltipContent variant="success" placement="top">
        Test content
      </TooltipContent>
    );
    
    const arrow = screen.getByText('Test content').parentElement?.querySelector('.w-2.h-2.rotate-45');
    expect(arrow).toBeInTheDocument();
  });
});
