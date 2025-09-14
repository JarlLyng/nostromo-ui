'use client'

import { useState, useEffect } from 'react'
import { Button } from '../../../../ui-core/src'

interface CodeEditorProps {
  initialCode: string
  onCodeChange: (code: string) => void
  language?: string
  className?: string
}

export function CodeEditor({ 
  initialCode, 
  onCodeChange, 
  language = 'tsx',
  className = '' 
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setCode(initialCode)
  }, [initialCode])

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    onCodeChange(newCode)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between bg-neutral-800 border border-neutral-700 rounded-t-lg px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-sm text-neutral-400 font-mono">{language}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="text-neutral-400 hover:text-white"
        >
          Copy
        </Button>
      </div>

      {/* Code Editor */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          className={`
            w-full h-64 p-4 bg-neutral-900 border border-neutral-700 border-t-0 rounded-b-lg
            font-mono text-sm text-neutral-100 resize-none
            focus:outline-none focus:ring-2 focus:ring-brand-500/50
            ${isEditing ? 'ring-2 ring-brand-500/50' : ''}
          `}
          spellCheck={false}
          style={{
            fontFamily: 'JetBrains Mono, Consolas, monospace',
            lineHeight: '1.5',
          }}
        />
        
        {/* Line numbers */}
        <div className="absolute left-0 top-0 h-64 w-8 bg-neutral-800 border-r border-neutral-700 rounded-bl-lg pointer-events-none">
          {code.split('\n').map((_, index) => (
            <div
              key={index}
              className="text-xs text-neutral-500 text-center leading-6"
              style={{ lineHeight: '1.5' }}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
