import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" data-theme="docs" data-color-scheme="light">
      <Head />
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
