import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MyRecipesContext } from '../../context/MyRecipesContext';
import Chart from '../chart/Chart';
import Heart from '../heart/Heart'


export default function Result({ image, label, healthLabels, recipeObj }) {

  const { addToLike, isModal, openModal, likeArr } = useContext(MyRecipesContext)

  return (
    <div className="result">
      <div className="result__wrapper">
        <div className="result__img-wrapper">
          <img src={image} alt={label} />
          <div className="result__heart">
            <Heart likeList={likeArr} />
          </div>
        </div>
        <div className="result__info">
          <div className="result__labels-wrapper">
            <h1 className="result__title">{label}</h1>
            {/* {healthLabels.map((info, index) => {
              return <span key={index} className="result__allergens">{info}</span>
            })
            } */}
          </div>
          <div className="result__btn-wrapper">
            {/* <button onClick={() => addToLike(recipeObj)}> {recipeObj.bookmarked ? "Liked" : "Like"} </button> */}
            <button onClick={() => openModal(recipeObj.id)}>SEE</button>
          </div>
        </div>
      </div>
      {isModal && <Chart isModal={isModal} modalObj={recipeObj} />}
    </div>
  )
}

Result.propTypes = {
  addToLike: PropTypes.func,
}
