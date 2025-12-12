import type { AppProps } from 'next/app'
import type { MDXComponents } from 'mdx/types'
import React from 'react'
import CodeBlock from '../components/CodeBlock'
import '@nostromo/ui-tw/base.css'
import '@nostromo/ui-tw/themes/nostromo.css'
import '../styles/globals.css'
import '../styles/themes.css'

// Override MDX components
const mdxComponents: MDXComponents = {
  pre: (props: any) => {
    // Extract code from pre > code structure
    const codeProps = props.children?.props || {}
    return (
      <CodeBlock 
        className={codeProps.className || ''}
        data-language={codeProps['data-language']}
      >
        {codeProps.children || props.children}
      </CodeBlock>
    )
  },
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} components={mdxComponents} />
    </>
  )
}
