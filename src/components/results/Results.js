import React, { useContext } from 'react';
import { MyRecipesContext } from '../../context/MyRecipesContext'
import PropTypes from 'prop-types';
import uniqid from "uniqid";

import Result from '../result/Result'


export default function Results() {

  const { data } = useContext(MyRecipesContext)

  return (
    <div className="results">
      {console.log(data)}
      <div className="results__wrapper">
        {data.map((recipe, index) => {
          return <Result {...recipe.recipe} recipeObj={recipe} bookmarked={recipe.bookmarked} key={index} id={recipe.id = uniqid()} />
        })}
      </div>
    </div>)
}

Results.propTypes = {
  data: PropTypes.array
}








