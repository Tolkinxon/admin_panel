import Head from 'next/head'
import style from '../styles/Global.module.css'

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
        <div className={`${style.box} container`}>
          <h1 className={style.title}>Home</h1>
          <p className={style.paragraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            officiis dolor sit, ad excepturi iure cupiditate a porro commodi
            eveniet accusantium fugit facere maiores possimus corporis hic
            adipisci sunt eum voluptas asperiores earum animi natus recusandae?
            Laudantium dignissimos quos vero corporis deleniti atque
            repellendus, accusamus, repudiandae voluptates omnis pariatur
            maxime.
          </p>
        </div>
        <style jsx>
          {`
            // .container{
            //   border-radius: 0px
            // }
          `}
        </style>
      </main>
    </>
  )
}
