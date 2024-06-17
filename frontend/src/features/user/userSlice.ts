import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
} | null;

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState: initialState as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
