// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  username: "",
  email: "",
  image: null,
  name: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.token = "";
    },
  },
});

export const { setUser, setToken, clearUser } = userSlice.actions;

export default userSlice.reducer;
