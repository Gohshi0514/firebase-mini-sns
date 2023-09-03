import { Html, Head, Main, NextScript } from 'next/document'
import Meta from '@/components/Meta'

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <Meta />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
