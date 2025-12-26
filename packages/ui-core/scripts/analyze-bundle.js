#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes bundle sizes and generates a report
 */

import { readFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = join(__dirname, '../dist');

/**
 * Format bytes to human readable format
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get file size
 */
function getFileSize(filePath) {
  try {
    const stats = statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

/**
 * Analyze bundle sizes
 */
function analyzeBundles() {
  console.log('\n📊 Bundle Size Analysis\n');
  console.log('='.repeat(60));
  
  const components = [
    'button.js',
    'input.js',
    'dialog.js',
    'select.js',
    'charts.js',
    'data-table.js',
    'calendar.js',
    'icon.js',
    'index.js',
  ];
  
  const results = [];
  
  for (const component of components) {
    const esmPath = join(distDir, 'components', component);
    const cjsPath = join(distDir, 'components', component.replace('.js', '.cjs'));
    const indexPath = component === 'index.js' ? join(distDir, component) : null;
    
    let esmSize = 0;
    let cjsSize = 0;
    
    if (indexPath && component === 'index.js') {
      esmSize = getFileSize(indexPath);
      cjsSize = getFileSize(indexPath.replace('.js', '.cjs'));
    } else {
      esmSize = getFileSize(esmPath);
      cjsSize = getFileSize(cjsPath);
    }
    
    if (esmSize > 0 || cjsSize > 0) {
      results.push({
        name: component,
        esm: esmSize,
        cjs: cjsSize,
        total: esmSize + cjsSize,
      });
    }
  }
  
  // Sort by total size (descending)
  results.sort((a, b) => b.total - a.total);
  
  console.log('\nComponent Bundle Sizes:\n');
  console.log('Component'.padEnd(20) + 'ESM'.padEnd(15) + 'CJS'.padEnd(15) + 'Total');
  console.log('-'.repeat(60));
  
  let totalEsm = 0;
  let totalCjs = 0;
  
  for (const result of results) {
    totalEsm += result.esm;
    totalCjs += result.cjs;
    console.log(
      result.name.padEnd(20) +
      formatBytes(result.esm).padEnd(15) +
      formatBytes(result.cjs).padEnd(15) +
      formatBytes(result.total)
    );
  }
  
  console.log('-'.repeat(60));
  console.log(
    'TOTAL'.padEnd(20) +
    formatBytes(totalEsm).padEnd(15) +
    formatBytes(totalCjs).padEnd(15) +
    formatBytes(totalEsm + totalCjs)
  );
  
  console.log('\n' + '='.repeat(60));
  console.log('\n💡 Tips:');
  console.log('  - Use individual component imports for tree-shaking');
  console.log('  - Lazy load heavy components (Charts, DataTable, Calendar)');
  console.log('  - Check size limits with: pnpm size\n');
  
  return results;
}

// Run analysis
try {
  analyzeBundles();
} catch (error) {
  console.error('Error analyzing bundles:', error);
  process.exit(1);
}

