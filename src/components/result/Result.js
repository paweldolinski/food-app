import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MyRecipesContext } from '../../context/MyRecipesContext';
import FullHeartIcon from '../../assets/img/heart-full.svg';
import HeartIcon from '../../assets/img/heart.svg';


export default function Result({ image, label, recipeObj, vegeterian }) {

  const { addToLike, openModal } = useContext(MyRecipesContext)

  return (
    <div className="result">
      <div className="result__wrapper">
        <div className="result__img-wrapper">
          <img className="results__img" src={image} alt={label} />
          <div className="result__vegeterian">
            {vegeterian ? "Vegeterian" : null}
          </div>
          <div className="result__heart-wrapper">
            <img className="result__heart" src={recipeObj.bookmarked ? FullHeartIcon : HeartIcon} onClick={() => addToLike(recipeObj)} alt="heart icon" />
          </div>
        </div>
        <div className="result__info">
          <div className="result__labels-wrapper">
            <h1 className="result__title">{label}</h1>
          </div>
          <button className="result__btn-wrapper" onClick={() => openModal(recipeObj.id)}>SEE</button>
        </div>
      </div>
    </div>
  )
}

Result.propTypes = {
  addToLike: PropTypes.func,
}
