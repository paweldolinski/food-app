import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import btn from "../../assets/img/down-chevron.svg";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="nav">
      <nav className="nav__nav">
        <button className="nav__btn" onClick={toggleMenu}>
          <img
            src={btn}
            className={isOpen ? "nav__img--open nav__img" : "nav__img"}
            alt="drop menu button"
          />
        </button>
        <div
          className={
            isOpen
              ? "nav__nav-wrapper nav__nav-wrapper--open"
              : "nav__nav-wrapper"
          }
        >
          <Link className="nav__link" onClick={closeMenu} to="/register">
            Register
          </Link>
          <Link className="nav__link" onClick={closeMenu} to="/login">
            Login
          </Link>
          <Link className="nav__link" onClick={closeMenu} to="/">
            Recipes
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
