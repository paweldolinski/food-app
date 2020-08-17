import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { RecipesContext } from "../../context/RecipesContext";
import { UserContext } from "../../context/UserContext";
import FullHeartIcon from "../../assets/img/heart-full.svg";
import HeartIcon from "../../assets/img/heart.svg";

const Result = ({ image, label, recipeObj, vegeterian, bookmarked }) => {
  const { openModal, setIsBackground } = useContext(RecipesContext);
  const { addToFavorite, userObj } = useContext(UserContext);
  const { likedArr } = userObj;
  const [isHovered, setIsHovered] = useState(false);

  const displayLongLabel = () => setIsHovered(true);

  const hide = () => setIsHovered(false);

  const isLiked = () =>
    likedArr
      ? likedArr.map((item) => item.dish.recipe.label).includes(label)
      : null;

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
              src={isLiked() ? FullHeartIcon : HeartIcon}
              onClick={() => {
                addToFavorite(recipeObj);
              }}
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
};

Result.propTypes = {
  addToLike: PropTypes.func,
  openModal: PropTypes.func,
  image: PropTypes.string,
  label: PropTypes.string,
  recipeObj: PropTypes.object,
  vegeterian: PropTypes.bool,
};

export default Result;
