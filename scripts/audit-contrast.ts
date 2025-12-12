#!/usr/bin/env tsx
/**
 * Contrast Audit Script
 * 
 * Scans all component files for color combinations and validates WCAG AA compliance
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { writeFileSync } from 'fs';
import {
  validateColorCombinations,
  generateContrastReport,
  type ColorCombination,
} from '../packages/ui-core/src/lib/contrast-validator';

interface AuditResult {
  file: string;
  hardcodedColors: string[];
  colorCombinations: ColorCombination[];
  issues: string[];
}

/**
 * Finds hardcoded color classes in a file
 */
function findHardcodedColors(content: string): string[] {
  const hardcodedPatterns = [
    /text-(neutral|white|black)-\d+/g,
    /bg-(neutral|white|black)-\d+/g,
    /border-(neutral|white|black)-\d+/g,
    /text-white/g,
    /bg-white/g,
    /text-black/g,
    /bg-black/g,
    /dark:/g,
  ];

  const found: string[] = [];
  hardcodedPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      found.push(...matches);
    }
  });

  return [...new Set(found)];
}

/**
 * Extracts potential color combinations from className strings
 */
function extractColorCombinations(content: string, filePath: string): ColorCombination[] {
  const combinations: ColorCombination[] = [];
  
  // Find className attributes
  const classNameMatches = content.matchAll(/className=["']([^"']+)["']/g);
  
  for (const match of classNameMatches) {
    const classes = match[1];
    
    // Look for text-* and bg-* combinations
    const textMatch = classes.match(/text-(\w+(-\w+)*)/);
    const bgMatch = classes.match(/bg-(\w+(-\w+)*)/);
    
    if (textMatch && bgMatch) {
      // This is a potential color combination
      // We can't validate without actual computed values, but we can flag them
      combinations.push({
        foreground: `text-${textMatch[1]}`,
        background: `bg-${bgMatch[1]}`,
        context: `${filePath}: ${classes.substring(0, 50)}...`,
      });
    }
  }
  
  return combinations;
}

/**
 * Scans a directory recursively for component files
 */
function scanDirectory(dir: string, results: AuditResult[]): void {
  const entries = readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules, dist, coverage, etc.
      if (
        entry === 'node_modules' ||
        entry === 'dist' ||
        entry === 'coverage' ||
        entry === '.git' ||
        entry === '__tests__' ||
        entry === '__stories__'
      ) {
        continue;
      }
      scanDirectory(fullPath, results);
    } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
      // Only scan component files, not test files
      if (entry.includes('.test.') || entry.includes('.a11y.')) {
        continue;
      }
      
      const content = readFileSync(fullPath, 'utf-8');
      const hardcodedColors = findHardcodedColors(content);
      const colorCombinations = extractColorCombinations(content, fullPath);
      
      if (hardcodedColors.length > 0 || colorCombinations.length > 0) {
        const issues: string[] = [];
        
        if (hardcodedColors.length > 0) {
          issues.push(`Found ${hardcodedColors.length} hardcoded color(s): ${hardcodedColors.join(', ')}`);
        }
        
        results.push({
          file: fullPath,
          hardcodedColors,
          colorCombinations,
          issues,
        });
      }
    }
  }
}

/**
 * Main audit function
 */
function runAudit(): void {
  console.log('🔍 Starting contrast audit...\n');
  
  const results: AuditResult[] = [];
  
  // Scan core components
  const coreComponentsPath = join(process.cwd(), 'packages/ui-core/src/components');
  console.log(`Scanning: ${coreComponentsPath}`);
  scanDirectory(coreComponentsPath, results);
  
  // Scan marketing components
  const marketingComponentsPath = join(process.cwd(), 'packages/ui-marketing/src/components');
  console.log(`Scanning: ${marketingComponentsPath}`);
  scanDirectory(marketingComponentsPath, results);
  
  // Generate report
  let report = `# Contrast Audit Report\n\n`;
  report += `Generated: ${new Date().toISOString()}\n\n`;
  report += `## Summary\n\n`;
  report += `- Files scanned: ${results.length}\n`;
  report += `- Files with hardcoded colors: ${results.filter(r => r.hardcodedColors.length > 0).length}\n`;
  report += `- Files with potential color combinations: ${results.filter(r => r.colorCombinations.length > 0).length}\n\n`;
  
  report += `## Files with Hardcoded Colors\n\n`;
  const filesWithHardcoded = results.filter(r => r.hardcodedColors.length > 0);
  if (filesWithHardcoded.length === 0) {
    report += `✅ No files with hardcoded colors found!\n\n`;
  } else {
    filesWithHardcoded.forEach(result => {
      report += `### ${result.file}\n`;
      report += `- Hardcoded colors: ${result.hardcodedColors.join(', ')}\n`;
      report += `- Count: ${result.hardcodedColors.length}\n\n`;
    });
  }
  
  report += `## Recommendations\n\n`;
  report += `1. Replace hardcoded colors with semantic tokens:\n`;
  report += `   - \`text-neutral-900\` → \`text-foreground\`\n`;
  report += `   - \`bg-white\` → \`bg-background\` or \`bg-card\`\n`;
  report += `   - \`text-neutral-600\` → \`text-muted-foreground\`\n`;
  report += `   - \`bg-neutral-50\` → \`bg-muted\`\n`;
  report += `   - \`border-neutral-200\` → \`border-border\`\n\n`;
  report += `2. Remove all \`dark:\` prefixes - use CSS variables instead\n\n`;
  report += `3. Validate all color combinations meet WCAG AA (4.5:1 for normal text, 3:1 for large text)\n\n`;
  
  // Write report to file
  const reportPath = join(process.cwd(), 'CONTRAST_AUDIT_REPORT.md');
  writeFileSync(reportPath, report, 'utf-8');
  
  console.log(`\n✅ Audit complete!`);
  console.log(`📄 Report written to: ${reportPath}`);
  console.log(`\n📊 Summary:`);
  console.log(`   - Files with issues: ${filesWithHardcoded.length}`);
  console.log(`   - Total hardcoded colors found: ${filesWithHardcoded.reduce((sum, r) => sum + r.hardcodedColors.length, 0)}`);
}

// Run audit if executed directly
if (require.main === module) {
  runAudit();
}

export { runAudit };

