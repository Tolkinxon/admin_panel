import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>my next app</title>
        <meta
          name="Tolkinxon"
          content="javaScript, Reactjs, Css and other technologies"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Home</h1>

        <ul>
          <li>
            <Link href="/">
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p>About</p>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <p>Contact</p>
            </Link>
          </li>
        </ul>
      </main>
    </>
  )
}
