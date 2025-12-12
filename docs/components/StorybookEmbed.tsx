import React, { useEffect, useRef, useState } from 'react'

interface StorybookEmbedProps {
  story: string
  height?: string
  width?: string
}

export default function StorybookEmbed({ 
  story, 
  height = '400px', 
  width = '100%' 
}: StorybookEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    // Storybook URL configuration
    // Uses environment variables or defaults
    const getStorybookUrl = () => {
      if (typeof window !== 'undefined') {
        // Client-side: check for environment variable or use production URL
        return process.env.NEXT_PUBLIC_STORYBOOK_URL || 
               (process.env.NODE_ENV === 'development' 
                 ? 'http://localhost:6006' 
                 : 'https://jarllyng.github.io/nostromo-ui/storybook-static')
      }
      // Server-side: use production URL
      return process.env.NEXT_PUBLIC_STORYBOOK_URL || 
             'https://jarllyng.github.io/nostromo-ui/storybook-static'
    }
    
    const storybookUrl = getStorybookUrl()
    const storyUrl = `${storybookUrl}/iframe.html?id=${encodeURIComponent(story)}&viewMode=story`
    
    iframe.src = storyUrl
    
    // Handle iframe load error
    const handleError = () => setHasError(true)
    const handleLoad = () => {
      setIsLoading(false)
      // Check if iframe loaded successfully
      try {
        if (iframe.contentDocument === null) {
          setHasError(true)
        }
      } catch (e) {
        setHasError(true)
      }
    }
    
    iframe.addEventListener('error', handleError)
    iframe.addEventListener('load', handleLoad)
    
    return () => {
      iframe.removeEventListener('error', handleError)
      iframe.removeEventListener('load', handleLoad)
    }
  }, [story])

  if (hasError) {
    return (
      <div className="my-6 border border-border rounded-xl overflow-hidden shadow-lg bg-card">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-sm font-medium text-muted-foreground">Storybook: {story}</span>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-destructive/10 text-destructive border border-destructive/20">Unavailable</span>
          </div>
          <a
            href={`https://jarllyng.github.io/nostromo-ui/storybook-static/?path=/story/${encodeURIComponent(story)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-background border border-border hover:bg-muted transition-colors text-foreground"
          >
            Open in New Tab →
          </a>
        </div>
        <div 
          className="bg-muted/30 flex items-center justify-center text-muted-foreground p-8"
          style={{ height, width }}
        >
          <div className="text-center max-w-md">
            <p className="text-sm font-medium mb-2">Storybook unavailable</p>
            <p className="text-xs mb-4">To view interactive examples, you can:</p>
            <div className="space-y-3">
              <a
                href={`https://jarllyng.github.io/nostromo-ui/storybook-static/?path=/story/${encodeURIComponent(story)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
              >
                Open in Storybook →
              </a>
              <div className="text-xs text-muted-foreground mt-4">
                <p className="mb-2 font-medium">Or run Storybook locally:</p>
                <div className="bg-muted rounded-lg p-3 text-left font-mono border border-border">
                  <code className="block mb-1 text-foreground">cd packages/ui-core</code>
                  <code className="block text-foreground">pnpm storybook</code>
                </div>
                <p className="mt-2 text-muted-foreground">
                  Storybook will run on http://localhost:6006
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-6 border border-border rounded-xl overflow-hidden shadow-lg bg-card">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-sm font-medium text-muted-foreground">Storybook: {story}</span>
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-success/10 text-success border border-success/20">Active</span>
        </div>
        <a
          href={`https://jarllyng.github.io/nostromo-ui/storybook-static/?path=/story/${encodeURIComponent(story)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-background border border-border hover:bg-muted transition-colors text-foreground"
        >
          Open in New Tab →
        </a>
      </div>
      <div className="relative" style={{ width, height }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
            <div className="animate-pulse space-y-3 w-full max-w-md px-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          style={{ 
            width: '100%', 
            height: '100%', 
            border: 'none',
            display: 'block',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}
          title={`Storybook: ${story}`}
          loading="lazy"
        />
      </div>
    </div>
  )
}