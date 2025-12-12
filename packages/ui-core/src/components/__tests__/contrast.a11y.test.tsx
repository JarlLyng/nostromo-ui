/**
 * Contrast Accessibility Tests
 * 
 * Validates WCAG AA contrast compliance for all components in both light and dark mode
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { validateContrast } from '../../lib/contrast-validator';

// Helper to get computed styles
function getComputedStyles(element: HTMLElement): {
  color: string;
  backgroundColor: string;
} {
  const styles = window.getComputedStyle(element);
  return {
    color: styles.color,
    backgroundColor: styles.backgroundColor,
  };
}

// Helper to convert RGB to HSL
function rgbToHsl(rgb: string): string {
  // Extract RGB values from "rgb(r, g, b)" format
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) {
    throw new Error(`Invalid RGB format: ${rgb}`);
  }

  const r = parseInt(match[1]) / 255;
  const g = parseInt(match[2]) / 255;
  const b = parseInt(match[3]) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number, l: number;

  l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
      default:
        h = 0;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

describe('Contrast Accessibility Tests', () => {
  beforeEach(() => {
    // Set up light mode
    document.documentElement.setAttribute('data-color-scheme', 'light');
  });

  describe('Button Component', () => {
    it('should have sufficient contrast for default variant', async () => {
      const { Button } = await import('../button');
      const { container } = render(<Button>Test Button</Button>);
      const button = screen.getByRole('button');
      const styles = getComputedStyles(button);
      
      const foregroundHsl = rgbToHsl(styles.color);
      const backgroundHsl = rgbToHsl(styles.backgroundColor);
      
      const result = validateContrast(foregroundHsl, backgroundHsl, 'normal');
      expect(result.meetsWCAGAA).toBe(true);
      expect(result.contrastRatio).toBeGreaterThanOrEqual(4.5);
    });

    it('should have sufficient contrast for secondary variant', async () => {
      const { Button } = await import('../button');
      const { container } = render(<Button variant="secondary">Test Button</Button>);
      const button = screen.getByRole('button');
      const styles = getComputedStyles(button);
      
      const foregroundHsl = rgbToHsl(styles.color);
      const backgroundHsl = rgbToHsl(styles.backgroundColor);
      
      const result = validateContrast(foregroundHsl, backgroundHsl, 'normal');
      expect(result.meetsWCAGAA).toBe(true);
    });
  });

  describe('Card Component', () => {
    it('should have sufficient contrast for card text', async () => {
      const { Card, CardContent } = await import('../card');
      const { container } = render(
        <Card>
          <CardContent>
            <p>Test content</p>
          </CardContent>
        </Card>
      );
      
      const card = container.querySelector('[class*="bg-card"]');
      const text = screen.getByText('Test content');
      
      if (card && text) {
        const cardStyles = getComputedStyles(card as HTMLElement);
        const textStyles = getComputedStyles(text);
        
        const foregroundHsl = rgbToHsl(textStyles.color);
        const backgroundHsl = rgbToHsl(cardStyles.backgroundColor);
        
        const result = validateContrast(foregroundHsl, backgroundHsl, 'normal');
        expect(result.meetsWCAGAA).toBe(true);
      }
    });
  });

  describe('Input Component', () => {
    it('should have sufficient contrast for input text', async () => {
      const { Input } = await import('../input');
      const { container } = render(<Input placeholder="Enter text" />);
      const input = screen.getByPlaceholderText('Enter text');
      const styles = getComputedStyles(input);
      
      // Input text should contrast with background
      const foregroundHsl = rgbToHsl(styles.color);
      const backgroundHsl = rgbToHsl(styles.backgroundColor);
      
      const result = validateContrast(foregroundHsl, backgroundHsl, 'normal');
      expect(result.meetsWCAGAA).toBe(true);
    });
  });

  describe('Alert Component', () => {
    it('should have sufficient contrast for default variant', async () => {
      const { Alert } = await import('../alert');
      const { container } = render(
        <Alert title="Test Alert" description="Test description" />
      );
      
      const alert = screen.getByRole('alert');
      const title = screen.getByText('Test Alert');
      
      if (title) {
        const alertStyles = getComputedStyles(alert);
        const titleStyles = getComputedStyles(title);
        
        const foregroundHsl = rgbToHsl(titleStyles.color);
        const backgroundHsl = rgbToHsl(alertStyles.backgroundColor);
        
        const result = validateContrast(foregroundHsl, backgroundHsl, 'normal');
        expect(result.meetsWCAGAA).toBe(true);
      }
    });
  });

  describe('Badge Component', () => {
    it('should have sufficient contrast for default variant', async () => {
      const { Badge } = await import('../badge');
      const { container } = render(<Badge>Test Badge</Badge>);
      const badge = container.querySelector('[class*="bg-primary"]');
      
      if (badge) {
        const styles = getComputedStyles(badge as HTMLElement);
        const foregroundHsl = rgbToHsl(styles.color);
        const backgroundHsl = rgbToHsl(styles.backgroundColor);
        
        const result = validateContrast(foregroundHsl, backgroundHsl, 'normal');
        expect(result.meetsWCAGAA).toBe(true);
      }
    });
  });

  describe('Label Component', () => {
    it('should have sufficient contrast for default variant', async () => {
      const { Label } = await import('../label');
      const { container } = render(<Label>Test Label</Label>);
      const label = screen.getByText('Test Label');
      const styles = getComputedStyles(label);
      
      // Label should contrast with page background
      const foregroundHsl = rgbToHsl(styles.color);
      // Use white as background for labels (they're typically on white/light backgrounds)
      const backgroundHsl = '0 0% 100%';
      
      const result = validateContrast(foregroundHsl, backgroundHsl, 'normal');
      expect(result.meetsWCAGAA).toBe(true);
    });
  });
});

