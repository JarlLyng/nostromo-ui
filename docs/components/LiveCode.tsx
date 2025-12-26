'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import type { LiveCodeProps } from './LiveCode.client'

// Disable SSR because react-live relies on browser-only APIs and mismatches when hydrated from static export
const LiveCodeClient = dynamic(() => import('./LiveCode.client'), {
  ssr: false,
})

function LiveCodeFallback({ code, theme = 'nostromo', colorScheme = 'light', storyId }: LiveCodeProps) {
  const codePreview = (code || '').split('\n').slice(0, 10).join('\n')

  return (
    <div className="my-6">
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
            <div className="px-3 py-1.5 text-xs font-medium rounded-md bg-background border border-border text-foreground">
              ☀️
            </div>
            <div className="px-3 py-1.5 text-xs font-medium rounded-md bg-background border border-border text-foreground">
              Copy
            </div>
            <a
              href={
                storyId
                  ? `https://jarllyng.github.io/nostromo-ui/storybook-static/?path=/story/${encodeURIComponent(storyId)}`
                  : 'https://jarllyng.github.io/nostromo-ui/storybook-static/'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-background border border-border hover:bg-muted transition-colors text-foreground"
            >
              Storybook →
            </a>
          </div>
        </div>
        <div className="p-6 bg-background relative min-h-[100px]">
          <div data-theme={theme} data-color-scheme={colorScheme} className="min-h-[100px]" />
        </div>
        <details className="border-t border-border">
          <summary className="px-4 py-3 bg-muted/30 cursor-pointer text-sm font-medium text-foreground hover:bg-muted/50 transition-colors flex items-center justify-between">
            <span>View Code</span>
            <svg className="w-3.5 h-3.5 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="bg-neutral-950 border-t border-border">
            <div className="min-h-[200px] p-5 text-neutral-400 text-sm font-mono">{codePreview}...</div>
          </div>
        </details>
      </div>
    </div>
  )
}

export default function LiveCode(props: LiveCodeProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Always return fallback until mounted to prevent hydration mismatch
  if (!mounted) {
    return <LiveCodeFallback {...props} />
  }

  return <LiveCodeClient {...props} />
}
