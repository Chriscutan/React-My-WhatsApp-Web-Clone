import React, { forwardRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "../components/UserChat.css";
import { auth } from "../firebase";

const UserChat = forwardRef(({ id, message, time, sentBy }, ref) => {
  const [user] = useAuthState(auth);
  const sender = user.displayName === sentBy;

  return (
    <div className="userChat" ref={ref}>
      <div className={sender ? "chat__sender" : "chat__message"}>
        <p className="msg">{message}</p>
        <p className="time">{time}</p>
      </div>
    </div>
  );
});

export default UserChat;
