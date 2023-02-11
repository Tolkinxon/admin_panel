import React from 'react'

const meal = ({ data }) => {
  console.log(data)
  const { meals } = data
  return (
    <>
      {meals.map((data) => (
        <h5 key={data.idMeal}>{data.strMeal}</h5>
      ))}
    </>
  )
}

export default meal

export async function getStaticProps({ params: { id } }) {
  const response = await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
    .then((data) => data.json())
  return {
    props: {
      data: response,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [{params:{id: 'Seafood'}}, {params:{id: 'Beef'}}],
    fallback: false,
  }
}
