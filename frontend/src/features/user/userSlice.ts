import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  email: string | null;
  username: string | null;
  picturePath?: string | null | undefined;
  about?: string | null | undefined;
  karma?: number | null | undefined;
  createdAt: Date | null;
  updatedAt: Date | null;
}

const initialState = { email: null, username: null, createdAt: null, updatedAt: null };

const userSlice = createSlice({
  name: "user",
  initialState: initialState as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.picturePath = action.payload.picturePath;
      state.about = action.payload.about;
      state.karma = action.payload.karma;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    },
    resetUser: (state) => {
      state.email = null;
      state.username = null;
      state.picturePath = null;
      state.about = null;
      state.karma = null;
      state.createdAt = null;
      state.updatedAt = null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
