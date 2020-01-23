import React, { useContext, useState, useEffect } from 'react';
import { MyRecipesContext } from '../../context/MyRecipesContext'
import PropTypes from 'prop-types';
import uniqid from "uniqid";
import Result from '../result/Result'
import Modal from '../modal/Modal'

export default function Results() {
  const { data, isModal, recipeObj } = useContext(MyRecipesContext)

  const [sortedArr, setSortedArr] = useState([])

  const isVegeterian = (recipe) => {
    if (recipe.recipe.healthLabels.indexOf("Vegetarian") > -1) {
      return recipe.vegeterian = true
    }
  }
  const sortByProteins = () => {
    setSortedArr(sortedArr.slice().sort((a, b) => (a.proteins > b.proteins) ? 1 : -1))
  }

  useEffect(() => {
    setSortedArr(data)
  }, [data])


  return (
    <div className="results">
      {data.length && <button className="results__sort-proteins-btn" onClick={sortByProteins}>Sort By Proteins</button>}
      <div className="results__wrapper">
        {sortedArr.map((recipe, index) => {
          return <Result {...recipe.recipe} recipeObj={recipe} bookmarked={recipe.bookmarked} key={index}
            id={recipe.id = uniqid()}
            vegeterian={isVegeterian(recipe)}
          />
        })}
      </div>
      {isModal && <Modal isModal={isModal} modalObj={recipeObj} />}
    </div>
  )
}

Results.propTypes = {
  data: PropTypes.array,
  isModal: PropTypes.bool,
  recipeObj: PropTypes.object,
}