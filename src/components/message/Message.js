import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Message = () => {
  const { message } = useContext(UserContext);
  const { userObj } = useContext(UserContext);

  return (
    <div className="message">
      {userObj.name !== "" ? `Welcome ${userObj.name}` : message}
    </div>
  );
};

export default Message;
