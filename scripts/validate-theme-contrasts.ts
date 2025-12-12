#!/usr/bin/env tsx
/**
 * Theme Contrast Validation Script
 * 
 * Validates all semantic token color combinations in themes for WCAG AA compliance
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { validateContrast, type ColorCombination } from '../packages/ui-core/src/lib/contrast-validator';

interface ThemeValidation {
  theme: string;
  mode: 'light' | 'dark';
  combinations: Array<{
    name: string;
    foreground: string;
    background: string;
    result: ReturnType<typeof validateContrast>;
  }>;
}

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

/**
 * Validates a theme file
 */
function validateTheme(themePath: string, themeName: string): ThemeValidation[] {
  const content = readFileSync(themePath, 'utf-8');
  const results: ThemeValidation[] = [];

  // Validate light mode
  const lightCombinations: ThemeValidation['combinations'] = [];
  
  // Get semantic token values for light mode
  const lightForeground = extractHSLValue(content, 'foreground') || '0 0% 9%';
  const lightBackground = extractHSLValue(content, 'background') || '0 0% 98%';
  const lightMutedForeground = extractHSLValue(content, 'muted-foreground') || '0 0% 32%';
  const lightMuted = extractHSLValue(content, 'muted') || '0 0% 96%';
  const lightCardForeground = extractHSLValue(content, 'card-foreground') || '0 0% 9%';
  const lightCard = extractHSLValue(content, 'card') || '0 0% 98%';
  const lightPopoverForeground = extractHSLValue(content, 'popover-foreground') || '0 0% 9%';
  const lightPopover = extractHSLValue(content, 'popover') || '0 0% 98%';
  const lightPrimaryForeground = extractHSLValue(content, 'primary-foreground') || '0 0% 98%';
  const lightPrimary = extractHSLValue(content, 'primary') || '262 84% 52%';
  const lightSecondaryForeground = extractHSLValue(content, 'secondary-foreground') || '0 0% 9%';
  const lightSecondary = extractHSLValue(content, 'secondary') || '0 0% 96%';

  // Validate key combinations
  lightCombinations.push({
    name: 'foreground/background',
    foreground: lightForeground,
    background: lightBackground,
    result: validateContrast(lightForeground, lightBackground, 'normal'),
  });

  lightCombinations.push({
    name: 'muted-foreground/muted',
    foreground: lightMutedForeground,
    background: lightMuted,
    result: validateContrast(lightMutedForeground, lightMuted, 'normal'),
  });

  lightCombinations.push({
    name: 'card-foreground/card',
    foreground: lightCardForeground,
    background: lightCard,
    result: validateContrast(lightCardForeground, lightCard, 'normal'),
  });

  lightCombinations.push({
    name: 'popover-foreground/popover',
    foreground: lightPopoverForeground,
    background: lightPopover,
    result: validateContrast(lightPopoverForeground, lightPopover, 'normal'),
  });

  lightCombinations.push({
    name: 'primary-foreground/primary',
    foreground: lightPrimaryForeground,
    background: lightPrimary,
    result: validateContrast(lightPrimaryForeground, lightPrimary, 'normal'),
  });

  lightCombinations.push({
    name: 'secondary-foreground/secondary',
    foreground: lightSecondaryForeground,
    background: lightSecondary,
    result: validateContrast(lightSecondaryForeground, lightSecondary, 'normal'),
  });

  results.push({
    theme: themeName,
    mode: 'light',
    combinations: lightCombinations,
  });

  // Validate dark mode (if dark mode section exists)
  if (content.includes('[data-color-scheme="dark"]')) {
    const darkSection = content.split('[data-color-scheme="dark"]')[1]?.split('}')[0] || '';
    const darkCombinations: ThemeValidation['combinations'] = [];

    const darkForeground = extractHSLValue(darkSection, 'foreground') || '0 0% 95%';
    const darkBackground = extractHSLValue(darkSection, 'background') || '0 0% 9%';
    const darkMutedForeground = extractHSLValue(darkSection, 'muted-foreground') || '0 0% 45%';
    const darkMuted = extractHSLValue(darkSection, 'muted') || '0 0% 85%';
    const darkCardForeground = extractHSLValue(darkSection, 'card-foreground') || '0 0% 95%';
    const darkCard = extractHSLValue(darkSection, 'card') || '0 0% 85%';
    const darkPopoverForeground = extractHSLValue(darkSection, 'popover-foreground') || '0 0% 95%';
    const darkPopover = extractHSLValue(darkSection, 'popover') || '0 0% 85%';
    const darkPrimaryForeground = extractHSLValue(darkSection, 'primary-foreground') || '0 0% 9%';
    const darkPrimary = extractHSLValue(darkSection, 'primary') || '262 84% 60%';
    const darkSecondaryForeground = extractHSLValue(darkSection, 'secondary-foreground') || '0 0% 95%';
    const darkSecondary = extractHSLValue(darkSection, 'secondary') || '0 0% 75%';

    darkCombinations.push({
      name: 'foreground/background',
      foreground: darkForeground,
      background: darkBackground,
      result: validateContrast(darkForeground, darkBackground, 'normal'),
    });

    darkCombinations.push({
      name: 'muted-foreground/muted',
      foreground: darkMutedForeground,
      background: darkMuted,
      result: validateContrast(darkMutedForeground, darkMuted, 'normal'),
    });

    darkCombinations.push({
      name: 'card-foreground/card',
      foreground: darkCardForeground,
      background: darkCard,
      result: validateContrast(darkCardForeground, darkCard, 'normal'),
    });

    darkCombinations.push({
      name: 'popover-foreground/popover',
      foreground: darkPopoverForeground,
      background: darkPopover,
      result: validateContrast(darkPopoverForeground, darkPopover, 'normal'),
    });

    darkCombinations.push({
      name: 'primary-foreground/primary',
      foreground: darkPrimaryForeground,
      background: darkPrimary,
      result: validateContrast(darkPrimaryForeground, darkPrimary, 'normal'),
    });

    darkCombinations.push({
      name: 'secondary-foreground/secondary',
      foreground: darkSecondaryForeground,
      background: darkSecondary,
      result: validateContrast(darkSecondaryForeground, darkSecondary, 'normal'),
    });

    results.push({
      theme: themeName,
      mode: 'dark',
      combinations: darkCombinations,
    });
  }

  return results;
}

/**
 * Main validation function
 */
function runValidation(): void {
  console.log('🎨 Validating theme contrasts...\n');

  const themes = [
    { name: 'nostromo', path: 'packages/ui-tw/src/themes/nostromo.css' },
    { name: 'mother', path: 'packages/ui-tw/src/themes/mother.css' },
    { name: 'lv-426', path: 'packages/ui-tw/src/themes/lv-426.css' },
    { name: 'sulaco', path: 'packages/ui-tw/src/themes/sulaco.css' },
  ];

  const allResults: ThemeValidation[] = [];

  for (const theme of themes) {
    const themePath = join(process.cwd(), theme.path);
    const results = validateTheme(themePath, theme.name);
    allResults.push(...results);
  }

  // Generate report
  let report = `# Theme Contrast Validation Report\n\n`;
  report += `Generated: ${new Date().toISOString()}\n\n`;

  let totalCombinations = 0;
  let totalPassed = 0;
  let totalFailed = 0;

  for (const result of allResults) {
    report += `## ${result.theme} - ${result.mode} mode\n\n`;
    
    for (const combo of result.combinations) {
      totalCombinations++;
      const status = combo.result.meetsWCAGAA ? '✅ PASS' : '❌ FAIL';
      if (combo.result.meetsWCAGAA) {
        totalPassed++;
      } else {
        totalFailed++;
      }

      report += `### ${combo.name}\n`;
      report += `- Foreground: ${combo.foreground}\n`;
      report += `- Background: ${combo.background}\n`;
      report += `- Contrast Ratio: ${combo.result.contrastRatio.toFixed(2)}:1\n`;
      report += `- Required: ${combo.result.requiredRatio}:1\n`;
      report += `- Status: ${status}\n\n`;
    }
  }

  report += `## Summary\n\n`;
  report += `- Total combinations: ${totalCombinations}\n`;
  report += `- Passed: ${totalPassed}\n`;
  report += `- Failed: ${totalFailed}\n`;

  // Write report
  const reportPath = join(process.cwd(), 'THEME_CONTRAST_REPORT.md');
  writeFileSync(reportPath, report, 'utf-8');

  console.log(`✅ Validation complete!`);
  console.log(`📄 Report written to: ${reportPath}`);
  console.log(`\n📊 Summary:`);
  console.log(`   - Total combinations: ${totalCombinations}`);
  console.log(`   - Passed: ${totalPassed}`);
  console.log(`   - Failed: ${totalFailed}`);
}

if (require.main === module) {
  runValidation();
}

export { runValidation };

