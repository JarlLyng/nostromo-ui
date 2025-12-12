import { describe, it, expect } from 'vitest';
import {
  calculateContrastRatio,
  meetsWCAGAA,
  validateContrast,
  validateColorCombinations,
  generateContrastReport,
} from '../contrast-validator';

describe('contrast-validator', () => {
  describe('calculateContrastRatio', () => {
    it('should calculate contrast ratio between black and white', () => {
      const ratio = calculateContrastRatio('0 0% 0%', '0 0% 100%');
      expect(ratio).toBeCloseTo(21, 1);
    });

    it('should calculate contrast ratio between similar colors', () => {
      const ratio = calculateContrastRatio('0 0% 50%', '0 0% 51%');
      expect(ratio).toBeLessThan(1.1);
    });

    it('should handle HSL format with parentheses', () => {
      const ratio = calculateContrastRatio('hsl(0 0% 0%)', 'hsl(0 0% 100%)');
      expect(ratio).toBeCloseTo(21, 1);
    });
  });

  describe('meetsWCAGAA', () => {
    it('should return true for high contrast (normal text)', () => {
      expect(meetsWCAGAA(4.5, 'normal')).toBe(true);
      expect(meetsWCAGAA(7, 'normal')).toBe(true);
    });

    it('should return false for low contrast (normal text)', () => {
      expect(meetsWCAGAA(4.4, 'normal')).toBe(false);
      expect(meetsWCAGAA(3, 'normal')).toBe(false);
    });

    it('should return true for high contrast (large text)', () => {
      expect(meetsWCAGAA(3, 'large')).toBe(true);
      expect(meetsWCAGAA(4.5, 'large')).toBe(true);
    });

    it('should return false for low contrast (large text)', () => {
      expect(meetsWCAGAA(2.9, 'large')).toBe(false);
      expect(meetsWCAGAA(2, 'large')).toBe(false);
    });
  });

  describe('validateContrast', () => {
    it('should validate high contrast combination', () => {
      const result = validateContrast('0 0% 0%', '0 0% 100%', 'normal');
      expect(result.contrastRatio).toBeGreaterThan(20);
      expect(result.meetsWCAGAA).toBe(true);
      expect(result.requiredRatio).toBe(4.5);
    });

    it('should validate low contrast combination', () => {
      const result = validateContrast('0 0% 50%', '0 0% 51%', 'normal');
      expect(result.contrastRatio).toBeLessThan(1.1);
      expect(result.meetsWCAGAA).toBe(false);
    });

    it('should use large text threshold when specified', () => {
      const result = validateContrast('0 0% 0%', '0 0% 70%', 'large');
      expect(result.requiredRatio).toBe(3);
    });
  });

  describe('validateColorCombinations', () => {
    it('should validate multiple combinations', () => {
      const combinations = [
        {
          foreground: '0 0% 0%',
          background: '0 0% 100%',
          textSize: 'normal' as const,
          context: 'Test 1',
        },
        {
          foreground: '0 0% 50%',
          background: '0 0% 51%',
          textSize: 'normal' as const,
          context: 'Test 2',
        },
      ];

      const results = validateColorCombinations(combinations);
      expect(results).toHaveLength(2);
      expect(results[0].pass).toBe(true);
      expect(results[1].pass).toBe(false);
    });
  });

  describe('generateContrastReport', () => {
    it('should generate report with failures', () => {
      const results = validateColorCombinations([
        {
          foreground: '0 0% 0%',
          background: '0 0% 100%',
          textSize: 'normal' as const,
          context: 'Passing test',
        },
        {
          foreground: '0 0% 50%',
          background: '0 0% 51%',
          textSize: 'normal' as const,
          context: 'Failing test',
        },
      ]);

      const report = generateContrastReport(results);
      expect(report).toContain('Total combinations: 2');
      expect(report).toContain('Passed: 1');
      expect(report).toContain('Failed: 1');
      expect(report).toContain('Failing test');
      expect(report).toContain('❌ FAIL');
    });

    it('should generate report with no failures', () => {
      const results = validateColorCombinations([
        {
          foreground: '0 0% 0%',
          background: '0 0% 100%',
          textSize: 'normal' as const,
        },
      ]);

      const report = generateContrastReport(results);
      expect(report).toContain('Total combinations: 1');
      expect(report).toContain('Passed: 1');
      expect(report).toContain('Failed: 0');
      expect(report).not.toContain('## Failures');
    });
  });
});

