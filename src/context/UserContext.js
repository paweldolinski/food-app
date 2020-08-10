import React, { createContext, useState, useEffect } from "react";
import { getFromStorage, setInStorage } from "../utils/localStorage";
import uniqid from "uniqid";

export const UserContext = createContext();

const UserProvider = (props) => {
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

  const onLoginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = fetch("http://localhost:4000/user/login", {
        method: "POST",
        body: JSON.stringify({
          email: userObj.email,
          password: userObj.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response;
      const json = await data.json();
      if (data.status === 200) {
        const { user, token } = json;
        const { name, userId, likedArr } = user;
        setInStorage("theMainApp", {
          user: {
            token,
            userId,
          },
        });
        setUserObj({ ...userObj, name, id: userId, likedArr });
        setMessage("");
        setIsLoading(false);
        setIsLoggedIn(true);
      } else {
        setMessage(json.message);
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onLoginChangeHandler = (e) => {
    setUserObj({
      ...userObj,
      [e.target.name]: e.target.value,
    });
  };

  const logOut = async () => {
    const getObj = getFromStorage("theMainApp");
    const { user } = getObj;
    const { token } = user;
    setIsLoggedIn(true);
    setIsLoading(true);

    try {
      const response = fetch(`http://localhost:4000/user/logout`, {
        method: "GET",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
      });
      const data = await response;
      const json = await data.json();
      if (data.status === 200) {
        setIsLoggedIn(false);
        setIsLoading(false);
        setInStorage("theMainApp", {
          user: {
            token: "",
            userId: "",
          },
        });

        setUserObj({
          name: "",
          email: "",
          likedArr: [],
          id: "",
        });
        setMessage(json.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToFavorite = async (obj) => {
    try {
      if (!obj.bookmarked) {
        obj.bookmarked = true;
        obj.id = uniqid();
      }
      let isLiked = userObj.likedArr.filter((recipe) => {
        return recipe.dish.recipe.label === obj.recipe.label;
      });
      if (isLiked.length) return;

      const response = fetch("http://localhost:4000/user/addToFavorite", {
        method: "POST",
        body: JSON.stringify({
          dish: obj,
          id: userObj.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response;
      if (data.status === 200) {
        setUserObj({
          ...userObj,
          likedArr: userObj.likedArr.concat({ dish: obj, id: obj.id }),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromFavorite = async (id) => {
    try {
      const response = fetch("http://localhost:4000/user/removeFromFavorite", {
        method: "POST",
        body: JSON.stringify({
          dishId: id,
          userId: userObj.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response;
      if (data.status === 200) {
        setUserObj({
          ...userObj,
          likedArr: userObj.likedArr.filter((recipe) => recipe.id !== id),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      const getObj = getFromStorage("theMainApp");
      const { user } = getObj;
      const { token, userId } = user;
      setIsLoading(true);
      try {
        const response = fetch(`http://localhost:4000/user/verify`, {
          method: "POST",
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        });

        const data = await response;
        const json = await data.json();
        if (data.status === 200) {
          const { name, likedArr, _id } = json.user[0];
          setUserObj({
            ...userObj,
            name,
            likedArr,
            id: _id,
          });
          setIsLoggedIn(true);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    };
    verifyUser();
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
};
export default UserProvider;
