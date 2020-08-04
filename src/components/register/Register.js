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
    fetch("http://localhost:4002/user/register", {
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
        if (res.success) {
          setSuccess(true);
        } else {
          setMessage(res.message);
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
      <form onSubmit={onSubmitHandler}>
        <label>SIGNUP</label>
        <br></br>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={onChangeHandler}
        />{" "}
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={onChangeHandler}
        />{" "}
        <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={onChangeHandler}
        />{" "}
        <br />
        <input
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          onChange={onChangeHandler}
        />{" "}
        <br />
        <button>Register</button>
        {message}
      </form>
    );
  }
};

export default Signup;
