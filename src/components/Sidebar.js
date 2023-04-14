import {
  Chat,
  DonutLarge,
  FilterList,
  Groups,
  MoreVert,
  Search,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../components/Sidebar.css";
import SidebarChat from "./SidebarChat";
import { addDoc, onSnapshot } from "firebase/firestore";
import { auth, colRef } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { deleteUser } from "../features/userSlice";

function Sidebar() {
  const [chats, setChats] = useState([]);
  const userDetail = useSelector(selectUser);

  const dispatch = useDispatch();

  const addNewChat = () => {
    const roomName = prompt("Enter the room name");

    if (roomName) {
      addDoc(colRef, {
        name: roomName,
      }).catch((err) => alert(err.message));
    }
  };

  useEffect(() => {
    const unsubscribe = () => {
      onSnapshot(colRef, (snapshot) => {
        setChats(
          snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name }))
        );
      });
    };

    return unsubscribe;
  }, []);

  const signOutUser = () => {
    auth.signOut();
    dispatch(deleteUser());
  };

  return (
    <div className="sidebar">
      <div className="siderbar__header">
        <IconButton onClick={signOutUser}>
          <Avatar src={userDetail?.photo} />
        </IconButton>
        <div className="sidebar__headerOptions">
          <IconButton>
            <Groups />
          </IconButton>

          <IconButton>
            <DonutLarge />
          </IconButton>

          <IconButton onClick={addNewChat}>
            <Chat />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="siderbar__searchBar">
          <Search />
          <input placeholder="Search or start new chat" />
        </div>
        <FilterList className="filterList" />
      </div>

      <div className="sidebar__chats">
        {chats?.map((chat) => (
          <SidebarChat key={chat.id} name={chat.name} id={chat.id} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
