import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../context/UserContext";
import { RecipesContext } from "../../context/RecipesContext";

const Signup = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const { setMessage } = useContext(UserContext);
  const { setIsBackground } = useContext(RecipesContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const pattern =
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
    if (!newUser.password.match(pattern)) {
      setMessage(
        "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number and at least one special character,"
      );
      return;
    }
    if (newUser.password !== newUser.confirmPassword) {
      setMessage("Passwords dont match!");
      return;
    }

    // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$"

    const response = fetch("http://localhost:4000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      }),
    });
    const data = await response;
    const json = await data.json();
    if (data.status === 200) {
      setSuccess(true);
      setMessage(json.message);
    } else {
      setSuccess(false);
      setMessage(json.message);
    }
  };

  const onChangeHandler = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setMessage("Register new user");
    setIsBackground(true);
  }, []);

  if (success) {
    return <Redirect to="/login" />;
  } else {
    return (
      <form className="register-form" onSubmit={onSubmitHandler}>
        <h2>SIGNUP</h2>
        <label className="register-form__label">
          Email
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={onChangeHandler}
          />
        </label>
        <label className="register-form__label">
          Name
          <input
            type="text"
            placeholder="name"
            name="name"
            onChange={onChangeHandler}
          />
        </label>
        <label className="register-form__label">
          Password
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={onChangeHandler}
          />
        </label>
        <label className="register-form__label">
          Confirm password
          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            onChange={onChangeHandler}
          />
        </label>
        <button>Register</button>
      </form>
    );
  }
};

export default Signup;
