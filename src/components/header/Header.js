import React, { useContext } from "react";
import Liked from "../liked/Liked";
import { UserContext } from "../../context/UserContext";
import { RecipesContext } from "../../context/RecipesContext";

import Nav from "../nav/Nav";
import Search from "../searchForm/SearchForm";
import UserContainer from "./UserContainer";

const Header = () => {
  const { isLoggedIn, message } = useContext(UserContext);
  const { firstSearch } = useContext(RecipesContext);
  return (
    <header className={firstSearch ? "header header--top" : "header"}>
      <div className="container">
        <div className="header__wrapper">
          {isLoggedIn ? <UserContainer /> : <Nav />}
          {firstSearch && <Search />}
          <Liked />
        </div>
      </div>
    </header>
  );
};

export default Header;
