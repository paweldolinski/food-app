import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MyRecipesContext } from "../../context/MyRecipesContext";
import SearchIcon from "../../assets/img/search.svg";
import { UserContext } from "../../context/UserContext";

export default function SearchForm() {
  const { search, onChange, onSubmit, firstSearch } = useContext(
    MyRecipesContext
  );
  return (
    <div className="search">
      <form onSubmit={onSubmit} className="search__form">
        <input
          className={
            firstSearch
              ? "search__input"
              : "search__input search__input--middle"
          }
          placeholder="Search..."
          value={search}
          onChange={onChange}
        />
        <img className="search__icon" src={SearchIcon} alt="search" />
      </form>
    </div>
  );
}

SearchForm.propTypes = {
  search: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};
