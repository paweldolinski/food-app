import React, { useContext } from "react";
import Liked from "../liked/Liked";
import { UserContext } from "../../context/UserContext";
import { MyRecipesContext } from "../../context/MyRecipesContext";

import Nav from "../nav/Nav";
import Search from "../searchForm/SearchForm";
import UserContainer from "./UserContainer";

export default function Header() {
  const { isLoggedIn } = useContext(UserContext);
  const { firstSearch } = useContext(MyRecipesContext);
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
}
