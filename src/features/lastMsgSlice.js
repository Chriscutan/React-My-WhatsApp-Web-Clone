import { createSlice } from "@reduxjs/toolkit";

export const lastMsgSlice = createSlice({
  name: "lastMsg",
  initialState: {
    Msg: [],
  },
  reducers: {
    addLastMsg: (state, action) => {
      state.Msg = action.payload;
    },
  },
});

export const { addLastMsg } = lastMsgSlice.actions;

export const selectLastMsg = (state) => state.lastMsg.Msg;

export default lastMsgSlice.reducer;
