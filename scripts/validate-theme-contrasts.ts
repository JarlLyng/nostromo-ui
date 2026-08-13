#!/usr/bin/env tsx
/**
 * Theme Contrast Validation Script
 *
 * Validates all semantic token color combinations in themes for WCAG AA compliance
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import {
  validateContrast,
  type ColorCombination,
} from "../packages/nostromo/src/lib/contrast-validator";
import {
  extractBlock,
  resolveToken,
} from "../packages/nostromo/src/test/theme-tokens";

interface ThemeValidation {
  theme: string;
  mode: "light" | "dark";
  combinations: Array<{
    name: string;
    foreground: string;
    background: string;
    result: ReturnType<typeof validateContrast>;
  }>;
}

/**
 * Validates a theme file
 */
function validateTheme(
  themePath: string,
  themeName: string,
): ThemeValidation[] {
  const content = readFileSync(themePath, "utf-8");
  const results: ThemeValidation[] = [];

  // Validate light mode
  const lightCombinations: ThemeValidation["combinations"] = [];

  // Get semantic token values for light mode
  const lightForeground = resolveToken(content, content, "foreground");
  const lightBackground = resolveToken(content, content, "background");
  const lightMutedForeground = resolveToken(
    content,
    content,
    "muted-foreground",
  );
  const lightMuted = resolveToken(content, content, "muted");
  const lightCardForeground = resolveToken(content, content, "card-foreground");
  const lightCard = resolveToken(content, content, "card");
  const lightPopoverForeground = resolveToken(
    content,
    content,
    "popover-foreground",
  );
  const lightPopover = resolveToken(content, content, "popover");
  const lightPrimaryForeground = resolveToken(
    content,
    content,
    "primary-foreground",
  );
  const lightPrimary = resolveToken(content, content, "primary");
  const lightSecondaryForeground = resolveToken(
    content,
    content,
    "secondary-foreground",
  );
  const lightSecondary = resolveToken(content, content, "secondary");

  // Validate key combinations
  lightCombinations.push({
    name: "foreground/background",
    foreground: lightForeground,
    background: lightBackground,
    result: validateContrast(lightForeground, lightBackground, "normal"),
  });

  lightCombinations.push({
    name: "muted-foreground/muted",
    foreground: lightMutedForeground,
    background: lightMuted,
    result: validateContrast(lightMutedForeground, lightMuted, "normal"),
  });

  lightCombinations.push({
    name: "card-foreground/card",
    foreground: lightCardForeground,
    background: lightCard,
    result: validateContrast(lightCardForeground, lightCard, "normal"),
  });

  lightCombinations.push({
    name: "popover-foreground/popover",
    foreground: lightPopoverForeground,
    background: lightPopover,
    result: validateContrast(lightPopoverForeground, lightPopover, "normal"),
  });

  lightCombinations.push({
    name: "primary-foreground/primary",
    foreground: lightPrimaryForeground,
    background: lightPrimary,
    result: validateContrast(lightPrimaryForeground, lightPrimary, "normal"),
  });

  lightCombinations.push({
    name: "secondary-foreground/secondary",
    foreground: lightSecondaryForeground,
    background: lightSecondary,
    result: validateContrast(
      lightSecondaryForeground,
      lightSecondary,
      "normal",
    ),
  });

  results.push({
    theme: themeName,
    mode: "light",
    combinations: lightCombinations,
  });

  // Validate dark mode (if dark mode section exists)
  if (content.includes('[data-color-scheme="dark"]')) {
    // The whole declaration block, not up to the first '}': these files nest
    // media queries, and cutting early left the neutral scale outside the slice
    // so every var() reference silently fell back to a default.
    const darkSection = extractBlock(content, '[data-color-scheme="dark"]');
    const darkCombinations: ThemeValidation["combinations"] = [];

    const darkForeground = resolveToken(darkSection, content, "foreground");
    const darkBackground = resolveToken(darkSection, content, "background");
    const darkMutedForeground = resolveToken(
      darkSection,
      content,
      "muted-foreground",
    );
    const darkMuted = resolveToken(darkSection, content, "muted");
    const darkCardForeground = resolveToken(
      darkSection,
      content,
      "card-foreground",
    );
    const darkCard = resolveToken(darkSection, content, "card");
    const darkPopoverForeground = resolveToken(
      darkSection,
      content,
      "popover-foreground",
    );
    const darkPopover = resolveToken(darkSection, content, "popover");
    const darkPrimaryForeground = resolveToken(
      darkSection,
      content,
      "primary-foreground",
    );
    const darkPrimary = resolveToken(darkSection, content, "primary");
    const darkSecondaryForeground = resolveToken(
      darkSection,
      content,
      "secondary-foreground",
    );
    const darkSecondary = resolveToken(darkSection, content, "secondary");

    darkCombinations.push({
      name: "foreground/background",
      foreground: darkForeground,
      background: darkBackground,
      result: validateContrast(darkForeground, darkBackground, "normal"),
    });

    darkCombinations.push({
      name: "muted-foreground/muted",
      foreground: darkMutedForeground,
      background: darkMuted,
      result: validateContrast(darkMutedForeground, darkMuted, "normal"),
    });

    darkCombinations.push({
      name: "card-foreground/card",
      foreground: darkCardForeground,
      background: darkCard,
      result: validateContrast(darkCardForeground, darkCard, "normal"),
    });

    darkCombinations.push({
      name: "popover-foreground/popover",
      foreground: darkPopoverForeground,
      background: darkPopover,
      result: validateContrast(darkPopoverForeground, darkPopover, "normal"),
    });

    darkCombinations.push({
      name: "primary-foreground/primary",
      foreground: darkPrimaryForeground,
      background: darkPrimary,
      result: validateContrast(darkPrimaryForeground, darkPrimary, "normal"),
    });

    darkCombinations.push({
      name: "secondary-foreground/secondary",
      foreground: darkSecondaryForeground,
      background: darkSecondary,
      result: validateContrast(
        darkSecondaryForeground,
        darkSecondary,
        "normal",
      ),
    });

    results.push({
      theme: themeName,
      mode: "dark",
      combinations: darkCombinations,
    });
  }

  return results;
}

/**
 * Main validation function
 */
function runValidation(): void {
  console.log("🎨 Validating theme contrasts...\n");

  const themes = [
    { name: "nostromo", path: "packages/nostromo/src/themes/nostromo.css" },
    { name: "mother", path: "packages/nostromo/src/themes/mother.css" },
    { name: "lv-426", path: "packages/nostromo/src/themes/lv-426.css" },
    { name: "sulaco", path: "packages/nostromo/src/themes/sulaco.css" },
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
      const status = combo.result.meetsWCAGAA ? "✅ PASS" : "❌ FAIL";
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
  const reportPath = join(process.cwd(), "THEME_CONTRAST_REPORT.md");
  writeFileSync(reportPath, report, "utf-8");

  console.log(`✅ Validation complete!`);
  console.log(`📄 Report written to: ${reportPath}`);
  console.log(`\n📊 Summary:`);
  console.log(`   - Total combinations: ${totalCombinations}`);
  console.log(`   - Passed: ${totalPassed}`);
  console.log(`   - Failed: ${totalFailed}`);
}

// The repo is "type": "module", so require.main does not exist. These scripts
// are only ever run as a CLI entry point, so just invoke it.
runValidation();

export { runValidation };
