'use client'

import React, { useState } from 'react'

interface TokenSwatchProps {
  name: string
  value: string
  color?: string
  description?: string
}

export default function TokenSwatch({ name, value, color, description }: TokenSwatchProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors group">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {color && (
          <div 
            className="w-8 h-8 rounded-md border border-border flex-shrink-0 shadow-sm"
            style={{ backgroundColor: color }}
            title={value}
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono text-foreground">{name}</code>
            {description && (
              <span className="text-xs text-muted-foreground hidden sm:inline">{description}</span>
            )}
          </div>
          <code className="text-xs font-mono text-muted-foreground block mt-1 truncate">{value}</code>
        </div>
      </div>
      <button
        onClick={handleCopy}
        className="px-2 py-1 text-xs font-medium rounded-md bg-background border border-border hover:bg-muted transition-all text-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 hover:scale-105"
        title="Copy variable"
      >
        {copied ? (
          <span className="text-success">✓ Copied</span>
        ) : (
          'Copy'
        )}
      </button>
    </div>
  )
}

