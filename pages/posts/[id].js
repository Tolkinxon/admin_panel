import React from 'react'

const meal = ({ data }) => {
  console.log(data)
  const { meals } = data
  return (
    <>
      {meals.map((data) => (
        <div key={data.idMeal}>
          <img src={data.strMealThumb} width={100} height={100} />
          <h5>{data.strMeal}</h5>
        </div>
      ))}
    </>
  )
}

export default meal

export async function getStaticProps({ params }) {
  const strCategory = params.id[0].toUpperCase() + params.id.slice(1)
  const response = await fetch(
    `http://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`,
  ).then((data) => data.json())
  return {
    props: {
      data: response,
    },
  }
}

export async function getStaticPaths() {
  const response = await fetch(
    `http://www.themealdb.com/api/json/v1/1/categories.php`,
  ).then((data) => data.json())

  return {
    paths: response.categories.map((data) => {
      const id = data.strCategory.toLowerCase()
      return {
        params: {
          id,
        },
      }
    }),
    fallback: false,
  }
}
