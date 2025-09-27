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

    // Storybook URL - tilpas til din Storybook port
    const storybookUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:6006' 
      : 'https://jarllyng.github.io/nostromo-ui/storybook'
    
    const storyUrl = `${storybookUrl}/iframe.html?id=${encodeURIComponent(story)}&viewMode=story`
    
    iframe.src = storyUrl
    
    // Handle iframe load error
    const handleError = () => setHasError(true)
    iframe.addEventListener('error', handleError)
    
    return () => {
      iframe.removeEventListener('error', handleError)
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
          className="bg-gray-100 flex items-center justify-center text-gray-500"
          style={{ height, width }}
        >
          <div className="text-center">
            <p className="text-sm">Storybook ikke tilgængelig</p>
            <p className="text-xs mt-1">Kør lokalt for at se interaktive eksempler</p>
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