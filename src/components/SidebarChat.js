import { Avatar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../components/SidebarChat.css";
import { addChatId } from "../features/chatSlice";
import { selectLastMsg } from "../features/lastMsgSlice";

function SidebarChat({ id, name }) {
  const dispatch = useDispatch();
  const openSelectedChat = () => {
    dispatch(addChatId({ id }));
  };

  const lastChatMsg = useSelector(selectLastMsg);

  return (
    <div className="sidebarChat" onClick={openSelectedChat}>
      <div className="sidebarChat__left">
        <Avatar />
        <div className="sidebarChat__leftChat">
          <p>{name}</p>
          <p className="sentBy">
            {id === lastChatMsg.msgId ? lastChatMsg.sentBy : "Guest"} :{" "}
            {id === lastChatMsg.msgId ? lastChatMsg.msg : "Last message"}
          </p>
        </div>
      </div>
      <p className="time">
        {id === lastChatMsg.msgId ? lastChatMsg.time : "7:44 am"}
      </p>
    </div>
  );
}

export default SidebarChat;
