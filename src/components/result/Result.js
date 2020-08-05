import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { MyRecipesContext } from "../../context/MyRecipesContext";
import { UserContext } from "../../context/UserContext";
import FullHeartIcon from "../../assets/img/heart-full.svg";
import HeartIcon from "../../assets/img/heart.svg";

export default function Result({ image, label, recipeObj, vegeterian }) {
  const { openModal } = useContext(MyRecipesContext);
  const { addToFavorite } = useContext(UserContext);
  const [isHovered, setIsHovered] = useState(false);

  const displayLongLabel = () => {
    setIsHovered(true);
  };

  const hide = () => {
    setIsHovered(false);
  };

  return (
    <li className="result">
      <div className="result__wrapper">
        <div className="result__img-wrapper">
          <img className="results__img" src={image} alt={label} />
          <div className="result__vegeterian">
            {vegeterian ? "Vegeterian" : null}
          </div>
          <button className="result__heart-btn">
            <img
              className="result__heart"
              src={recipeObj.bookmarked ? FullHeartIcon : HeartIcon}
              onClick={() => addToFavorite(recipeObj)}
              alt="heart icon"
            />
          </button>
        </div>
        <div className="result__info">
          <div className="result__labels-wrapper">
            <h1
              onMouseEnter={displayLongLabel}
              onMouseLeave={hide}
              className="result__title"
            >
              {label}
            </h1>
            {isHovered && (
              <>
                <span></span>
                <p className="result__title-hovered">{label}</p>
              </>
            )}
          </div>
          <button
            className="result__btn-wrapper"
            onClick={() => openModal(recipeObj.id)}
          >
            SEE
          </button>
        </div>
      </div>
    </li>
  );
}

Result.propTypes = {
  addToLike: PropTypes.func,
  openModal: PropTypes.func,
  image: PropTypes.string,
  label: PropTypes.string,
  recipeObj: PropTypes.object,
  vegeterian: PropTypes.bool,
};
