import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "toggle",
  initialState: {
    sidebar: true,
  },
  reducers: {
    toggleSidebar: (state) => {
      console.log("in slice", state);
      state.sidebar = !state.sidebar;
    },
  },
});

export const { toggleSidebar } = userSlice.actions;

export default userSlice.reducer;
