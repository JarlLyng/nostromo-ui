'use client'

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import * as Nostromo from '@nostromo/ui-core'
import * as NostromoMarketing from '@nostromo/ui-marketing'
import React, { useState, useEffect, useRef } from 'react'

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
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Reset loading state when code changes
    setIsLoading(true)
    setHasError(false)
    // Set loading to false after a short delay to allow component to render
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [code])

  // Ensure CSS is available in the preview container
  // This is a fallback for react-live's isolated rendering context
  useEffect(() => {
    if (!previewRef.current) return

    // Check if CSS is already loaded by testing for a CSS variable
    const testElement = previewRef.current.querySelector('[data-theme]') || previewRef.current
    const computedStyle = window.getComputedStyle(testElement as Element)
    const brandColor = computedStyle.getPropertyValue('--color-brand-500')
    
    // If CSS variables are not available, the global CSS from _app.tsx should handle it
    // This effect just ensures the theme attributes are set correctly
    if (testElement instanceof HTMLElement) {
      testElement.setAttribute('data-theme', 'nostromo')
      testElement.setAttribute('data-color-scheme', 'light')
    }
  }, [isLoading])
  
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
      if (!transformedCode.includes('render(')) {
        transformedCode = `${transformedCode}\n\nrender(<${componentName} />)`;
      }
    } else {
      // Fallback: try to extract any default export
      transformedCode = transformedCode
        .replace(/export\s+default\s+/g, '')
        .trim();
      
      // If we still have a function, try to extract it
      const fallbackMatch = transformedCode.match(/function\s+(\w+)\s*\(/);
      if (fallbackMatch && !transformedCode.includes('render(')) {
        transformedCode = `${transformedCode}\n\nrender(<${fallbackMatch[1]} />)`;
      } else if (!transformedCode.includes('render(')) {
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
    } else if (!functionMatch && !transformedCode.includes('render(')) {
      // No function found, wrap in component
      transformedCode = `const Component = () => (${transformedCode})\n\nrender(<Component />)`;
    }
  }
  
  return (
    <div className="my-6">
      <LiveProvider code={transformedCode} scope={scope} noInline={needsNoInline}>
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 border-b border-gray-200 dark:border-gray-800">
            <span className="text-sm text-gray-600 dark:text-gray-400">Live Example</span>
          </div>
          <div className="p-4 bg-white dark:bg-gray-950 relative min-h-[100px]">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-950">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
                </div>
              </div>
            )}
            <div 
              ref={previewRef}
              style={{ display: isLoading ? 'none' : 'block' }}
              data-theme="nostromo"
              data-color-scheme="light"
            >
              <LivePreview />
            </div>
            <LiveError 
              className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-800 dark:text-red-200 text-sm"
            />
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

