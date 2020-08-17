import React, { useContext, useEffect } from "react";
import BcImg from "../../assets/img/bc.jpg";
import Loader from "../loader/Loader";
import { RecipesContext } from "../../context/RecipesContext";
import PropTypes from "prop-types";

const Background = () => {
  const { isLoading, isBackground } = useContext(RecipesContext);

  return (
    <>
      <div className="background">
        {isBackground ? (
          <div className="img">
            <img className="img__bc" src={BcImg} alt="pizza" />
          </div>
        ) : (
          <div className="img" />
        )}
      </div>
      {isLoading && <Loader />}
    </>
  );
};

Background.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default Background;
