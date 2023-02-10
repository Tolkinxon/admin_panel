import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

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
        {loading ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          <>
            {data.map((data) => (
              <>
                <h5 key={data.id}>{data.name}</h5>
              </>
            ))}
          </>
        )}
      </main>
    </>
  )
}

// export async function getServerSideProps() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/users')
//   const data = await response.json()
//   return {
//     props: {
//       user: data,
//     },
//   }
// }
