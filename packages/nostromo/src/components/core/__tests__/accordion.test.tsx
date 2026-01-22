import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../accordion';

describe('Accordion', () => {
  it('renders accordion with items', () => {
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('opens and closes items on click', async () => {
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const trigger = screen.getByRole('button', { name: /item 1/i });
    const content = screen.getByText('Content 1').closest('[role="region"]')!;
    expect(content).toHaveAttribute('hidden');
    
    fireEvent.click(trigger);
    
    await waitFor(() => {
      expect(content).not.toHaveAttribute('hidden');
    }, { timeout: 5000 });
    
    fireEvent.click(trigger);
    
    await waitFor(() => {
      expect(content).toHaveAttribute('hidden');
    }, { timeout: 5000 });
  });

  it('supports single type (only one item open at a time)', async () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const trigger1 = screen.getByRole('button', { name: /item 1/i });
    const trigger2 = screen.getByRole('button', { name: /item 2/i });
    const content1 = screen.getByText('Content 1').closest('[role="region"]')!;
    const content2 = screen.getByText('Content 2').closest('[role="region"]')!;
    
    // Open first item
    fireEvent.click(trigger1);
    await waitFor(() => {
      expect(content1).not.toHaveAttribute('hidden');
    }, { timeout: 5000 });
    
    // Open second item - first should close
    fireEvent.click(trigger2);
    await waitFor(() => {
      expect(content2).not.toHaveAttribute('hidden');
      expect(content1).toHaveAttribute('hidden');
    }, { timeout: 5000 });
  });

  it('supports multiple type (multiple items can be open)', async () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const trigger1 = screen.getByRole('button', { name: /item 1/i });
    const trigger2 = screen.getByRole('button', { name: /item 2/i });
    
    // Open both items
    fireEvent.click(trigger1);
    fireEvent.click(trigger2);
    
    await waitFor(() => {
      expect(screen.getByText('Content 1').closest('[role="region"]')).not.toHaveAttribute('hidden');
      expect(screen.getByText('Content 2').closest('[role="region"]')).not.toHaveAttribute('hidden');
    }, { timeout: 5000 });
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(
      <Accordion variant="outlined">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Item 1').closest('div')?.parentElement).toHaveClass('border-2', 'border-border');

    rerender(
      <Accordion variant="filled">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Item 1').closest('div')?.parentElement).toHaveClass('bg-muted');

    rerender(
      <Accordion variant="ghost">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Item 1').closest('div')?.parentElement).toHaveClass('border-transparent', 'bg-transparent');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(
      <Accordion size="sm">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Item 1').closest('div')?.parentElement).toHaveClass('text-sm');

    rerender(
      <Accordion size="lg">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Item 1').closest('div')?.parentElement).toHaveClass('text-lg');
  });

  it('handles controlled value', async () => {
    const onValueChange = vi.fn();
    render(
      <Accordion value="item-1" onValueChange={onValueChange}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    // First item should be open by default
    expect(screen.getByText('Content 1').closest('[role="region"]')).not.toHaveAttribute('hidden');
    
    const trigger2 = screen.getByRole('button', { name: /item 2/i });
    fireEvent.click(trigger2);
    
    expect(onValueChange).toHaveBeenCalledWith('item-2');
  });

  it('handles uncontrolled value with defaultValue', async () => {
    render(
      <Accordion defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    // First item should be open by default
    expect(screen.getByText('Content 1').closest('[role="region"]')).not.toHaveAttribute('hidden');
  });

  it('handles disabled items', () => {
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" disabled>
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const trigger2 = screen.getByRole('button', { name: /item 2/i });
    expect(trigger2).toBeDisabled();
    
    fireEvent.click(trigger2);
    expect(screen.getByText('Content 2').closest('[role="region"]')).toHaveAttribute('hidden');
  });

  it('handles keyboard navigation', async () => {
    render(
      <Accordion type="single" defaultValue="">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Item 3</AccordionTrigger>
          <AccordionContent>Content 3</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const trigger1 = screen.getByRole('button', { name: /item 1/i });
    const trigger2 = screen.getByRole('button', { name: /item 2/i });
    const trigger3 = screen.getByRole('button', { name: /item 3/i });
    
    trigger1.focus();
    
    // Enter key should open/close
    act(() => {
      fireEvent.keyDown(trigger1, { key: 'Enter' });
    }, { timeout: 5000 });
    await waitFor(() => {
      expect(screen.getByText('Content 1').closest('[role="region"]')).not.toHaveAttribute('hidden');
    }, { timeout: 5000 });
    
    // Space key should open/close
    act(() => {
      fireEvent.keyDown(trigger1, { key: ' ' });
    }, { timeout: 5000 });
    await waitFor(() => {
      const content = screen.getByText('Content 1').closest('[role="region"]')!;
      expect(content).toHaveAttribute('hidden');
    }, { timeout: 5000 });
    
    // Arrow down should focus next item
    act(() => {
      fireEvent.keyDown(trigger1, { key: 'ArrowDown' });
    }, { timeout: 5000 });
    expect(trigger2).toHaveFocus();
    
    // Arrow up should focus previous item
    act(() => {
      fireEvent.keyDown(trigger2, { key: 'ArrowUp' });
    }, { timeout: 5000 });
    expect(trigger1).toHaveFocus();
    
    // Home should focus first item
    act(() => {
      fireEvent.keyDown(trigger2, { key: 'Home' });
    }, { timeout: 5000 });
    expect(trigger1).toHaveFocus();
    
    // End should focus last item
    act(() => {
      fireEvent.keyDown(trigger1, { key: 'End' });
    }, { timeout: 5000 });
    expect(trigger3).toHaveFocus();
  });

  it('applies custom className', () => {
    render(
      <Accordion className="custom-accordion">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    expect(screen.getByText('Item 1').closest('div')?.parentElement).toHaveClass('custom-accordion');
  });

  it('renders with collapsible prop', () => {
    render(
      <Accordion collapsible={false}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });
});

describe('AccordionItem', () => {
  it('renders with correct data attribute', () => {
    render(
      <Accordion>
        <AccordionItem value="test-item">
          <AccordionTrigger>Item</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const item = screen.getByText('Item').closest('[data-value]');
    expect(item).toHaveAttribute('data-value', 'test-item');
  });

  it('applies disabled state', () => {
    render(
      <Accordion>
        <AccordionItem value="item-1" disabled>
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const item = screen.getByText('Item 1').closest('[data-value]');
    expect(item).toHaveClass('opacity-50', 'cursor-not-allowed');
  });
});

describe('AccordionTrigger', () => {
  it('renders with correct ARIA attributes', async () => {
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const trigger = screen.getByRole('button', { name: /item 1/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger.id).toMatch(/^accordion-trigger-item-1-/);
    expect(trigger).toHaveAttribute('data-state', 'closed');
    
    fireEvent.click(trigger);
    
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(trigger).toHaveAttribute('data-state', 'open');
    }, { timeout: 5000 });
  });

  it('renders chevron icon', () => {
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const trigger = screen.getByRole('button', { name: /item 1/i });
    const chevron = trigger.querySelector('svg');
    expect(chevron).toBeInTheDocument();
  });

  it('rotates chevron when open', async () => {
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const trigger = screen.getByRole('button', { name: /item 1/i });
    const chevron = trigger.querySelector('svg');
    
    expect(chevron).toHaveClass('rotate-0');
    
    fireEvent.click(trigger);
    
    await waitFor(() => {
      expect(chevron).toHaveClass('rotate-180');
    }, { timeout: 5000 });
  });
});

describe('AccordionContent', () => {
  it('renders with correct ARIA attributes', () => {
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const content = screen.getByText('Content 1').closest('[role="region"]')!;
    expect(content.id).toMatch(/^accordion-content-item-1-/);
    expect(content).toHaveAttribute('hidden');
    expect(content).toHaveAttribute('data-state', 'closed');
  });

  it('animates height when opening/closing', async () => {
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const trigger = screen.getByRole('button', { name: /item 1/i });
    const content = screen.getByText('Content 1').closest('[role="region"]')!;
    
    // Initially closed
    expect(content).toHaveAttribute('hidden');
    
    fireEvent.click(trigger);
    
    await waitFor(() => {
      expect(content).not.toHaveAttribute('hidden');
    }, { timeout: 5000 });
  });
});
