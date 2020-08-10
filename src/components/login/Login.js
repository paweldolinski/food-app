import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Redirect } from "react-router";

const SignIn = (props) => {
  const {
    isLoggedIn,
    onLoginChangeHandler,
    onLoginHandler,
    message,
    setMessage,
  } = useContext(UserContext);

  useEffect(() => {
    setMessage("Please login");
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
