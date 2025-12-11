'use client'

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import * as Nostromo from '@nostromo/ui-core'
import * as NostromoMarketing from '@nostromo/ui-marketing'
import React from 'react'

// Scope for live code examples - includes all Nostromo components
const scope = {
  React,
  ...Nostromo,
  ...NostromoMarketing,
  // Explicitly add commonly used components for better IDE support
  Hero: NostromoMarketing.Hero,
  Features: NostromoMarketing.Features,
  Testimonials: NostromoMarketing.Testimonials,
  Pricing: NostromoMarketing.Pricing,
  Gallery: NostromoMarketing.Gallery,
  LogoWall: NostromoMarketing.LogoWall,
  Button: Nostromo.Button,
  Input: Nostromo.Input,
  // React hooks
  useState: React.useState,
  useEffect: React.useEffect,
  useRef: React.useRef,
  useCallback: React.useCallback,
  useMemo: React.useMemo,
  // Helper function for rendering
  render: (component: React.ReactElement) => component,
}

interface LiveCodeProps {
  code: string
  noInline?: boolean
}

export default function LiveCode({ code, noInline = false }: LiveCodeProps) {
  // Transform code to work with react-live
  // Remove import statements since components are already in scope
  let transformedCode = code.trim()
  
  // Remove all import statements (they're not needed since components are in scope)
  // Split by lines and filter out import lines
  const lines = transformedCode.split('\n')
  const filteredLines = lines.filter(line => {
    const trimmed = line.trim()
    // Remove lines that start with "import" (handles both single and multi-line)
    return !trimmed.startsWith('import ') && !trimmed.startsWith('import\t')
  })
  transformedCode = filteredLines.join('\n').trim()
  
  // Auto-detect if code needs noInline (has export default or complex JSX)
  const needsNoInline = noInline || code.includes('export default') || code.includes('React.Fragment')
  
  // Handle export default functions - must check BEFORE removing export default
  if (needsNoInline && transformedCode.includes('export default')) {
    // Extract component name from "export default function ComponentName() { ... }"
    const functionMatch = transformedCode.match(/export\s+default\s+function\s+(\w+)\s*\([^)]*\)\s*{/);
    
    if (functionMatch) {
      const componentName = functionMatch[1];
      // Remove "export default" and keep the function
      transformedCode = transformedCode
        .replace(/export\s+default\s+function\s+(\w+)/g, 'function $1')
        .trim();
      
      // Add render() call at the end - this is required for noInline mode
      transformedCode = `${transformedCode}\n\nrender(<${componentName} />)`;
    } else {
      // Fallback: try to extract any default export
      transformedCode = transformedCode
        .replace(/export\s+default\s+/g, '')
        .trim();
      
      // If we still have a function, try to extract it
      const fallbackMatch = transformedCode.match(/function\s+(\w+)\s*\(/);
      if (fallbackMatch) {
        transformedCode = `${transformedCode}\n\nrender(<${fallbackMatch[1]} />)`;
      } else {
        // Last resort: wrap in render() - create a component and render it
        const lastBraceIndex = transformedCode.lastIndexOf('}');
        if (lastBraceIndex > 0) {
          // Extract the return statement or component body
          transformedCode = `const Component = () => ${transformedCode}\n\nrender(<Component />)`;
        } else {
          // If no braces, assume it's JSX
          transformedCode = `const Component = () => (${transformedCode})\n\nrender(<Component />)`;
        }
      }
    }
  } else if (needsNoInline && !transformedCode.includes('export default')) {
    // Code was already transformed (imports removed), but still needs noInline
    // Check if it's a function declaration
    const functionMatch = transformedCode.match(/function\s+(\w+)\s*\([^)]*\)\s*{/);
    if (functionMatch && !transformedCode.includes('render(')) {
      const componentName = functionMatch[1];
      transformedCode = `${transformedCode}\n\nrender(<${componentName} />)`;
    }
  }
  
  return (
    <div className="my-6">
      <LiveProvider code={transformedCode} scope={scope} noInline={needsNoInline}>
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 border-b border-gray-200 dark:border-gray-800">
            <span className="text-sm text-gray-600 dark:text-gray-400">Live Example</span>
          </div>
          <div className="p-4 bg-white dark:bg-gray-950">
            <LivePreview />
            <LiveError className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-800 dark:text-red-200 text-sm" />
          </div>
          <details className="border-t border-gray-200 dark:border-gray-800">
            <summary className="px-4 py-2 bg-gray-50 dark:bg-gray-900 cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              View Code
            </summary>
            <div className="bg-gray-950">
              <LiveEditor
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                  fontSize: '14px',
                  padding: '16px',
                }}
                className="min-h-[200px]"
              />
            </div>
          </details>
        </div>
      </LiveProvider>
    </div>
  )
}

