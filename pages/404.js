import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/post/hello')
    }, 3000)
  }, [])

  return (
    <div>
      <h1>Not found | 404 response</h1>
      <h1>
        Go back <Link href="/">Home</Link>
      </h1>
    </div>
  )
}

export default NotFound
