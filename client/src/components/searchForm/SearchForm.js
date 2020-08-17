import React, { useContext } from "react";
import PropTypes from "prop-types";
import { RecipesContext } from "../../context/RecipesContext";
import SearchIcon from "../../assets/img/search.svg";

const SearchForm = () => {
  const { search, onChange, onSubmit, isFirstSearch } = useContext(
    RecipesContext
  );
  return (
    <div className="search">
      <form
        onSubmit={onSubmit}
        className={
          isFirstSearch ? "search__form" : "search__form search__form--middle"
        }
      >
        <input
          className={
            isFirstSearch
              ? "search__input"
              : "search__input search__input--middle"
          }
          value={search}
          onChange={onChange}
          id="search"
          placeholder="Search"
          required
        />
        <img className="search__icon" src={SearchIcon} alt="search" />
        <label htmlFor="search">Search</label>
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  search: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default SearchForm;
