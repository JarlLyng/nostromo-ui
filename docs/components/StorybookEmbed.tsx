import React, { useEffect, useRef } from 'react'

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

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    // Storybook URL - tilpas til din Storybook port
    const storybookUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:6006' 
      : '/storybook'
    
    const storyUrl = `${storybookUrl}/iframe.html?id=${encodeURIComponent(story)}&viewMode=story`
    
    iframe.src = storyUrl
  }, [story])

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