import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../dialog';

describe('Dialog', () => {
  beforeEach(() => {
    // Reset body overflow
    document.body.style.overflow = 'unset';
  });

  afterEach(() => {
    // Clean up body overflow
    document.body.style.overflow = 'unset';
  });

  it('renders when open', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Test description</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Dialog open={false}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when backdrop is clicked', () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog open={true} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('does not call onOpenChange when content is clicked', () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog open={true} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    const content = screen.getByText('Test Dialog').closest('div');
    fireEvent.click(content!);

    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('calls onOpenChange when Escape key is pressed', () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog open={true} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('sets body overflow to hidden when open', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body overflow when closed', () => {
    const { rerender } = render(
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Dialog open={false}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    expect(document.body.style.overflow).toBe('unset');
  });

  it('supports different sizes', () => {
    const { rerender } = render(
      <Dialog open={true} size="sm">
        <DialogContent>
          <DialogTitle>Small Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('p-4');

    rerender(
      <Dialog open={true} size="lg">
        <DialogContent>
          <DialogTitle>Large Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    expect(dialog).toHaveClass('p-8');
  });

  it('renders with custom className', () => {
    render(
      <Dialog open={true} className="custom-dialog">
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('custom-dialog');
  });

  it('renders DialogContent with correct size', () => {
    render(
      <Dialog open={true}>
        <DialogContent size="xl">
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    const content = screen.getByText('Test Dialog').closest('div');
    expect(content).toHaveClass('max-w-xl');
  });

  it('renders DialogHeader with correct structure', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Title</DialogTitle>
            <DialogDescription>Test Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    const header = screen.getByText('Test Title').closest('div');
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6', 'pb-0');
  });

  it('renders DialogTitle with correct styling', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle>Test Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('text-lg', 'font-semibold', 'leading-none', 'tracking-tight');
    expect(title.tagName).toBe('H2');
  });

  it('renders DialogDescription with correct styling', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogDescription>Test Description</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    const description = screen.getByText('Test Description');
    expect(description).toHaveClass('text-sm', 'text-neutral-500');
    expect(description.tagName).toBe('P');
  });

  it('renders DialogFooter with correct structure', () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogFooter>
            <button>Cancel</button>
            <button>Save</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const footer = screen.getByText('Cancel').closest('div');
    expect(footer).toHaveClass('flex', 'flex-col-reverse', 'sm:flex-row', 'sm:justify-end', 'sm:space-x-2', 'p-6', 'pt-0');
  });

  it('renders DialogClose button', () => {
    const onClose = vi.fn();
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogClose onClick={onClose}>×</DialogClose>
        </DialogContent>
      </Dialog>
    );

    const closeButton = screen.getByLabelText('Close dialog');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass('absolute', 'right-4', 'top-4');

    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('supports custom className on all components', () => {
    render(
      <Dialog open={true}>
        <DialogContent className="custom-content">
          <DialogHeader className="custom-header">
            <DialogTitle className="custom-title">Test Title</DialogTitle>
            <DialogDescription className="custom-description">Test Description</DialogDescription>
          </DialogHeader>
          <DialogFooter className="custom-footer">
            <button>Action</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText('Test Title').closest('div')).toHaveClass('custom-content');
    expect(screen.getByText('Test Title').closest('div')).toHaveClass('custom-header');
    expect(screen.getByText('Test Title')).toHaveClass('custom-title');
    expect(screen.getByText('Test Description')).toHaveClass('custom-description');
    expect(screen.getByText('Action').closest('div')).toHaveClass('custom-footer');
  });

  it('handles multiple dialogs correctly', () => {
    const onOpenChange1 = vi.fn();
    const onOpenChange2 = vi.fn();

    render(
      <>
        <Dialog open={true} onOpenChange={onOpenChange1}>
          <DialogContent>
            <DialogTitle>Dialog 1</DialogTitle>
          </DialogContent>
        </Dialog>
        <Dialog open={true} onOpenChange={onOpenChange2}>
          <DialogContent>
            <DialogTitle>Dialog 2</DialogTitle>
          </DialogContent>
        </Dialog>
      </>
    );

    expect(screen.getByText('Dialog 1')).toBeInTheDocument();
    expect(screen.getByText('Dialog 2')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    // Both should be called
    expect(onOpenChange1).toHaveBeenCalledWith(false);
    expect(onOpenChange2).toHaveBeenCalledWith(false);
  });
});
