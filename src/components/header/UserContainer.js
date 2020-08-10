import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const UserContainer = () => {
  const { userObj, logOut } = useContext(UserContext);

  return (
    <div className="user">
      <div className="user__wrapper">
        <p>Welcome: {userObj.name}</p>
        <button className="user__logout" onClick={logOut}>
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default UserContainer;
