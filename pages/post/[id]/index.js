import React from 'react'
import Home from '@/pages'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Post() {
  const router = useRouter()

  const { id, blog } = router.query



  return (
    <div>
      <Home />

      <ul>
        <li>
          <Link href={`/post/${id}/1`}>1-blog</Link>
        </li>
        <li>
          <Link href={`/post/${id}/2`}>2-blog</Link>
        </li>
        <li>
          <Link href={`/post/${id}/3`}>3-blog</Link>
        </li>
      </ul>
    </div>
  )
}
