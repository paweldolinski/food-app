import React, { useContext, useState } from "react";
import { RecipesContext } from "../../context/RecipesContext";
import PropTypes from "prop-types";

const Filter = () => {
  const { sortByProteins, sortByCarbs, sortByFat } = useContext(RecipesContext);
  const [isFilterOpen, setIsFilterOopen] = useState(false);

  const openFilter = () => {
    setIsFilterOopen(!isFilterOpen);
  };

  return (
    <div className="filter">
      <button className="filter__btn filter__btn-top" onClick={openFilter}>
        {isFilterOpen ? "Hide Filters" : "Show Filters"}
      </button>
      {isFilterOpen && (
        <div className="filter__btn-wrapper">
          <button className="filter__btn" onClick={sortByProteins}>
            Sort By Proteins
          </button>
          <button className="filter__btn" onClick={sortByFat}>
            Sort By Fat
          </button>
          <button className="filter__btn" onClick={sortByCarbs}>
            Sort By Carbs
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  sortByProteins: PropTypes.func,
  sortByFat: PropTypes.func,
  sortByCarbs: PropTypes.func,
};
