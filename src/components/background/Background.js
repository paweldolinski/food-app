import React, { useContext, useEffect } from 'react';
import BcImg from '../../assets/img/bc.jpg';
import Loader from "../loader/Loader";
import { MyRecipesContext } from '../../context/MyRecipesContext';

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
  }, [data])

  return (
    <>
      {bc()}
      {isLoading && <Loader />}
    </>
  )
}