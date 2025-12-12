import type { AppProps } from 'next/app'
import '@nostromo/ui-tw/base.css'
import '@nostromo/ui-tw/themes/nostromo.css'
import '../styles/globals.css'
import '../styles/themes.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
