import { Html, Head, Main, NextScript } from 'next/document'

// basePath can be set via NEXT_PUBLIC_BASE_PATH environment variable
// IMPORTANT: allow empty string as a valid value (custom domain)
// For custom domain (nostromo-ui.dev): NEXT_PUBLIC_BASE_PATH=""
// For GitHub Pages: NEXT_PUBLIC_BASE_PATH="/nostromo-ui"
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : process.env.NODE_ENV === 'production'
      ? '/nostromo-ui'
      : ''

export default function Document() {
  return (
    <Html lang="en" data-theme="docs" data-color-scheme="light" suppressHydrationWarning>
      <Head>
        {/* Favicon */}
        <link rel="icon" href={`${basePath}/favicon.ico`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${basePath}/favicon-16x16.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/favicon-32x32.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${basePath}/apple-touch-icon.png`} />

        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
