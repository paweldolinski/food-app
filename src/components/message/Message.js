import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Message = () => {
  const { message } = useContext(UserContext);

  return <div className="message">{message}</div>;
};

export default Message;
