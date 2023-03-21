import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
};
const userSlice = createSlice({
  name: "usersss",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      console.log(payload, "first...............")
      state.userInfo = payload;
    },
  },
});

const { reducer, actions } = userSlice;

export const { setUser } = actions;

export default reducer;
