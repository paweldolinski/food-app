import React, { useContext, useEffect } from "react";
import BcImg from "../../assets/img/bc.jpg";
import Loader from "../loader/Loader";
import { RecipesContext } from "../../context/RecipesContext";
import PropTypes from "prop-types";

const Background = () => {
  const { data, isLoading } = useContext(RecipesContext);

  const bc = () => {
    if (!data) {
      return (
        <div className="img">
          <img className="img__bc" src={BcImg} alt="pizza" />
        </div>
      );
    } else {
      return <div className="img" />;
    }
  };

  useEffect(() => {
    bc();
  });

  return (
    <>
      <div className="background" />
      {/* {isLoading && <Loader />} */}
    </>
  );
};

Background.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default Background;
