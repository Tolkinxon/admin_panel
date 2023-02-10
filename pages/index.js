import Head from 'next/head'

export default function Home({ user }) {
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
        {user.map((data) => (
          <h5 key={data.name}>{data.name}</h5>
        ))}
      </main>
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/users',
  ).then((data) => data.json())

  return {
    props: {
      user: response,
    },
  }
}
