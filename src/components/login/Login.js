import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { RecipesContext } from "../../context/RecipesContext";
import { Redirect } from "react-router";

const SignIn = (props) => {
  const {
    isLoggedIn,
    onLoginChangeHandler,
    onLoginHandler,
    setMessage,
  } = useContext(UserContext);

  const { setData, setIsBackground } = useContext(RecipesContext);

  useEffect(() => {
    setIsBackground(true);
    setMessage("Login");
  }, []);

  if (isLoggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <form className="login-form" onSubmit={onLoginHandler}>
          <label className="login-form__label">
            Email
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={onLoginChangeHandler}
            />
          </label>
          <label className="login-form__label">
            Password
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={onLoginChangeHandler}
            />
          </label>
          <button>Login</button>
        </form>
      </>
    );
  }
};

export default SignIn;
