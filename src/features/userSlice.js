import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetail: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.userDetail = action.payload;
    },

    deleteUser: (state) => {
      state.userDetail = null;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export const selectUser = (state) => state.user.userDetail;

export default userSlice.reducer;
