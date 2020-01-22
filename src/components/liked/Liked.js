import React, { useContext } from 'react';
import { MyRecipesContext } from '../../context/MyRecipesContext';
import PropTypes from 'prop-types';
import Heart from '../heart/Heart'

export default function Liked() {
  const { likeArr, deleteLike, isModal, openModal } = useContext(MyRecipesContext);

  return (
    <div className="liked">
      <div className="like__wrapper">
        <div className="liked__heart">
          <span className="liked__counter">({likeArr.length})</span> <Heart likeList={likeArr} />
        </div>
        <div className="liked__items-wrapper">
          {likeArr.length ? likeArr.map((like) => {
            return (
              <div className="liked__item" key={like.id}>
                <img className="liked__img" src={like.recipe.image} alt='/' />
                <p onClick={() => openModal(like.id)} className="liked__name">{like.recipe.label}</p>
                <button className="liked__remove" onClick={() => deleteLike(like)}> Remove </button>
              </div>
            )
          }) : <p className="liked__empty">Your List Is Empty</p>}
        </div>
      </div>
    </div>
  )
}

Liked.propTypes = {
  likeArr: PropTypes.array,
  deleteLike: PropTypes.func,
}
