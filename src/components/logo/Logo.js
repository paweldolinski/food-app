import React from 'react';
import Img from '../../assets/img/logo2.svg'


export default function Logo() {

  return <div className="logo">
    <img className="logo__logo" src={Img} alt="logo" />
  </div>
}