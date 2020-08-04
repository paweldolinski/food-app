import React, { createContext, useState, useEffect } from "react";
import { getFromStorage, setInStorage } from "../utils/localStorage";
import uniqid from "uniqid";

export const UserContext = createContext();

export default function UserProvider(props) {
  const [userObj, setUserObj] = useState({
    name: "",
    email: "",
    password: "",
    likedArr: [],
    id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const onLoginHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch("http://localhost:4002/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: userObj.email,
        password: userObj.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.success) {
          const { user, token } = res;
          const { name, userId, likedArr } = user;
          setInStorage("theMainApp", {
            user: {
              token,
              userId,
            },
          });
          setUserObj({ ...userObj, name, id: userId, likedArr });
          setToken(res.token);
          setMessage("");
          setIsLoading(false);
          setIsLoggedIn(true);
        } else {
          setMessage(res.message);
        }
      });
  };

  const onLoginChangeHandler = (e) => {
    setUserObj({
      ...userObj,
      [e.target.name]: e.target.value,
    });
  };

  const logOut = () => {
    const getObj = getFromStorage("theMainApp");
    const { user } = getObj;
    const { token } = user;
    setIsLoggedIn(true);
    setIsLoading(true);
    setToken(token);
    if (token) {
      fetch(`/user/logout?token=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((json) => {
          if (json.success) {
            setIsLoggedIn(false);
            setIsLoading(false);
            setInStorage("theMainApp", {
              user: {
                token: "",
                userId: "",
              },
            });
            setToken("");
            setUserObj({
              name: "",
              email: "",
              likedArr: "",
              id: "",
            });
          } else {
            setIsLoggedIn(true);
            setInStorage("theMainApp", { user: { token: json.token } });
          }
        });
    } else {
      setIsLoggedIn(false);
    }
  };

  const addToFavorite = (obj) => {
    console.log(obj, "addtofavirote clicked");
    if (!obj.bookmarked) {
      obj.bookmarked = true;
      obj.id = uniqid();
    }
    let isLiked = userObj.likedArr.filter((recipe) => {
      return recipe.dish.recipe.label === obj.recipe.label;
    });
    if (isLiked.length) return;
    fetch("http://localhost:4002/user/addToFavorite", {
      method: "POST",
      body: JSON.stringify({
        dish: obj,
        id: userObj.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setUserObj({
      ...userObj,
      likedArr: userObj.likedArr.concat({ dish: obj, id: obj.id }),
    });
    console.log(userObj.likedArr);
  };

  const removeFromFavorite = (id) => {
    fetch("http://localhost:4002/user/removeFromFavorite", {
      method: "POST",
      body: JSON.stringify({
        dishId: id,
        userId: userObj.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setUserObj({
      ...userObj,
      likedArr: userObj.likedArr.filter((recipe) => recipe.id !== id),
    });
  };

  useEffect(() => {
    const getObj = getFromStorage("theMainApp");
    const { user } = getObj;
    const { token, userId } = user;
    setToken(token);
    setIsLoading(true);
    if (token) {
      fetch(`http://localhost:4002/user/verify?token=${token}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            fetch("http://localhost:4002/user/user", {
              method: "post",
              body: JSON.stringify({
                userId,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((data) => data.json())
              .then((res) => {
                if (res) {
                  const { user } = res;
                  const { name, favoriteList, _id } = user[0];
                  setUserObj({
                    ...userObj,
                    name,
                    likedArr: favoriteList,
                    id: _id,
                  });
                  setIsLoading(false);
                }
              });

            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
            console.log("noone is loggedin");
          }
        });
    } else {
      setIsLoading(false);
    }
    // localStorage.removeItem("theMainApp");
  }, []);

  return (
    <UserContext.Provider
      value={{
        userObj,
        message,
        isLoggedIn,
        isLoading,
        onLoginChangeHandler: onLoginChangeHandler,
        onLoginHandler: onLoginHandler,
        logOut: logOut,
        addToFavorite: addToFavorite,
        removeFromFavorite: removeFromFavorite,
        setMessage: setMessage,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
