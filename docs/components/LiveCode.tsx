'use client'

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import * as Nostromo from '@nostromo/ui-core'
import * as NostromoMarketing from '@nostromo/ui-marketing'
import React from 'react'

// Scope for live code examples - includes all Nostromo components
const scope = {
  React,
  ...Nostromo,
  ...NostromoMarketing,
  useState: React.useState,
  useEffect: React.useEffect,
  useRef: React.useRef,
}

interface LiveCodeProps {
  code: string
  noInline?: boolean
}

export default function LiveCode({ code, noInline = false }: LiveCodeProps) {
  return (
    <div className="my-6">
      <LiveProvider code={code} scope={scope} noInline={noInline}>
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 border-b border-gray-200 dark:border-gray-800">
            <span className="text-sm text-gray-600 dark:text-gray-400">Live Example</span>
          </div>
          <div className="p-4 bg-white dark:bg-gray-950">
            <LivePreview />
            <LiveError className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-800 dark:text-red-200 text-sm" />
          </div>
          <details className="border-t border-gray-200 dark:border-gray-800">
            <summary className="px-4 py-2 bg-gray-50 dark:bg-gray-900 cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              View Code
            </summary>
            <div className="bg-gray-950">
              <LiveEditor
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                  fontSize: '14px',
                  padding: '16px',
                }}
                className="min-h-[200px]"
              />
            </div>
          </details>
        </div>
      </LiveProvider>
    </div>
  )
}

