import React from "react";
import Logo from "../../assets/img/logo2.svg";

const Loader = () => {
  return (
    <div className="loader">
      <img src={Logo} alt="logo" />
      <h1>Pleas wait...</h1>
    </div>
  );
};

export default Loader;
