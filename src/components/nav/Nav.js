import React, { useContext } from "react";
import { MyRecipesContext } from "../../context/MyRecipesContext";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Register from "../register/Register";
import Login from "../login/Login";

export default function Modal() {
  return (
    <nav className="nav">
      <Link className="nav__link" to="/register">
        Register
      </Link>{" "}
      <br />
      <Link className="nav__link" to="/login">
        Login
      </Link>{" "}
      <br />
      {/* <Link to="/">Home</Link>
      <br />
      <Link to="/results">Results</Link> */}
    </nav>
  );
}
