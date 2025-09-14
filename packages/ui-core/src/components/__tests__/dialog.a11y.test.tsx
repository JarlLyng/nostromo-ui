import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../dialog';

expect.extend(toHaveNoViolations);

describe('Dialog Accessibility', () => {
  it('should not have accessibility violations when closed', async () => {
    const { container } = render(
      <Dialog open={false} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Test description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations when open', async () => {
    const { container } = render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Test description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with custom content', async () => {
    const { container } = render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accessible Dialog</DialogTitle>
            <DialogDescription>
              This dialog contains accessible content with proper ARIA attributes.
            </DialogDescription>
          </DialogHeader>
          <div>
            <label htmlFor="dialog-input">Input Label</label>
            <input id="dialog-input" type="text" placeholder="Enter text" />
            <button type="button">Action Button</button>
          </div>
        </DialogContent>
      </Dialog>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with form elements', async () => {
    const { container } = render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Form Dialog</DialogTitle>
            <DialogDescription>Please fill out the form below.</DialogDescription>
          </DialogHeader>
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" required />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={4}></textarea>
            </div>
            <div>
              <button type="submit">Submit</button>
              <button type="button">Cancel</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with custom fallback', async () => {
    const CustomFallback = ({ error, resetError }: { error?: Error; resetError: () => void }) => (
      <div role="alert" aria-live="polite">
        <h2>Custom Error</h2>
        <p>An error occurred: {error?.message}</p>
        <button onClick={resetError} aria-label="Retry operation">
          Try Again
        </button>
      </div>
    );

    const { container } = render(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog with Custom Fallback</DialogTitle>
            <DialogDescription>This dialog has a custom error fallback.</DialogDescription>
          </DialogHeader>
          <CustomFallback error={new Error('Test error')} resetError={() => {}} />
        </DialogContent>
      </Dialog>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
