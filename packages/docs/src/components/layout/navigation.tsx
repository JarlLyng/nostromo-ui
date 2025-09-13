'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@nostromo/ui-core/button'
// import { Badge } from '@nostromo/ui-core/badge'

const navigation = [
  {
    name: 'Getting Started',
    href: '/getting-started',
    children: [
      { name: 'Installation', href: '/getting-started/installation' },
      { name: 'Setup', href: '/getting-started/setup' },
      { name: 'First Component', href: '/getting-started/first-component' },
    ]
  },
  {
    name: 'Components',
    href: '/components',
    children: [
      { name: 'Button', href: '/components/button' },
      { name: 'Badge', href: '/components/badge' },
      { name: 'Card', href: '/components/card' },
      { name: 'Avatar', href: '/components/avatar' },
      { name: 'Input', href: '/components/input' },
      { name: 'Dialog', href: '/components/dialog' },
    ]
  },
  {
    name: 'Theming',
    href: '/theming',
    children: [
      { name: 'Overview', href: '/theming/overview' },
      { name: 'Customization', href: '/theming/customization' },
      { name: 'Theme Builder', href: '/theming/builder' },
    ]
  },
  {
    name: 'Examples',
    href: '/examples',
    children: [
      { name: 'Dashboard', href: '/examples/dashboard' },
      { name: 'Forms', href: '/examples/forms' },
      { name: 'Marketing', href: '/examples/marketing' },
    ]
  },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-neutral-900/95 backdrop-blur-sm border-r border-neutral-800 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:bg-transparent lg:border-r-0
      `}>
        <div className="p-6">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <div className="text-lg font-bold text-neutral-50">Nostromo UI</div>
                <div className="text-xs text-neutral-500">Space-grade components</div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="space-y-6">
            {navigation.map((section) => (
              <div key={section.name}>
                <div className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  {section.name}
                </div>
                <ul className="space-y-1">
                  {section.children.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="block px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Framework Toggle */}
          <div className="mt-8 pt-6 border-t border-neutral-800">
            <div className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Framework
            </div>
            <div className="flex bg-neutral-800 rounded-lg p-1">
              <button className="flex-1 px-3 py-2 rounded-md bg-brand-500 text-white text-sm font-medium">
                React
              </button>
              <button className="flex-1 px-3 py-2 rounded-md text-neutral-400 hover:text-white text-sm font-medium">
                Vue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
