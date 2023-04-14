import {
  AttachFileOutlined,
  Close,
  Delete,
  EmojiEmotionsOutlined,
  Mic,
  MoreVert,
  Search,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../components/Chat.css";
import { selectedChatId } from "../features/chatSlice";
import { auth, db } from "../firebase";
import UserChat from "./UserChat";
import { useDocument } from "react-firebase-hooks/firestore";
import Sidebar from "./Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import FlipMove from "react-flip-move";
import { addLastMsg } from "../features/lastMsgSlice";
import EmojiPicker from "emoji-picker-react";

function Chat() {
  const [input, setInput] = useState("");
  const selectedChat = useSelector(selectedChatId);
  const [user] = useAuthState(auth);
  const [userChats, setUserChats] = useState([]);
  const [emojis, setEmojis] = useState(false);
  const dispatch = useDispatch();

  const [chatDetail] = useDocument(
    selectedChat && doc(db, `rooms/${selectedChat.id}`)
  );

  const sendMessage = (e) => {
    e.preventDefault();
    if (selectedChat) {
      const colRef = collection(db, `rooms/${selectedChat.id}/messages`);

      addDoc(colRef, {
        message: input,
        sentBy: user.displayName,
        time: serverTimestamp(),
      }).catch((err) => alert(err.message));

      setInput("");
    }
  };

  useEffect(() => {
    if (selectedChat) {
      const q = query(
        collection(db, `rooms/${selectedChat.id}/messages`),
        orderBy("time", "asc")
      );

      onSnapshot(q, (snapshot) => {
        setUserChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            sentBy: doc.data().sentBy,
            message: doc.data().message,
            time: doc.data().time,
          }))
        );
      });
    }
  }, [selectedChat]);

  useEffect(() => {
    if (selectedChat && userChats) {
      dispatch(
        addLastMsg({
          msgId: selectedChat.id,
          msg: userChats[userChats.length - 1]?.message,
          sentBy: userChats[userChats.length - 1]?.sentBy,
          time:
            new Date(
              userChats[userChats.length - 1]?.time?.toDate()
            ).getHours() >= 12
              ? new Date(
                  userChats[userChats.length - 1]?.time?.toDate()
                ).getHours() -
                12 +
                ":" +
                new Date(
                  userChats[userChats.length - 1]?.time?.toDate()
                ).getMinutes() +
                " " +
                "pm"
              : new Date(
                  userChats[userChats.length - 1]?.time?.toDate()
                ).getHours() +
                ":" +
                new Date(
                  userChats[userChats.length - 1]?.time?.toDate()
                ).getMinutes() +
                " " +
                "am",
        })
      );
    }
  }, [selectedChat, userChats, dispatch]);

  const showEmojis = () => {
    setEmojis(!emojis);
  };

  if (!selectedChat) {
    return (
      <>
        <Sidebar />
        <div className="noChats">
          <div className="noChats__content">
            <img
              src="https://imgs.search.brave.com/wg6I9L9qMVvrjJFKd9S4Es71jh3bhPGxHQXYVrgKLms/rs:fit:1012:1024:1/g:ce/aHR0cDovL3d3dy5w/bmdhbGwuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzA0/L1doYXRzQXBwLVRy/YW5zcGFyZW50LnBu/Zw"
              alt=""
            />
            <h5>WhatsApp Web</h5>
            <p>
              Send and receive messages without keeping your phone online.
              <br />
              Use WhatsApp on up to 4 linked devices and 1 phone at the same
              time.
            </p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Sidebar />
      <div className="chat">
        <div className="chat__header">
          <div className="chat__headerLeft">
            <Avatar />
            <h4>{chatDetail && chatDetail.data().name}</h4>
          </div>
          <div className="chat__headerRight">
            <Search />
            <IconButton>
              <Delete />
            </IconButton>
            <MoreVert />
          </div>
        </div>

        <div className="chat__messages">
          {userChats?.map(({ id, message, sentBy, time }) => (
            <UserChat
              key={id}
              id={id}
              message={message}
              sentBy={sentBy}
              time={
                new Date(time?.toDate()).getHours() >= 12
                  ? new Date(time?.toDate()).getHours() -
                    12 +
                    ":" +
                    new Date(time?.toDate()).getMinutes() +
                    " " +
                    "pm"
                  : new Date(time?.toDate()).getHours() +
                    ":" +
                    new Date(time?.toDate()).getMinutes() +
                    " " +
                    "am"
              }
            />
          ))}
          <div className="chat__end"></div>
        </div>

        <div className="chat__input">
          <div className="chat__inputLeft">
            <IconButton onClick={showEmojis}>
              {emojis ? <Close /> : <EmojiEmotionsOutlined />}
            </IconButton>

            {emojis && (
              <>
                <div>
                  <EmojiPicker
                    onEmojiClick={(obj) => setInput(...input, obj.emoji)}
                  />
                </div>
              </>
            )}

            <IconButton>
              <AttachFileOutlined />
            </IconButton>
          </div>
          <form className="chat__inputForm" onSubmit={sendMessage}>
            <input
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>

          <div className="chat__inputRight">
            <IconButton>
              <Mic />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
