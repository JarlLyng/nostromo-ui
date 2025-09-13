import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import axe from 'axe-core';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../dialog';

expect.extend(toHaveNoViolations);

const runAxe = async (container: HTMLElement) => {
  const results = await axe.run(container);
  return results;
};

describe('Dialog Accessibility', () => {
  it('should not have accessibility violations with basic dialog', async () => {
    const { container } = render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>This is a test dialog</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with form dialog', async () => {
    const { container } = render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
            <DialogDescription>Fill out the form below to create your account</DialogDescription>
          </DialogHeader>
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" />
            </div>
          </form>
          <DialogFooter>
            <button type="button">Cancel</button>
            <button type="submit">Create Account</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with confirmation dialog', async () => {
    const { container } = render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>Are you sure you want to delete this item? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button type="button">Cancel</button>
            <button type="button">Delete</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with close button', async () => {
    const { container } = render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>This dialog has a close button</DialogDescription>
          </DialogHeader>
          <DialogClose>×</DialogClose>
          <DialogFooter>
            <button>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different sizes', async () => {
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

    for (const size of sizes) {
      const { container } = render(
        <Dialog open={true}>
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>{size.toUpperCase()} Dialog</DialogTitle>
              <DialogDescription>This is a {size} sized dialog</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button>Close</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );

      const results = await runAxe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should not have accessibility violations with custom content', async () => {
    const { container } = render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Configure your application settings</DialogDescription>
          </DialogHeader>
          <div>
            <h3>General</h3>
            <div>
              <label htmlFor="theme">Theme</label>
              <select id="theme">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <label htmlFor="language">Language</label>
              <select id="language">
                <option value="en">English</option>
                <option value="da">Danish</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <button type="button">Reset</button>
            <button type="button">Save</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with multiple buttons', async () => {
    const { container } = render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Multiple Actions</DialogTitle>
            <DialogDescription>Choose one of the following actions</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button type="button">Cancel</button>
            <button type="button">Save Draft</button>
            <button type="button">Publish</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with disabled state', async () => {
    const { container } = render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disabled Actions</DialogTitle>
            <DialogDescription>Some actions are disabled</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button type="button" disabled>Disabled</button>
            <button type="button">Enabled</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with long content', async () => {
    const { container } = render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Long Content Dialog</DialogTitle>
            <DialogDescription>This dialog contains a lot of content to test scrolling behavior</DialogDescription>
          </DialogHeader>
          <div style={{ height: '500px', overflow: 'auto' }}>
            <p>This is a long paragraph that will cause the dialog to scroll.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <DialogFooter>
            <button type="button">Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with nested interactive elements', async () => {
    const { container } = render(
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Interactive Elements</DialogTitle>
            <DialogDescription>This dialog contains various interactive elements</DialogDescription>
          </DialogHeader>
          <div>
            <button type="button">Button 1</button>
            <input type="text" placeholder="Text input" />
            <select>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
            <textarea placeholder="Textarea"></textarea>
            <input type="checkbox" id="check1" />
            <label htmlFor="check1">Checkbox</label>
            <input type="radio" id="radio1" name="radio" />
            <label htmlFor="radio1">Radio 1</label>
          </div>
          <DialogFooter>
            <button type="button">Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });
});
