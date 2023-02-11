import '@/styles/globals.css'
import { NextSeo } from 'next-seo'

export default function App({ Component, pageProps }) {
  return (
    <>
      <NextSeo title="kkkk" titleTemplate="%s | hello 00000 | %s" />
      <Component {...pageProps} />
    </>
  )
}
