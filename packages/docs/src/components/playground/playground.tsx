'use client'

import { useState } from 'react'
import { CodeEditor } from './code-editor'
import { Preview } from './preview'
import { Button, Badge } from '@nostromo/ui-core'

interface PlaygroundProps {
  initialCode: string
  className?: string
}

export function Playground({ initialCode, className = '' }: PlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Tab Navigation */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'preview' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </Button>
        <Button
          variant={activeTab === 'code' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('code')}
        >
          Code
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'preview' ? (
        <Preview code={code} />
      ) : (
        <CodeEditor 
          initialCode={code} 
          onCodeChange={handleCodeChange}
          language="tsx"
        />
      )}

      {/* Split View Option */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">Preview</Badge>
          </div>
          <Preview code={code} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">Code</Badge>
          </div>
          <CodeEditor 
            initialCode={code} 
            onCodeChange={handleCodeChange}
            language="tsx"
          />
        </div>
      </div>
    </div>
  )
}
