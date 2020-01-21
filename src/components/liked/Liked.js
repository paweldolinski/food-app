import React, { useContext, useEffect, useState } from 'react';
import { MyRecipesContext } from '../../context/MyRecipesContext';
import PropTypes from 'prop-types';

import Heart from '../heart/Heart'



export default function Liked() {
  const { likeArr, deleteLike } = useContext(MyRecipesContext);

  const [likeList, setLikeList] = useState('');

  useEffect(() => {
    const renderLikeList = () => {
      const likeArrToRender = likeArr.filter((like) => like.bookmarked === true)
      setLikeList(likeArrToRender)
    }
    renderLikeList()

  }, [likeArr])

  return (
    <div className="liked">
      <div className="like__wrapper">
        <div className="liked__heart">
          <span className="liked__counter">({likeList.length})</span> <Heart likeList={likeList} />
        </div>
        <div className="liked__items-wrapper">
          {likeList && likeList.map((like) => {
            return (
              <div className="liked__item" key={like.id}>
                <img className="liked__img" src={like.recipe.image} alt='/' />
                <p className="liked__name">{like.recipe.label}</p>
                <button className="liked__remove" onClick={() => deleteLike(like)}> Remove </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
Liked.propTypes = {
  likeArr: PropTypes.array,
  deleteLike: PropTypes.func,
}
