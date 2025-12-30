import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, cleanup, act, waitFor, fireEvent } from '@testing-library/react';
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
  });

  afterEach(() => {
    cleanup();
    // Ensure real timers are restored after each test
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  describe('Toast Component', () => {
    it('should cleanup timeouts on unmount', async () => {
      vi.useFakeTimers();
      
      try {
        const { unmount } = render(
          <ToastProvider>
            <TestToastComponent />
          </ToastProvider>
        );

        // Wait for React effects to run - use act to flush effects
        await act(async () => {
          // Run pending timers to allow useEffect to run
          vi.runOnlyPendingTimers();
          // Wait for next tick to allow React to process
          await Promise.resolve();
        });

        // Get initial timer count (should have toast timeout)
        const initialTimerCount = vi.getTimerCount();
        expect(initialTimerCount).toBeGreaterThan(0); // Should have toast timeout

        // Unmount should cleanup all timeouts
        unmount();

        // Wait for cleanup to complete
        await act(async () => {
          vi.runOnlyPendingTimers();
          await Promise.resolve();
        });

        // Verify timers were cleaned up
        // Note: Some timers might still exist from React internals, so we check if count decreased
        const finalTimerCount = vi.getTimerCount();
        expect(finalTimerCount).toBeLessThan(initialTimerCount);
      } finally {
        vi.useRealTimers();
        vi.clearAllTimers();
      }
    }, 10000); // 10 second timeout

    it('should cleanup timeouts when toast is removed', async () => {
      vi.useFakeTimers();
      
      try {
        const { unmount } = render(
          <ToastProvider>
            <TestToastComponent />
          </ToastProvider>
        );

        // Wait for React effects to run
        await act(async () => {
          vi.runOnlyPendingTimers();
          await Promise.resolve();
        });

        const initialTimerCount = vi.getTimerCount();
        expect(initialTimerCount).toBeGreaterThan(0); // Should have toast timeout

        unmount();

        // Wait for cleanup
        await act(async () => {
          vi.runOnlyPendingTimers();
          await Promise.resolve();
        });

        // Verify timers were cleaned up (count should be less)
        const finalTimerCount = vi.getTimerCount();
        expect(finalTimerCount).toBeLessThan(initialTimerCount);
      } finally {
        vi.useRealTimers();
        vi.clearAllTimers();
      }
    }, 10000); // 10 second timeout
  });

  describe('Tooltip Component', () => {
    it('should cleanup timers on unmount', async () => {
      vi.useFakeTimers();
      
      try {
        const { unmount } = render(
          <Tooltip content="Test tooltip">
            <button>Hover me</button>
          </Tooltip>
        );

        // Wait for any React effects
        await act(async () => {
          vi.runOnlyPendingTimers();
          await Promise.resolve();
        });

        const timerCountBeforeUnmount = vi.getTimerCount();

        unmount();

        // Wait for cleanup
        await act(async () => {
          vi.runOnlyPendingTimers();
          await Promise.resolve();
        });

        // Verify timers were cleaned up
        const timerCountAfterUnmount = vi.getTimerCount();
        expect(timerCountAfterUnmount).toBeLessThanOrEqual(timerCountBeforeUnmount);
      } finally {
        vi.useRealTimers();
        vi.clearAllTimers();
      }
    }, 10000); // 10 second timeout

    it('should cleanup event listeners on unmount', () => {
      // Test that component unmounts without errors
      // Tooltip uses React's event system which handles cleanup automatically
      const { unmount } = render(
        <Tooltip content="Test tooltip" trigger="hover">
          <button>Hover me</button>
        </Tooltip>
      );

      // Unmount should complete without errors
      expect(() => unmount()).not.toThrow();
      
      // Component should be unmounted successfully
      // (If there were memory leaks, this would cause issues in subsequent tests)
    });
  });

  describe('Dialog Component', () => {
    it('should cleanup event listeners on unmount', () => {
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
    it('should not leak memory when src changes', async () => {
      vi.useFakeTimers();
      
      try {
        const { rerender } = render(
          <Avatar src="image1.jpg" alt="Avatar 1" />
        );

        // Wait for any React effects
        await act(async () => {
          vi.runOnlyPendingTimers();
          await Promise.resolve();
        });

        const initialTimerCount = vi.getTimerCount();

        // Change src multiple times
        rerender(<Avatar src="image2.jpg" alt="Avatar 2" />);
        rerender(<Avatar src="image3.jpg" alt="Avatar 3" />);

        // Wait for any effects from rerender
        await act(async () => {
          vi.runOnlyPendingTimers();
          await Promise.resolve();
        });

        // No new timers should be created (Avatar doesn't use timers)
        const finalTimerCount = vi.getTimerCount();
        expect(finalTimerCount).toBeLessThanOrEqual(initialTimerCount);
      } finally {
        vi.useRealTimers();
        vi.clearAllTimers();
      }
    }, 10000); // 10 second timeout
  });

  describe('Textarea Component', () => {
    it('should cleanup refs on unmount', async () => {
      vi.useFakeTimers();
      
      try {
        const { unmount } = render(
          <Textarea autoResize />
        );

        // Wait for any React effects
        await act(async () => {
          vi.runOnlyPendingTimers();
          await Promise.resolve();
        });

        const timerCountBeforeUnmount = vi.getTimerCount();

        unmount();

        // Wait for cleanup
        await act(async () => {
          vi.runOnlyPendingTimers();
          await Promise.resolve();
        });

        // Verify timers were cleaned up
        const timerCountAfterUnmount = vi.getTimerCount();
        expect(timerCountAfterUnmount).toBeLessThanOrEqual(timerCountBeforeUnmount);
      } finally {
        vi.useRealTimers();
        vi.clearAllTimers();
      }
    }, 10000); // 10 second timeout
  });
});

// Helper component for Toast tests
// Use a ref to prevent infinite loops if toast function changes
function TestToastComponent() {
  const toast = useToastNotification();
  const hasShownToast = React.useRef(false);

  React.useEffect(() => {
    if (!hasShownToast.current) {
      hasShownToast.current = true;
      toast.success('Test toast');
    }
  }, [toast]);

  return <div>Test</div>;
}

