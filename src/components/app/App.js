import React from "react";
import Header from "../header/Header";
import Results from "../results/Results";
import Background from "../background/Background";
import MyRecipesContext from "../../context/MyRecipesContext";
import UserContext from "../../context/UserContext";

const App = ({ children }) => {
  return (
    <UserContext>
      <MyRecipesContext>
        <div className="app">
          <Header />
          <Background />
          {children}
        </div>
      </MyRecipesContext>
    </UserContext>
  );
};

export default App;
