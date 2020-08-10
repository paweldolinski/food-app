import React, { Component, useContext, useState, useEffect } from "react";

import { RecipesContext } from "../../context/RecipesContext";
import Search from "../searchForm/SearchForm";
import Results from "../results/Results";

const Home = (props) => {
  const { firstSearch } = useContext(RecipesContext);
  if (firstSearch) {
    return <Results />;
  }
  return (
    <div className="home">
      <div className="container">
        <div className="home_main">
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
