import React from 'react';
import heartFull from '../../assets/img/heart-full.svg'
import heart from '../../assets/img/heart.svg'

export default function Heart({ likeList }) {
  return (
    <img className="heart" src={!likeList.length ? heart : heartFull} alt="heart like" />
  )
}