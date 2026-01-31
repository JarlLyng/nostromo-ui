'use client'

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import * as Nostromo from '@jarllyng/nostromo'
import React, { useState, useEffect, useRef } from 'react'

// Scope for live code examples - includes all Nostromo components
const scope = {
  React,
  ...Nostromo,
  // Explicitly add commonly used components for better IDE support
  Hero: Nostromo.Hero,
  Features: Nostromo.Features,
  Testimonials: Nostromo.Testimonials,
  Pricing: Nostromo.Pricing,
  Gallery: Nostromo.Gallery,
  LogoWall: Nostromo.LogoWall,
  Button: Nostromo.Button,
  Input: Nostromo.Input,
  // React hooks
  useState: React.useState,
  useEffect: React.useEffect,
  useRef: React.useRef,
  useCallback: React.useCallback,
  useMemo: React.useMemo,
  // Add render() function to scope - in noInline mode, react-live expects the last expression
  // to be what gets rendered, so render() should just return its argument
  render: (element: React.ReactElement) => element,
}

export interface LiveCodeProps {
  code: string
  noInline?: boolean
  theme?: 'nostromo' | 'mother' | 'lv-426' | 'sulaco'
  colorScheme?: 'light' | 'dark'
  storyId?: string
}

export default function LiveCodeClient({
  code,
  noInline = false,
  theme = 'nostromo',
  colorScheme = 'light',
  storyId
}: LiveCodeProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [currentColorScheme, setCurrentColorScheme] = useState(colorScheme)
  const [resetKey, setResetKey] = useState(0)
  const previewRef = useRef<HTMLDivElement>(null)
  const styleInjectedRef = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Inject CSS on client side only to avoid hydration errors
  useEffect(() => {
    if (!mounted || styleInjectedRef.current || typeof document === 'undefined') return

    // Check if style already exists
    const existingStyle = document.getElementById('livecode-preview-styles')
    if (existingStyle) {
      styleInjectedRef.current = true
      return
    }

    // Inject comprehensive CSS directly - Tailwind CSS classes need to be available
    const style = document.createElement('style')
    style.id = 'livecode-preview-styles'
    style.textContent = `
      /* LiveCode Preview CSS - Ensures Tailwind utility classes work */
      * { box-sizing: border-box; margin: 0; padding: 0; }
      [data-theme] {
        --tw-bg-brand-50: hsl(var(--color-brand-50));
        --tw-bg-brand-100: hsl(var(--color-brand-100));
        --tw-bg-brand-200: hsl(var(--color-brand-200));
        --tw-bg-brand-300: hsl(var(--color-brand-300));
        --tw-bg-brand-400: hsl(var(--color-brand-400));
        --tw-bg-brand-500: hsl(var(--color-brand-500));
        --tw-bg-brand-600: hsl(var(--color-brand-600));
        --tw-bg-brand-700: hsl(var(--color-brand-700));
        --tw-bg-brand-800: hsl(var(--color-brand-800));
        --tw-bg-brand-900: hsl(var(--color-brand-900));
        --tw-bg-brand-950: hsl(var(--color-brand-950));
        --tw-bg-neutral-50: hsl(var(--color-neutral-50));
        --tw-bg-neutral-100: hsl(var(--color-neutral-100));
        --tw-bg-neutral-200: hsl(var(--color-neutral-200));
        --tw-bg-neutral-300: hsl(var(--color-neutral-300));
        --tw-bg-neutral-400: hsl(var(--color-neutral-400));
        --tw-bg-neutral-500: hsl(var(--color-neutral-500));
        --tw-bg-neutral-600: hsl(var(--color-neutral-600));
        --tw-bg-neutral-700: hsl(var(--color-neutral-700));
        --tw-bg-neutral-800: hsl(var(--color-neutral-800));
        --tw-bg-neutral-900: hsl(var(--color-neutral-900));
        --tw-bg-neutral-950: hsl(var(--color-neutral-950));
        --tw-bg-success-500: hsl(var(--color-success-500));
        --tw-bg-success-600: hsl(var(--color-success-600));
        --tw-bg-error-500: hsl(var(--color-error-500));
        --tw-bg-error-600: hsl(var(--color-error-600));
        --tw-bg-warning-500: hsl(var(--color-warning-500));
        --tw-bg-warning-600: hsl(var(--color-warning-600));
        --tw-bg-info-500: hsl(var(--color-info-500));
        --tw-bg-info-600: hsl(var(--color-info-600));
        --tw-text-success: hsl(var(--color-success-foreground));
        --tw-text-error: hsl(var(--color-error-foreground));
        --tw-text-warning: hsl(var(--color-warning-foreground));
        --tw-text-info: hsl(var(--color-info-foreground));
      }
      [data-theme] .bg-brand-500 { background-color: var(--tw-bg-brand-500); }
      [data-theme] .bg-brand-600 { background-color: var(--tw-bg-brand-600); }
      [data-theme] .bg-error-500 { background-color: var(--tw-bg-error-500); }
      [data-theme] .bg-error-600 { background-color: var(--tw-bg-error-600); }
      [data-theme] .bg-success-500 { background-color: var(--tw-bg-success-500); }
      [data-theme] .bg-success-600 { background-color: var(--tw-bg-success-600); }
      [data-theme] .bg-neutral-50 { background-color: var(--tw-bg-neutral-50); }
      [data-theme] .bg-neutral-100 { background-color: var(--tw-bg-neutral-100); }
      [data-theme] .bg-neutral-200 { background-color: var(--tw-bg-neutral-200); }
      [data-theme] .bg-neutral-300 { background-color: var(--tw-bg-neutral-300); }
      [data-theme] .bg-neutral-400 { background-color: var(--tw-bg-neutral-400); }
      [data-theme] .bg-neutral-500 { background-color: var(--tw-bg-neutral-500); }
      [data-theme] .bg-neutral-600 { background-color: var(--tw-bg-neutral-600); }
      [data-theme] .bg-neutral-700 { background-color: var(--tw-bg-neutral-700); }
      [data-theme] .bg-neutral-800 { background-color: var(--tw-bg-neutral-800); }
      [data-theme] .bg-neutral-900 { background-color: var(--tw-bg-neutral-900); }
      [data-theme] .bg-neutral-950 { background-color: var(--tw-bg-neutral-950); }
      [data-theme] .text-brand-500 { color: var(--tw-bg-brand-500); }
      [data-theme] .text-brand-600 { color: var(--tw-bg-brand-600); }
      [data-theme] .text-success { color: var(--tw-text-success); }
      [data-theme] .text-error { color: var(--tw-text-error); }
      [data-theme] .text-destructive { color: var(--tw-bg-error-500); }
      [data-theme] .text-muted-foreground { color: hsl(var(--color-neutral-500)); }
      [data-theme] .text-foreground { color: hsl(var(--color-foreground)); }
      [data-theme] .text-white { color: hsl(0 0% 100%); }
      [data-theme] .border-brand-500 { border-color: var(--tw-bg-brand-500); }
      [data-theme] .border-error-500 { border-color: var(--tw-bg-error-500); }
      [data-theme] .border-success-500 { border-color: var(--tw-bg-success-500); }
      [data-theme] .border-neutral-200 { border-color: var(--tw-bg-neutral-200); }
      [data-theme] .border-neutral-300 { border-color: var(--tw-bg-neutral-300); }
      [data-theme] .border-neutral-400 { border-color: var(--tw-bg-neutral-400); }
      [data-theme] .border-border { border-color: hsl(var(--color-border)); }
      [data-theme] .hover\\:bg-brand-600:hover { background-color: var(--tw-bg-brand-600); }
      [data-theme] .hover\\:bg-error-600:hover { background-color: var(--tw-bg-error-600); }
      [data-theme] .hover\\:bg-success-600:hover { background-color: var(--tw-bg-success-600); }
      [data-theme] .hover\\:bg-neutral-50:hover { background-color: var(--tw-bg-neutral-50); }
      [data-theme] .hover\\:bg-neutral-100:hover { background-color: var(--tw-bg-neutral-100); }
      [data-theme] .hover\\:bg-neutral-200:hover { background-color: var(--tw-bg-neutral-200); }
      [data-theme] .hover\\:border-brand-500:hover { border-color: var(--tw-bg-brand-500); }
      [data-theme] .hover\\:text-brand-600:hover { color: var(--tw-bg-brand-600); }
      [data-theme] .focus-visible\\:ring-brand-500\\/20:focus-visible { --tw-ring-color: hsl(var(--color-brand-500) / 0.2); box-shadow: 0 0 0 2px hsl(var(--color-brand-500) / 0.2); }
      [data-theme] .focus-visible\\:ring-error-500\\/20:focus-visible { --tw-ring-color: hsl(var(--color-error-500) / 0.2); box-shadow: 0 0 0 2px hsl(var(--color-error-500) / 0.2); }
      [data-theme] .focus-visible\\:ring-success-500\\/20:focus-visible { --tw-ring-color: hsl(var(--color-success-500) / 0.2); box-shadow: 0 0 0 2px hsl(var(--color-success-500) / 0.2); }
      [data-theme] .focus-visible\\:border-brand-500:focus-visible { border-color: var(--tw-bg-brand-500); }
      [data-theme] .focus-visible\\:border-error-500:focus-visible { border-color: var(--tw-bg-error-500); }
      [data-theme] .focus-visible\\:border-success-500:focus-visible { border-color: var(--tw-bg-success-500); }
      [data-theme] .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
      [data-theme] .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
      [data-theme] .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
      [data-theme] .hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
      [data-theme] .focus-visible\\:shadow-md:focus-visible { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
      [data-theme] .p-2 { padding: 0.5rem; }
      [data-theme] .p-3 { padding: 0.75rem; }
      [data-theme] .p-4 { padding: 1rem; }
      [data-theme] .p-6 { padding: 1.5rem; }
      [data-theme] .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
      [data-theme] .px-2\\.5 { padding-left: 0.625rem; padding-right: 0.625rem; }
      [data-theme] .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
      [data-theme] .px-4 { padding-left: 1rem; padding-right: 1rem; }
      [data-theme] .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
      [data-theme] .px-8 { padding-left: 2rem; padding-right: 2rem; }
      [data-theme] .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
      [data-theme] .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
      [data-theme] .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
      [data-theme] .mb-2 { margin-bottom: 0.5rem; }
      [data-theme] .mt-2 { margin-top: 0.5rem; }
      [data-theme] .mr-2 { margin-right: 0.5rem; }
      [data-theme] .ml-2 { margin-left: 0.5rem; }
      [data-theme] .gap-2 { gap: 0.5rem; }
      [data-theme] .gap-3 { gap: 0.75rem; }
      [data-theme] .gap-4 { gap: 1rem; }
      [data-theme] .flex { display: flex; }
      [data-theme] .inline-flex { display: inline-flex; }
      [data-theme] .items-center { align-items: center; }
      [data-theme] .justify-center { justify-content: center; }
      [data-theme] .w-full { width: 100%; }
      [data-theme] .h-8 { height: 2rem; }
      [data-theme] .h-10 { height: 2.5rem; }
      [data-theme] .h-11 { height: 2.75rem; }
      [data-theme] .rounded-md { border-radius: 0.375rem; }
      [data-theme] .rounded-sm { border-radius: 0.125rem; }
      [data-theme] .rounded-lg { border-radius: 0.5rem; }
      [data-theme] .text-xs { font-size: 0.75rem; line-height: 1rem; }
      [data-theme] .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
      [data-theme] .text-base { font-size: 1rem; line-height: 1.5rem; }
      [data-theme] .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
      [data-theme] .font-medium { font-weight: 500; }
      [data-theme] .font-semibold { font-weight: 600; }
      [data-theme] .bg-background { background-color: hsl(var(--color-background)); }
      [data-theme] .bg-primary { background-color: hsl(var(--color-primary)); }
      [data-theme] .bg-secondary { background-color: hsl(var(--color-secondary)); }
      [data-theme] .bg-muted { background-color: hsl(var(--color-muted)); }
      [data-theme] .bg-destructive { background-color: hsl(var(--color-destructive)); }
      [data-theme] .text-primary { color: hsl(var(--color-primary)); }
      [data-theme] .text-primary-foreground { color: hsl(var(--color-primary-foreground)); }
      [data-theme] .text-secondary-foreground { color: hsl(var(--color-secondary-foreground)); }
      [data-theme] .text-destructive-foreground { color: hsl(var(--color-destructive-foreground)); }
      [data-theme] .ring-offset-background { --tw-ring-offset-color: hsl(var(--color-background)); }
      [data-theme] .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
      [data-theme] .duration-200 { transition-duration: 200ms; }
      [data-theme] .opacity-50 { opacity: 0.5; }
      [data-theme] .opacity-25 { opacity: 0.25; }
      [data-theme] .opacity-75 { opacity: 0.75; }
      [data-theme] .cursor-not-allowed { cursor: not-allowed; }
      [data-theme] .cursor-pointer { cursor: pointer; }
      [data-theme] .cursor-wait { cursor: wait; }
      [data-theme] .disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }
      [data-theme] .disabled\\:opacity-50:disabled { opacity: 0.5; }
      [data-theme] .focus-visible\\:outline-none:focus-visible { outline: 2px solid transparent; outline-offset: 2px; }
      [data-theme] .focus-visible\\:ring-2:focus-visible { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
      [data-theme] .focus-visible\\:ring-offset-2:focus-visible { --tw-ring-offset-width: 2px; }
      [data-theme] .active\\:scale-\\[0\\.98\\]:active { transform: scale(0.98); }
      [data-theme] .space-y-2 > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(0.5rem * var(--tw-space-y-reverse)); }
      [data-theme] .whitespace-nowrap { white-space: nowrap; }
      [data-theme] .border { border-width: 1px; }
      [data-theme] .border-2 { border-width: 2px; }
      [data-theme] .ring-2 { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
    `
    document.head.appendChild(style)
    styleInjectedRef.current = true
  }, [mounted])

  useEffect(() => {
    // Reset loading state when code changes
    setIsLoading(true)
    // Set loading to false after a short delay to allow component to render
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [code])

  // Set theme attributes on preview container and ensure CSS variables are available
  useEffect(() => {
    if (!previewRef.current || !mounted) return

    // Copy CSS variables from document root to preview container
    const rootStyles = getComputedStyle(document.documentElement)
    const container = previewRef.current

    // Get all CSS custom properties (variables)
    const cssVariables: string[] = []
    for (let i = 0; i < rootStyles.length; i++) {
      const prop = rootStyles[i]
      if (prop.startsWith('--')) {
        cssVariables.push(prop)
      }
    }

    // Apply CSS variables to preview container
    cssVariables.forEach((varName) => {
      const value = rootStyles.getPropertyValue(varName)
      container.style.setProperty(varName, value)
    })

    // Set theme attributes
    container.setAttribute('data-theme', theme)
    container.setAttribute('data-color-scheme', currentColorScheme)

    // Also set on any nested elements that might need it
    const nestedElements = container.querySelectorAll('[data-theme]')
    nestedElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.setAttribute('data-theme', theme)
        el.setAttribute('data-color-scheme', currentColorScheme)
      }
    })
  }, [theme, currentColorScheme, isLoading, mounted])

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

      // For noInline mode, react-live expects the last expression to be what gets rendered
      // We need to ensure the component is returned as the last expression
      // Extract the return statement and use it directly
      const returnMatch = transformedCode.match(/return\s+\(?([\s\S]*?)\)?\s*;?\s*}/);

      if (returnMatch) {
        // Use the return value directly
        transformedCode = returnMatch[1].trim();
      } else {
        // Fallback: wrap in IIFE that returns the component
        transformedCode = `(() => {
  ${transformedCode}
  return <${componentName} />
})()`;
      }
    } else {
      // Fallback: try to extract any default export
      transformedCode = transformedCode
        .replace(/export\s+default\s+/g, '')
        .trim();

      // If we still have a function, try to extract it
      const fallbackMatch = transformedCode.match(/function\s+(\w+)\s*\(/);
      if (fallbackMatch) {
        const returnMatch = transformedCode.match(/return\s+\(?([\s\S]*?)\)?\s*;?\s*}/);
        if (returnMatch) {
          transformedCode = returnMatch[1].trim();
        } else {
          transformedCode = `(() => {
  ${transformedCode}
  return <${fallbackMatch[1]} />
})()`;
        }
      } else {
        // Last resort: use as-is if it's already JSX
        transformedCode = transformedCode;
      }
    }
  } else if (needsNoInline && !transformedCode.includes('export default')) {
    // Code was already transformed (imports removed), but still needs noInline
    // Check if it's a function declaration or arrow function
    const functionMatch = transformedCode.match(/function\s+(\w+)\s*\([^)]*\)\s*{/);
    const arrowFunctionMatch = transformedCode.match(/const\s+(\w+)\s*=\s*(\([^)]*\)|\(\))\s*=>\s*{/);

    if (functionMatch) {
      const componentName = functionMatch[1];
      const returnMatch = transformedCode.match(/return\s+\(?([\s\S]*?)\)?\s*;?\s*}/);
      if (returnMatch) {
        transformedCode = returnMatch[1].trim();
      } else {
        transformedCode = `(() => {
  ${transformedCode}
  return <${componentName} />
})()`;
      }
    } else if (arrowFunctionMatch) {
      // Handle arrow functions: const ComponentName = () => { ... }
      // For noInline mode, react-live needs the last expression to be what gets rendered
      // We always wrap arrow functions in an IIFE to ensure proper evaluation
      const componentName = arrowFunctionMatch[1];

      // Remove any render() calls or component calls at the end
      // Split by lines and remove the last line if it's a component call
      const lines = transformedCode.split('\n');
      const lastLine = lines[lines.length - 1]?.trim() || '';

      // Check if last line is a component call or render() call
      const isComponentCall = lastLine.match(new RegExp(`^<${componentName}\\s*/?>\\s*;?$`));
      const isRenderCall = lastLine.match(/^render\s*\(\s*<\w+\s*\/?>\s*\)\s*;?$/);

      if (isComponentCall || isRenderCall) {
        // Remove the last line
        lines.pop();
        transformedCode = lines.join('\n').trim();
      } else {
        // Try regex as fallback
        transformedCode = transformedCode
          .replace(/render\s*\(\s*<\w+\s*\/?>\s*\)\s*;?\s*$/m, '')
          .replace(new RegExp(`<${componentName}\\s*/?>\\s*;?\\s*$`, 'm'), '')
          .trim();
      }

      // Always wrap arrow functions in IIFE for noInline mode
      // This ensures react-live can properly evaluate the code
      // The IIFE will execute the function definition and return the component call
      transformedCode = `(() => {
  ${transformedCode}
  return <${componentName} />
})()`;
    }
    // If no function found, assume it's already JSX and use as-is
  }

  // In noInline mode, react-live expects the last expression to be what gets rendered
  // Even though render() is in scope, we should still remove render() calls and replace
  // them with the component directly, as this is cleaner and more explicit
  // Remove any remaining render() calls that weren't handled above
  if (transformedCode.includes('render(')) {
    // Simple regex to match render(<Component />) and replace with <Component />
    transformedCode = transformedCode.replace(/render\s*\(\s*<(\w+)\s*\/?>\s*\)\s*;?\s*$/m, '<$1 />');
  }

  // CRITICAL FIX: In noInline mode, react-live expects the last expression to be a component call or function
  // If we just have JSX directly, it evaluates to a React element object which React can't render directly
  // We need to wrap it in a function that returns the JSX, or ensure it's a component call
  if (needsNoInline && transformedCode.trim().startsWith('<') && !transformedCode.includes('function') && !transformedCode.includes('=>')) {
    // JSX directly - wrap in IIFE that returns it
    transformedCode = `(() => { return ${transformedCode} })()`;
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="my-6">
      <LiveProvider key={resetKey} code={transformedCode} scope={scope} noInline={needsNoInline}>
        <div className="border border-border rounded-xl overflow-hidden shadow-lg bg-card">
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
                onClick={() => setResetKey(prev => prev + 1)}
                className="px-3 py-1.5 text-xs font-medium rounded-md bg-background border border-border hover:bg-muted transition-colors text-foreground flex items-center gap-1.5"
                title="Reset code"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Reset
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
              className="live-preview-container"
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
              <svg className="w-3.5 h-3.5 transition-transform group-open:rotate-180 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
