import React, { useContext } from "react";
import Liked from "../liked/Liked";
import { UserContext } from "../../context/UserContext";
import { RecipesContext } from "../../context/RecipesContext";

import Nav from "../nav/Nav";
import Search from "../searchForm/SearchForm";
import UserContainer from "./UserContainer";

const Header = () => {
  const { isLoggedIn, message } = useContext(UserContext);
  const { isFirstSearch } = useContext(RecipesContext);
  return (
    <header className={isFirstSearch ? "header header--top" : "header"}>
      <div className="container">
        <div className="header__wrapper">
          {isLoggedIn ? <UserContainer /> : <Nav />}
          {isFirstSearch && <Search />}
          <Liked />
        </div>
      </div>
    </header>
  );
};

export default Header;
