
import React from 'react';
import Logo from '../../assets/img/logo2.svg';

export default function Loader() {
  return (
    <div className="loader">
      <img src={Logo} alt="logo" />
      <h1>Pleas wait...</h1>
    </div>
  )
}