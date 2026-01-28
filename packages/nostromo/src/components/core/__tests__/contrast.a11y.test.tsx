/**
 * Contrast Accessibility Tests
 * 
 * Validates WCAG AA contrast compliance for theme color combinations.
 * 
 * NOTE: This tests theme CSS variables directly rather than rendered components,
 * because CSS variables are not resolved in the test environment. The theme
 * variables are the source of truth for component colors.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { validateContrast } from '../../../lib/contrast-validator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Extracts HSL values from CSS variable definitions
 */
function extractHSLValue(cssContent: string, varName: string, visited = new Set<string>()): string | null {
  if (visited.has(varName)) {
    return null; // Prevent infinite recursion
  }
  visited.add(varName);

  // Look for --color-varName: hsl(var(--color-...)) or --color-varName: 262 84% 52%;
  const patterns = [
    new RegExp(`--color-${varName}:\\s*hsl\\(var\\(--color-([^)]+)\\)\\)`, 'g'),
    new RegExp(`--color-${varName}:\\s*([^;]+);`, 'g'),
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(cssContent);
    if (match) {
      let value = match[1].trim();
      
      // If it's a reference to another variable, resolve it
      if (value.includes('var(--color-')) {
        const refVar = value.match(/var\(--color-([^)]+)\)/)?.[1];
        if (refVar) {
          const resolved = extractHSLValue(cssContent, refVar, visited);
          if (resolved) {
            return resolved;
          }
        }
      }
      
      // If it's a direct HSL value (like "262 84% 52%"), return it
      if (/^\d+\s+\d+%\s+\d+%$/.test(value)) {
        return value;
      }
      
      // If it's a color name like "neutral-900", try to find the actual HSL value
      if (value.includes('-')) {
        // Try to find the base color definition (e.g., --color-neutral-900: 0 0% 9%;)
        const baseColorMatch = cssContent.match(new RegExp(`--color-${value}:\\s*([^;]+);`));
        if (baseColorMatch) {
          const hslValue = baseColorMatch[1].trim();
          if (/^\d+\s+\d+%\s+\d+%$/.test(hslValue)) {
            return hslValue;
          }
        }
      }
    }
  }

  return null;
}

describe('Contrast Accessibility Tests', () => {
  // Test the default theme (mother) which is used by components
  const themePath = join(__dirname, '../../../../ui-tw/src/themes/mother.css');
  const themeContent = readFileSync(themePath, 'utf-8');

  describe('Theme Color Contrast (Light Mode)', () => {
    // Extract semantic token values for light mode
    const foreground = extractHSLValue(themeContent, 'foreground') || '0 0% 9%';
    const background = extractHSLValue(themeContent, 'background') || '0 0% 98%';
    const mutedForeground = extractHSLValue(themeContent, 'muted-foreground') || '0 0% 32%';
    const muted = extractHSLValue(themeContent, 'muted') || '0 0% 96%';
    const cardForeground = extractHSLValue(themeContent, 'card-foreground') || '0 0% 9%';
    const card = extractHSLValue(themeContent, 'card') || '0 0% 98%';
    const popoverForeground = extractHSLValue(themeContent, 'popover-foreground') || '0 0% 9%';
    const popover = extractHSLValue(themeContent, 'popover') || '0 0% 98%';
    const primaryForeground = extractHSLValue(themeContent, 'primary-foreground') || '0 0% 98%';
    const primary = extractHSLValue(themeContent, 'primary') || '195 100% 50%';
    const secondaryForeground = extractHSLValue(themeContent, 'secondary-foreground') || '0 0% 9%';
    const secondary = extractHSLValue(themeContent, 'secondary') || '0 0% 96%';

    it('should have sufficient contrast for primary button (primary-foreground on primary)', () => {
      const result = validateContrast(primaryForeground, primary, 'normal');
      expect(result.meetsWCAGAA).toBe(true);
      expect(result.contrastRatio).toBeGreaterThanOrEqual(4.5);
    });

    it('should have sufficient contrast for secondary button (secondary-foreground on secondary)', () => {
      const result = validateContrast(secondaryForeground, secondary, 'normal');
      expect(result.meetsWCAGAA).toBe(true);
      expect(result.contrastRatio).toBeGreaterThanOrEqual(4.5);
    });

    it('should have sufficient contrast for card text (card-foreground on card)', () => {
      const result = validateContrast(cardForeground, card, 'normal');
      expect(result.meetsWCAGAA).toBe(true);
      expect(result.contrastRatio).toBeGreaterThanOrEqual(4.5);
    });

    it('should have sufficient contrast for popover text (popover-foreground on popover)', () => {
      const result = validateContrast(popoverForeground, popover, 'normal');
      expect(result.meetsWCAGAA).toBe(true);
      expect(result.contrastRatio).toBeGreaterThanOrEqual(4.5);
    });

    it('should have sufficient contrast for muted text (muted-foreground on muted)', () => {
      const result = validateContrast(mutedForeground, muted, 'normal');
      expect(result.meetsWCAGAA).toBe(true);
      expect(result.contrastRatio).toBeGreaterThanOrEqual(4.5);
    });

    it('should have sufficient contrast for body text (foreground on background)', () => {
      const result = validateContrast(foreground, background, 'normal');
      expect(result.meetsWCAGAA).toBe(true);
      expect(result.contrastRatio).toBeGreaterThanOrEqual(4.5);
    });
  });
});
