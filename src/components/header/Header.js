import React from 'react';
import SearchField from '../searchForm/SearchForm';
import Logo from '../logo/Logo'
import Liked from '../liked/Liked'

export default function Header() {

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <SearchField />
          <Liked />
        </div>
      </div>

    </header>
  )
} 