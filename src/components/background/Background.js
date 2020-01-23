import React, { useContext, useEffect } from 'react';
import BcImg from '../../assets/img/bc.jpg';
import Loader from "../loader/Loader";
import { MyRecipesContext } from '../../context/MyRecipesContext';
import PropTypes from 'prop-types';

export default function Background() {

  const { data, isLoading } = useContext(MyRecipesContext)

  const bc = () => {
    if (!data.length) {
      return (
        <div className="img">
          <img className="img__bc" src={BcImg} alt="pizza" />
        </div>
      )
    } else {
      return <div className="img" />
    }
  }

  useEffect(() => {
    bc()
  })

  return (
    <>
      {bc()}
      {isLoading && <Loader />}
    </>
  )
}

Background.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
}
