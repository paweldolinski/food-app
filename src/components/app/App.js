import React from "react";
import Header from "../header/Header";
import Background from "../background/Background";
import RecipesContext from "../../context/RecipesContext";
import UserContext from "../../context/UserContext";
import Message from "../message/Message";

const App = ({ children }) => {
  return (
    <UserContext>
      <RecipesContext>
        <div className="app">
          <Header />
          <div className="app__main">
            <Background />
            <Message />
            {children}
          </div>
        </div>
      </RecipesContext>
    </UserContext>
  );
};

export default App;
