import React, { useContext, useEffect } from "react";
import { RecipesContext } from "../../context/RecipesContext";
import PropTypes from "prop-types";
import uniqid from "uniqid";
import Result from "../result/Result";
import Modal from "../modal/Modal";

const Results = () => {
  const { data, isModal, recipeObj, setIsBackground, setMessage } = useContext(
    RecipesContext
  );
  const isVegeterian = (recipe) => {
    if (recipe.recipe.healthLabels.indexOf("Vegetarian") > -1)
      return (recipe.vegeterian = true);
  };
  useEffect(() => {
    if (data.length !== 0) setIsBackground(false);
  }, []);

  return (
    <div className="results">
      <ul className="results__wrapper">
        {data.map((recipe, index) => {
          return (
            <Result
              {...recipe.recipe}
              recipeObj={recipe}
              bookmarked={recipe.bookmarked}
              key={index}
              id={(recipe.id = uniqid())}
              vegeterian={isVegeterian(recipe)}
            />
          );
        })}
      </ul>
      {isModal && <Modal isModal={isModal} modalObj={recipeObj} />}
    </div>
  );
};

Results.propTypes = {
  data: PropTypes.array,
  isModal: PropTypes.bool,
  recipeObj: PropTypes.object,
};

export default Results;
