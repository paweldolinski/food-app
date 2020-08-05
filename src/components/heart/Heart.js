import React from "react";
import heartFull from "../../assets/img/heart-full.svg";
import heart from "../../assets/img/heart.svg";
import PropTypes from "prop-types";

export default function Heart({ likeList }) {
  return (
    <img
      className="heart"
      src={!likeList.length ? heart : heartFull}
      alt="heart like"
    />
  );
}

Heart.propTypes = {
  likeList: PropTypes.array,
};
