import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {

  const data = [
    { name: 'tech', slug: 'ai' },
    { name: 'echo', slug: 'environment' },
    { name: 'lab', slug: 'safety' }
  ]





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

        { data.map((data) => (
        <>
        <p>
          <Link href={`/post/${data.slug}`}>
            {data.name}
          </Link>
        </p>
        </>
        ))
        }

     
      </main>
    </>
  )
}
