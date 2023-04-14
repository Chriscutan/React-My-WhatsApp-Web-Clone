import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatId: null,
  },
  reducers: {
    addChatId: (state, action) => {
      state.chatId = action.payload;
    },
  },
});

export const { addChatId } = chatSlice.actions;

export const selectedChatId = (state) => state.chat.chatId;

export default chatSlice.reducer;
