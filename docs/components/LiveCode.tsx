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
  theme?: 'nostromo' | 'mother' | 'lv-426' | 'sulaco'
  colorScheme?: 'light' | 'dark'
  storyId?: string
}

export default function LiveCode({ 
  code, 
  noInline = false, 
  theme = 'nostromo',
  colorScheme = 'light',
  storyId 
}: LiveCodeProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [currentColorScheme, setCurrentColorScheme] = useState(colorScheme)
  const previewRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Reset loading state when code changes
    setIsLoading(true)
    setHasError(false)
    // Set loading to false after a short delay to allow component to render
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [code])

  // Set theme attributes on preview container
  useEffect(() => {
    if (!previewRef.current) return
    const container = previewRef.current.querySelector('[data-theme]') || previewRef.current
    if (container instanceof HTMLElement) {
      container.setAttribute('data-theme', theme)
      container.setAttribute('data-color-scheme', currentColorScheme)
    }
  }, [theme, currentColorScheme, isLoading])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }
  
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
        <div className="border border-border rounded-xl overflow-hidden shadow-lg bg-card">
          {/* Panel header with actions */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm font-medium text-muted-foreground">Live Example</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentColorScheme(currentColorScheme === 'light' ? 'dark' : 'light')}
                className="px-3 py-1.5 text-xs font-medium rounded-md bg-background border border-border hover:bg-muted transition-colors text-foreground"
                title="Toggle theme"
              >
                {currentColorScheme === 'light' ? '🌙' : '☀️'}
              </button>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-xs font-medium rounded-md bg-background border border-border hover:bg-muted transition-colors text-foreground"
                title="Copy code"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
              {storyId ? (
                <a
                  href={`https://jarllyng.github.io/nostromo-ui/storybook-static/?path=/story/${encodeURIComponent(storyId)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-background border border-border hover:bg-muted transition-colors text-foreground"
                >
                  Storybook →
                </a>
              ) : (
                <a
                  href="https://jarllyng.github.io/nostromo-ui/storybook-static/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-medium rounded-md bg-background border border-border hover:bg-muted transition-colors text-foreground"
                >
                  Storybook →
                </a>
              )}
            </div>
          </div>
          <div className="p-6 bg-background relative min-h-[100px]">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
                </div>
              </div>
            )}
            <div 
              ref={previewRef}
              style={{ display: isLoading ? 'none' : 'block' }}
              data-theme={theme}
              data-color-scheme={currentColorScheme}
            >
              <LivePreview />
            </div>
            <LiveError 
              className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-800 dark:text-red-200 text-sm"
            />
          </div>
          <details className="border-t border-border">
            <summary className="px-4 py-3 bg-muted/30 cursor-pointer text-sm font-medium text-foreground hover:bg-muted/50 transition-colors flex items-center justify-between">
              <span>View Code</span>
              <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="bg-neutral-950 border-t border-border">
              <LiveEditor
                style={{
                  fontFamily: 'var(--font-mono), "Fira Code", "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace',
                  fontSize: '14px',
                  padding: '20px',
                  lineHeight: '1.6',
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

