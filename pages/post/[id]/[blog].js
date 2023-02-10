import React from 'react'
import { useRouter } from 'next/router'

const blog = () => {
  const { id, blog } = useRouter().query

  return (
    <div>
      <h1>{id}</h1>
      <h2>{blog}</h2>
    </div>
  )
}

export default blog
