import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Redirect } from "react-router";

const SignIn = (props) => {
  const {
    isLoggedIn,
    onLoginChangeHandler,
    onLoginHandler,
    message,
  } = useContext(UserContext);

  if (isLoggedIn) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <form onSubmit={onLoginHandler}>
          <label>SIGNIN</label>
          <br></br>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={onLoginChangeHandler}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={onLoginChangeHandler}
          />
          <br />
          <button>LogIn</button>
          {message}
        </form>
      </>
    );
  }
};

export default SignIn;
