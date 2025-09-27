import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/themes.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
