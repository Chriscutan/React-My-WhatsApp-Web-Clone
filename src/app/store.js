import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chatSlice";
import userReducer from "../features/userSlice";
import msgReducer from "../features/msgSlice";
import lastMsgReducer from "../features/lastMsgSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    user: userReducer,
    msg: msgReducer,
    lastMsg: lastMsgReducer,
  },
});
