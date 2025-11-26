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
      <div className="my-6 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-2 text-sm text-gray-600">Storybook: {story}</span>
          </div>
        </div>
        <div 
          className="bg-gray-100 flex items-center justify-center text-gray-500 p-8"
          style={{ height, width }}
        >
          <div className="text-center max-w-md">
            <p className="text-sm font-medium mb-2">Storybook ikke tilgængelig</p>
            <p className="text-xs mb-4">For at se interaktive eksempler, start Storybook lokalt:</p>
            <div className="bg-gray-200 rounded p-3 text-left font-mono text-xs">
              <code className="block mb-1">cd packages/ui-core</code>
              <code className="block">pnpm storybook</code>
            </div>
            <p className="text-xs mt-4 text-gray-400">
              Storybook vil køre på http://localhost:6006
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-6 border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-2 text-sm text-gray-600">Storybook: {story}</span>
        </div>
      </div>
      <iframe
        ref={iframeRef}
        style={{ 
          width, 
          height, 
          border: 'none',
          display: 'block'
        }}
        title={`Storybook: ${story}`}
        loading="lazy"
      />
    </div>
  )
}