import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import type UserData from "./user";

export interface UserState {
  loggedInUser: UserData | null;
}

const initialState = { loggedInUser: null };

const userSlice = createSlice({
  name: "user",
  initialState: initialState as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.loggedInUser = action.payload.loggedInUser;
    },
    resetUser: (state) => {
      state.loggedInUser = null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

export const selectLoggedInUser = (state: RootState) => state.user.loggedInUser;
export const selectLoggedInUsername = (state: RootState) => state.user.loggedInUser?.username;
