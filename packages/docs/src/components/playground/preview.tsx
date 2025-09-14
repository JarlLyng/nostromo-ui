'use client'

import { useState, useEffect } from 'react'
import { Button, Badge } from '@nostromo/ui-core'

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
      
      // Enhanced code evaluation with better pattern matching
      if (code.includes('Button')) {
        if (code.includes('variant="destructive"')) {
          setPreview(
            <div className="flex gap-4 flex-wrap">
              <Button variant="destructive">Destructive</Button>
              <Button variant="destructive" size="sm">Small</Button>
              <Button variant="destructive" size="lg">Large</Button>
            </div>
          )
        } else if (code.includes('variant="outline"')) {
          setPreview(
            <div className="flex gap-4 flex-wrap">
              <Button variant="outline">Outline</Button>
              <Button variant="outline" size="sm">Small</Button>
              <Button variant="outline" size="lg">Large</Button>
            </div>
          )
        } else if (code.includes('variant="ghost"')) {
          setPreview(
            <div className="flex gap-4 flex-wrap">
              <Button variant="ghost">Ghost</Button>
              <Button variant="ghost" size="sm">Small</Button>
              <Button variant="ghost" size="lg">Large</Button>
            </div>
          )
        } else if (code.includes('size="lg"')) {
          setPreview(
            <div className="flex gap-4 flex-wrap">
              <Button size="lg">Large</Button>
              <Button variant="outline" size="lg">Large Outline</Button>
              <Button variant="ghost" size="lg">Large Ghost</Button>
            </div>
          )
        } else if (code.includes('size="sm"')) {
          setPreview(
            <div className="flex gap-4 flex-wrap">
              <Button size="sm">Small</Button>
              <Button variant="outline" size="sm">Small Outline</Button>
              <Button variant="ghost" size="sm">Small Ghost</Button>
            </div>
          )
        } else {
          setPreview(
            <div className="flex gap-4 flex-wrap">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          )
        }
      } else if (code.includes('Badge')) {
        if (code.includes('variant="destructive"')) {
          setPreview(
            <div className="flex gap-4 flex-wrap">
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge variant="destructive">Critical</Badge>
            </div>
          )
        } else if (code.includes('variant="secondary"')) {
          setPreview(
            <div className="flex gap-4 flex-wrap">
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="secondary">Info</Badge>
              <Badge variant="secondary">Tag</Badge>
            </div>
          )
        } else if (code.includes('variant="outline"')) {
          setPreview(
            <div className="flex gap-4 flex-wrap">
              <Badge variant="outline">Outline</Badge>
              <Badge variant="outline">Beta</Badge>
              <Badge variant="outline">New</Badge>
            </div>
          )
        } else {
          setPreview(
            <div className="flex gap-4 flex-wrap">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          )
        }
      } else if (code.includes('Card')) {
        setPreview(
          <div className="grid gap-4 max-w-md">
            <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-neutral-50 mb-2">Card Title</h3>
              <p className="text-neutral-400 mb-4">This is a card component example with some content.</p>
              <Button size="sm">Action</Button>
            </div>
          </div>
        )
      } else if (code.includes('Avatar')) {
        setPreview(
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
            <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">AB</span>
            </div>
            <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-lg">CD</span>
            </div>
          </div>
        )
      } else {
        setPreview(
          <div className="text-neutral-400 text-center py-8">
            <div className="text-sm mb-2">💡 Try editing the code above</div>
            <div className="text-xs">Supported components: Button, Badge, Card, Avatar</div>
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
