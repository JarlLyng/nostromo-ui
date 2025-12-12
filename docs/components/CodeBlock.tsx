'use client'

import React, { useState } from 'react'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  'data-language'?: string
}

export default function CodeBlock({ children, className = '', 'data-language': language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  
  // Extract code from pre > code structure
  const extractCodeString = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return String(node)
    if (React.isValidElement(node)) {
      const props = node.props as { children?: React.ReactNode }
      if (props?.children) {
        return extractCodeString(props.children)
      }
    }
    if (Array.isArray(node)) {
      return node.map(extractCodeString).join('')
    }
    return ''
  }

  const codeString = extractCodeString(children)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Detect language from className (e.g., "language-tsx" -> "tsx")
  const lang = language || className.match(/language-(\w+)/)?.[1] || ''

  return (
    <div className="nx-code-block my-4">
      <div className="nx-code-block-header">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          {lang && (
            <span className="text-xs text-muted-foreground font-medium uppercase">{lang}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="nx-code-block-copy"
          title="Copy code"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <div className={className}>
        {children}
      </div>
    </div>
  )
}

