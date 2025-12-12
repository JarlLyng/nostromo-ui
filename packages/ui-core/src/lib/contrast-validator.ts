/**
 * Contrast Validator
 * 
 * Utilities for validating WCAG AA contrast compliance (4.5:1 for normal text, 3:1 for large text)
 * 
 * @module contrast-validator
 */

/**
 * Converts HSL color string to RGB values
 * @param hslString - HSL color string in format "hsl(262 84% 52%)" or "262 84% 52%"
 * @returns RGB values [r, g, b] in range 0-255
 */
function hslToRgb(hslString: string): [number, number, number] {
  // Remove hsl() wrapper if present
  const cleaned = hslString.replace(/^hsl\(|\)$/g, '').trim();
  const parts = cleaned.split(/\s+/);
  
  if (parts.length < 3) {
    throw new Error(`Invalid HSL format: ${hslString}`);
  }

  const h = parseFloat(parts[0]) / 360;
  const s = parseFloat(parts[1].replace('%', '')) / 100;
  const l = parseFloat(parts[2].replace('%', '')) / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Calculates relative luminance of an RGB color
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Relative luminance (0-1)
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(val => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculates contrast ratio between two colors
 * @param color1 - First color in HSL format
 * @param color2 - Second color in HSL format
 * @returns Contrast ratio (1-21)
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const [r1, g1, b1] = hslToRgb(color1);
  const [r2, g2, b2] = hslToRgb(color2);

  const l1 = getRelativeLuminance(r1, g1, b1);
  const l2 = getRelativeLuminance(r2, g2, b2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Validates if contrast ratio meets WCAG AA requirements
 * @param contrastRatio - Contrast ratio to validate
 * @param textSize - Text size: 'normal' (4.5:1) or 'large' (3:1)
 * @returns true if meets WCAG AA requirements
 */
export function meetsWCAGAA(contrastRatio: number, textSize: 'normal' | 'large' = 'normal'): boolean {
  const requiredRatio = textSize === 'large' ? 3 : 4.5;
  return contrastRatio >= requiredRatio;
}

/**
 * Validates contrast between foreground and background colors
 * @param foreground - Foreground color in HSL format
 * @param background - Background color in HSL format
 * @param textSize - Text size: 'normal' (4.5:1) or 'large' (3:1)
 * @returns Validation result with contrast ratio and compliance status
 */
export function validateContrast(
  foreground: string,
  background: string,
  textSize: 'normal' | 'large' = 'normal'
): {
  contrastRatio: number;
  meetsWCAGAA: boolean;
  requiredRatio: number;
  textSize: 'normal' | 'large';
} {
  const contrastRatio = calculateContrastRatio(foreground, background);
  const requiredRatio = textSize === 'large' ? 3 : 4.5;
  const meetsWCAG = contrastRatio >= requiredRatio;

  return {
    contrastRatio,
    meetsWCAGAA: meetsWCAG,
    requiredRatio,
    textSize,
  };
}

/**
 * Extracts HSL color value from CSS variable reference
 * @param cssVar - CSS variable like "hsl(var(--color-neutral-900))"
 * @param computedValue - Computed HSL value like "262 84% 52%"
 * @returns HSL string in format "h h% l%" or throws if invalid
 */
export function parseColorValue(cssVar: string, computedValue?: string): string {
  // If we have a computed value, use it
  if (computedValue) {
    return computedValue;
  }

  // Try to extract from hsl() format
  const hslMatch = cssVar.match(/hsl\(([^)]+)\)/);
  if (hslMatch) {
    return hslMatch[1].trim();
  }

  // Try to extract from var() format - this requires runtime resolution
  const varMatch = cssVar.match(/var\(--color-([^)]+)\)/);
  if (varMatch) {
    // This would need to be resolved at runtime
    throw new Error(`Cannot resolve CSS variable at build time: ${cssVar}. Provide computedValue.`);
  }

  throw new Error(`Invalid color format: ${cssVar}`);
}

/**
 * Color combination for validation
 */
export interface ColorCombination {
  foreground: string;
  background: string;
  textSize?: 'normal' | 'large';
  context?: string;
}

/**
 * Validation result for a color combination
 */
export interface ContrastValidationResult {
  combination: ColorCombination;
  contrastRatio: number;
  meetsWCAGAA: boolean;
  requiredRatio: number;
  textSize: 'normal' | 'large';
  pass: boolean;
}

/**
 * Validates multiple color combinations
 * @param combinations - Array of color combinations to validate
 * @returns Array of validation results
 */
export function validateColorCombinations(
  combinations: ColorCombination[]
): ContrastValidationResult[] {
  return combinations.map(combo => {
    const textSize = combo.textSize || 'normal';
    const validation = validateContrast(combo.foreground, combo.background, textSize);

    return {
      combination: combo,
      ...validation,
      pass: validation.meetsWCAGAA,
    };
  });
}

/**
 * Generates a report of contrast validation failures
 * @param results - Array of validation results
 * @returns Report string
 */
export function generateContrastReport(results: ContrastValidationResult[]): string {
  const failures = results.filter(r => !r.pass);
  const passes = results.filter(r => r.pass);

  let report = `# Contrast Validation Report\n\n`;
  report += `Total combinations: ${results.length}\n`;
  report += `Passed: ${passes.length}\n`;
  report += `Failed: ${failures.length}\n\n`;

  if (failures.length > 0) {
    report += `## Failures\n\n`;
    failures.forEach((failure, index) => {
      report += `### ${index + 1}. ${failure.combination.context || 'Unknown'}\n`;
      report += `- Foreground: ${failure.combination.foreground}\n`;
      report += `- Background: ${failure.combination.background}\n`;
      report += `- Text Size: ${failure.textSize}\n`;
      report += `- Contrast Ratio: ${failure.contrastRatio.toFixed(2)}:1\n`;
      report += `- Required: ${failure.requiredRatio}:1\n`;
      report += `- Status: ❌ FAIL\n\n`;
    });
  }

  return report;
}

