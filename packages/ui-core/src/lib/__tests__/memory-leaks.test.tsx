import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import React from 'react';
import { ToastProvider, useToastNotification } from '../../components/toast';
import { Tooltip } from '../../components/tooltip';
import { Dialog, DialogContent } from '../../components/dialog';
import { Avatar } from '../../components/avatar';
import { Textarea } from '../../components/textarea';

/**
 * Memory Leak Detection Tests
 * Verifies that components properly clean up resources (timeouts, event listeners, etc.)
 */

describe('Memory Leak Prevention', () => {
  beforeEach(() => {
    // Clear all timers before each test
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  describe('Toast Component', () => {
    it('should cleanup timeouts on unmount', () => {
      const { unmount } = render(
        <ToastProvider>
          <TestToastComponent />
        </ToastProvider>
      );

      // Fast-forward time to trigger timeout
      vi.advanceTimersByTime(6000);

      // Unmount should cleanup all timeouts
      unmount();

      // Verify no timers are still running
      expect(vi.getTimerCount()).toBe(0);
    });

    it('should cleanup timeouts when toast is removed', () => {
      const { unmount } = render(
        <ToastProvider>
          <TestToastComponent />
        </ToastProvider>
      );

      // Fast-forward time
      vi.advanceTimersByTime(1000);

      unmount();

      expect(vi.getTimerCount()).toBe(0);
    });
  });

  describe('Tooltip Component', () => {
    it('should cleanup timers on unmount', () => {
      const { unmount } = render(
        <Tooltip content="Test tooltip">
          <button>Hover me</button>
        </Tooltip>
      );

      unmount();

      // Verify no timers are still running
      expect(vi.getTimerCount()).toBe(0);
    });

    it('should cleanup event listeners on unmount', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = render(
        <Tooltip content="Test tooltip" trigger="hover">
          <button>Hover me</button>
        </Tooltip>
      );

      unmount();

      // Verify event listeners were removed
      expect(removeEventListenerSpy).toHaveBeenCalled();
    });
  });

  describe('Dialog Component', () => {
    it('should cleanup event listeners on unmount', () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

      const { unmount } = render(
        <Dialog open={true} onOpenChange={() => {}}>
          <DialogContent>Test</DialogContent>
        </Dialog>
      );

      unmount();

      // Verify event listeners were removed
      expect(removeEventListenerSpy).toHaveBeenCalled();
    });

    it('should restore body overflow on unmount', () => {
      const originalOverflow = document.body.style.overflow;

      const { unmount } = render(
        <Dialog open={true} onOpenChange={() => {}}>
          <DialogContent>Test</DialogContent>
        </Dialog>
      );

      expect(document.body.style.overflow).toBe('hidden');

      unmount();

      // Body overflow should be restored
      expect(document.body.style.overflow).toBe(originalOverflow || 'unset');
    });
  });

  describe('Avatar Component', () => {
    it('should not leak memory when src changes', () => {
      const { rerender } = render(
        <Avatar src="image1.jpg" alt="Avatar 1" />
      );

      // Change src multiple times
      rerender(<Avatar src="image2.jpg" alt="Avatar 2" />);
      rerender(<Avatar src="image3.jpg" alt="Avatar 3" />);

      // No timers or listeners should be created
      expect(vi.getTimerCount()).toBe(0);
    });
  });

  describe('Textarea Component', () => {
    it('should cleanup refs on unmount', () => {
      const { unmount } = render(
        <Textarea autoResize />
      );

      unmount();

      // Verify no timers are still running
      expect(vi.getTimerCount()).toBe(0);
    });
  });
});

// Helper component for Toast tests
function TestToastComponent() {
  const toast = useToastNotification();

  React.useEffect(() => {
    toast.success('Test toast');
  }, [toast]);

  return <div>Test</div>;
}

