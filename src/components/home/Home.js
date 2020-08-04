import React, { Component, useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { MyRecipesContext } from "../../context/MyRecipesContext";
import Search from "../searchForm/SearchForm";
import Results from "../results/Results";

const Home = (props) => {
  const { firstSearch } = useContext(MyRecipesContext);

  // if (isLoading) {
  //   return <h1>LOADING... . . .</h1>;
  // }
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
