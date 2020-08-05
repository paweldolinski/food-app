import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../context/UserContext";

const Signup = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const { message, setMessage } = useContext(UserContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      setMessage("Passwords dont match!");
      return;
    }
    fetch("http://localhost:4000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      });
  };

  const onChangeHandler = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setMessage("Register new user");
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
        {message}
      </form>
    );
  }
};

export default Signup;
