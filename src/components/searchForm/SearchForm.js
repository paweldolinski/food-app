import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MyRecipesContext } from '../../context/MyRecipesContext';
import SearchIcon from '../../assets/img/search.svg';

export default function SearchForm() {
  const { search, onChange, onSubmit } = useContext(MyRecipesContext)
  return (
    <div className="search">
      <form onSubmit={onSubmit} className="search__form">
        <input className="search__input" placeholder="Search..." value={search} onChange={onChange} />
        <img className="search__icon" src={SearchIcon} alt="search" />
      </form>
    </div>
  )
}

SearchForm.propTypes = {
  search: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
}

