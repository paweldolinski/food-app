import React, { useContext } from "react";
import { RecipesContext } from "../../context/RecipesContext";
import { UserContext } from "../../context/UserContext";
import PropTypes from "prop-types";
import Heart from "../heart/Heart";

const Liked = () => {
  const { deleteLike, openModal } = useContext(RecipesContext);
  const { userObj, removeFromFavorite } = useContext(UserContext);
  const { likedArr } = userObj;
  const likedLength = () => {
    if (likedArr) {
      return likedArr.length;
    }
  };

  return (
    <div className="liked">
      <div className="like__wrapper">
        <div className="liked__heart">
          <span className="liked__counter">({likedLength() || 0})</span>{" "}
          <Heart likeList={likedArr} />
        </div>
        <div className="liked__items-wrapper">
          {likedArr.length ? (
            likedArr.map((like) => {
              return (
                <div className="liked__item" key={like.dish.id}>
                  <div className="liked__item-wrapper-left">
                    <img
                      className="liked__img"
                      src={like.dish.recipe.image}
                      alt="/"
                    />
                    <p
                      onClick={() => openModal(like.id)}
                      className="liked__name"
                    >
                      {like.dish.recipe.label}
                    </p>
                  </div>
                  <button
                    className="liked__remove"
                    onClick={() => removeFromFavorite(like.dish.id)}
                  >
                    {" "}
                    Remove{" "}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="liked__empty">Your List Is Empty</p>
          )}
        </div>
      </div>
    </div>
  );
};

Liked.propTypes = {
  likedArr: PropTypes.array,
  deleteLike: PropTypes.func,
  openModal: PropTypes.bool,
};

export default Liked;
