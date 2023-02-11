import '@/styles/globals.css'
import { NextSeo } from 'next-seo'

export default function App({ Component, pageProps }) {
  return (
    <>
    <NextSeo 
      titleTemplate='hello world'
    
    />
    <Component {...pageProps} />
    </>
  )
}
