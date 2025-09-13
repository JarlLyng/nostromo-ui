'use client'

import { useState, useEffect } from 'react'
import { Button } from '@nostromo/ui-core/button'
import { Badge } from '@nostromo/ui-core/badge'

interface PreviewProps {
  code: string
  className?: string
}

export function Preview({ code, className = '' }: PreviewProps) {
  const [preview, setPreview] = useState<React.ReactNode>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      setError(null)
      
      // Simple code evaluation for demo purposes
      // In a real implementation, you'd want to use a proper code sandbox
      if (code.includes('Button')) {
        if (code.includes('variant="outline"')) {
          setPreview(
            <div className="flex gap-4">
              <Button variant="outline">Outline Button</Button>
              <Button variant="outline" size="sm">Small</Button>
              <Button variant="outline" size="lg">Large</Button>
            </div>
          )
        } else if (code.includes('variant="ghost"')) {
          setPreview(
            <div className="flex gap-4">
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="ghost" size="sm">Small</Button>
              <Button variant="ghost" size="lg">Large</Button>
            </div>
          )
        } else {
          setPreview(
            <div className="flex gap-4">
              <Button>Default Button</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
          )
        }
      } else if (code.includes('Badge')) {
        setPreview(
          <div className="flex gap-4 flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        )
      } else {
        setPreview(
          <div className="text-neutral-400 text-center py-8">
            Edit the code to see the preview
          </div>
        )
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }, [code])

  return (
    <div className={`bg-neutral-900 border border-neutral-700 rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between bg-neutral-800 border-b border-neutral-700 rounded-t-lg px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-sm text-neutral-400 font-mono">Preview</span>
        </div>
        <div className="text-xs text-neutral-500">
          Live Preview
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-6 min-h-[200px] flex items-center justify-center">
        {error ? (
          <div className="text-red-400 text-center">
            <div className="text-sm font-mono bg-red-900/20 border border-red-500/20 rounded p-3">
              Error: {error}
            </div>
          </div>
        ) : (
          <div className="w-full">
            {preview}
          </div>
        )}
      </div>
    </div>
  )
}
