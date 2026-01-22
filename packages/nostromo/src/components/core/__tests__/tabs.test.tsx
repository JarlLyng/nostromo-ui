import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs';

describe('Tabs', () => {
  it('renders with default props', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /tab 2/i })).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('switches tabs when clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    const tab2 = screen.getByRole('tab', { name: /tab 2/i });
    await user.click(tab2);

    expect(tab2).toHaveAttribute('data-state', 'active');
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('applies correct classes for different variants', () => {
    const { rerender } = render(
      <Tabs defaultValue="tab1">
        <TabsList variant="default">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole('tablist')).toHaveClass('bg-muted');

    rerender(
      <Tabs defaultValue="tab1">
        <TabsList variant="outline">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole('tablist')).toHaveClass('border', 'border-border', 'bg-transparent');

    rerender(
      <Tabs defaultValue="tab1">
        <TabsList variant="pills">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole('tablist')).toHaveClass('bg-transparent', 'p-0');
  });

  it('applies correct classes for different sizes', () => {
    const { rerender } = render(
      <Tabs defaultValue="tab1">
        <TabsList size="sm">
          <TabsTrigger value="tab1" size="sm">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole('tablist')).toHaveClass('h-8', 'text-sm');
    expect(screen.getByRole('tab')).toHaveClass('px-2', 'py-1', 'text-xs');

    rerender(
      <Tabs defaultValue="tab1">
        <TabsList size="lg">
          <TabsTrigger value="tab1" size="lg">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole('tablist')).toHaveClass('h-12', 'text-lg');
    expect(screen.getByRole('tab')).toHaveClass('px-4', 'py-2', 'text-base');
  });

  it('handles disabled tabs correctly', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    const disabledTab = screen.getByRole('tab', { name: /tab 2/i });
    expect(disabledTab).toBeDisabled();
    expect(disabledTab).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50');
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
        <TabsContent value="tab3">Content 3</TabsContent>
      </Tabs>
    );

    const tab1 = screen.getByRole('tab', { name: /tab 1/i });
    const tab2 = screen.getByRole('tab', { name: /tab 2/i });
    const tab3 = screen.getByRole('tab', { name: /tab 3/i });

    // Focus first tab
    await user.tab();
    expect(tab1).toHaveFocus();

    // Navigate right
    await user.keyboard('{ArrowRight}');
    expect(tab2).toHaveFocus();

    // Navigate right again
    await user.keyboard('{ArrowRight}');
    expect(tab3).toHaveFocus();

    // Navigate left
    await user.keyboard('{ArrowLeft}');
    expect(tab2).toHaveFocus();
  });

  it('calls onValueChange when tab changes', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    
    render(
      <Tabs defaultValue="tab1" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    const tab2 = screen.getByRole('tab', { name: /tab 2/i });
    await user.click(tab2);

    expect(onValueChange).toHaveBeenCalledWith('tab2');
  });

  it('renders with custom className', () => {
    render(
      <Tabs defaultValue="tab1" className="custom-tabs">
        <TabsList className="custom-tabs-list">
          <TabsTrigger value="tab1" className="custom-tab-trigger">
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="custom-tab-content">
          Content 1
        </TabsContent>
      </Tabs>
    );

    expect(screen.getByRole('tablist')).toHaveClass('custom-tabs-list');
    expect(screen.getByRole('tab')).toHaveClass('custom-tab-trigger');
    expect(screen.getByRole('tabpanel')).toHaveClass('custom-tab-content');
  });

  it('handles controlled mode correctly', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    
    render(
      <Tabs value="tab1" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    const tab2 = screen.getByRole('tab', { name: /tab 2/i });
    await user.click(tab2);

    expect(onValueChange).toHaveBeenCalledWith('tab2');
    // In controlled mode, the content doesn't change until the parent updates the value
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });
});
