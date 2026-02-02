'use client'

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import * as Nostromo from '@jarllyng/nostromo'
import React, { useState, useEffect, useRef } from 'react'
import { withBasePath } from '../utils/withBasePath'

import { Button } from '@jarllyng/nostromo/components/core/button';
import { Badge } from '@jarllyng/nostromo/components/core/badge';
import { Card } from '@jarllyng/nostromo/components/core/card';
import { Separator } from '@jarllyng/nostromo/components/core/separator';
import { Icon } from '@jarllyng/nostromo/components/core/icon';

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
  render: (element: React.ReactElement) => element,
}

export interface LiveCodeProps {
  code: string
  noInline?: boolean
  theme?: 'nostromo' | 'mother' | 'lv-426' | 'sulaco'
  colorScheme?: 'light' | 'dark'
}

export default function LiveCodeClient({
  code,
  noInline = false,
  theme = 'nostromo',
  colorScheme = 'light'
}: LiveCodeProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [currentColorScheme, setCurrentColorScheme] = useState(colorScheme)
  const [resetKey, setResetKey] = useState(0)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Reset loading state when code changes
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [code])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  // Transform code (unchanged logic)
  let transformedCode = code.trim()
  const lines = transformedCode.split('\n')
  const filteredLines = lines.filter(line => !line.trim().startsWith('import '))
  transformedCode = filteredLines.join('\n').trim()

  const needsNoInline = noInline || code.includes('export default') || code.includes('React.Fragment')

  if (!mounted) return null

  return (
    <div className="my-8">
      <LiveProvider key={resetKey} code={transformedCode} scope={scope} noInline={needsNoInline}>
        <div className="border border-border rounded-2xl overflow-hidden shadow-2xl bg-card transition-all duration-300 hover:border-accent/30">
          {/* Editor Header - Window Motif */}
          <div className="flex items-center justify-between px-6 py-4 bg-muted/30 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <Badge variant="outline" className="text-[10px] uppercase tracking-widest opacity-70">
                Interactive Playground
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-[11px] font-bold uppercase tracking-tighter"
                onClick={() => setCurrentColorScheme(currentColorScheme === 'light' ? 'dark' : 'light')}
              >
                {currentColorScheme === 'light' ? 'Go Dark' : 'Go Light'}
              </Button>
              <Separator orientation="vertical" className="h-4" />
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-[11px] font-bold uppercase tracking-tighter"
                onClick={() => setResetKey(prev => prev + 1)}
              >
                Reset
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="h-8 px-4 text-[11px] font-bold uppercase tracking-tighter shadow-sm"
                onClick={handleCopy}
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>

          {/* Preview Area */}
          <div className="p-8 bg-background relative min-h-[160px] flex items-center justify-center">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background z-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50">Transmitting Data...</span>
                </div>
              </div>
            )}
            <div
              ref={previewRef}
              style={{ display: isLoading ? 'none' : 'block' }}
              data-theme={theme}
              data-color-scheme={currentColorScheme}
              className="w-full"
            >
              <LivePreview />
            </div>
            <LiveError
              className="absolute bottom-4 left-4 right-4 p-4 bg-red-950/90 backdrop-blur border border-red-500/50 rounded-lg text-red-200 text-xs font-mono shadow-2xl z-30"
            />
          </div>

          {/* Editor Area */}
          <details className="border-t border-border group" open>
            <summary className="px-6 py-3 bg-muted/10 cursor-pointer text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:bg-accent/5 transition-all flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
                <span>Code Inspector</span>
              </div>
              <Badge variant="secondary" className="text-[9px] opacity-60">Editable</Badge>
            </summary>

            <div className="bg-neutral-950/95 backdrop-blur-sm border-t border-border/50">
              <LiveEditor
                style={{
                  fontFamily: 'var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  fontSize: '13px',
                  padding: '24px',
                  lineHeight: '1.7',
                }}
                className="min-h-[120px] focus-within:outline-none"
              />
            </div>
          </details>
        </div>
      </LiveProvider>
    </div>
  )
}
