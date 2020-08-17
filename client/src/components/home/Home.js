import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

import { RecipesContext } from "../../context/RecipesContext";
import Search from "../searchForm/SearchForm";
import Results from "../results/Results";

const Home = (props) => {
  const { isFirstSearch } = useContext(RecipesContext);
  const { setMessage } = useContext(UserContext);
  useEffect(() => {
    setMessage("Welcome");
    if (isFirstSearch) setMessage("Recipes");
  });
  if (isFirstSearch) {
    return <Results />;
  }
  return (
    <div className="home">
      <div className="container">
        <div className="home__main">
          <h1>
            Welcome, please login or register new user or search your favorite
            dish.
          </h1>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Home;
