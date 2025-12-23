import { Html, Head, Main, NextScript } from 'next/document'

const basePath = process.env.NODE_ENV === 'production' ? '/nostromo-ui' : ''

export default function Document() {
  return (
    <Html lang="en" data-theme="docs" data-color-scheme="light">
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const progressBar = document.createElement('div');
                progressBar.className = 'scroll-progress';
                document.body.appendChild(progressBar);
              })();
            `,
          }}
        />
      </body>
    </Html>
  )
}
