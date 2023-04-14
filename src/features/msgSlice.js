import { createSlice } from "@reduxjs/toolkit";

export const msgSlice = createSlice({
  name: "msg",
  initialState: {
    msgId: null,
  },
  reducers: {
    addMsgId: (state, action) => {
      state.msgId = action.payload;
    },
  },
});

export const { addMsgId } = msgSlice.actions;

export const selectedMsgId = (state) => state.msg.msgId;

export default msgSlice.reducer;
