import type { AppProps } from 'next/app'
import Script from 'next/script'
import { useEffect } from 'react'
import { track } from '../lib/analytics'
import '@jarllyng/nostromo/base.css'
import '@jarllyng/nostromo/themes/nostromo.css'
import '../styles/globals.css'
import '../styles/themes.css'

import { ScrollProgress } from '../components/ScrollProgress'
import { DocsLayout } from '../components/DocsLayout'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    let previousTheme = root.getAttribute('data-theme')
    let previousScheme = root.getAttribute('data-color-scheme')

    const observer = new MutationObserver(() => {
      const nextTheme = root.getAttribute('data-theme')
      const nextScheme = root.getAttribute('data-color-scheme')
      if (nextTheme !== previousTheme || nextScheme !== previousScheme) {
        previousTheme = nextTheme
        previousScheme = nextScheme
        track('theme_change', {
          theme: nextTheme,
          colorScheme: nextScheme,
        })
      }
    })

    observer.observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-color-scheme'] })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <ScrollProgress />
      <Script
        src="https://umami-iamjarl.vercel.app/script.js"
        data-website-id="f4f9ada2-3819-4174-8018-2b99801b39b4"
        strategy="afterInteractive"
      />
      <DocsLayout>
        <Component {...pageProps} />
      </DocsLayout>
    </>
  )
}
