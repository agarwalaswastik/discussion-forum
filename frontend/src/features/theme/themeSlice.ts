import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";

export interface ThemeState {
  mode: "light" | "dark";
}

const initialState: ThemeState = { mode: "light" };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;

export const selectTheme = (state: RootState) => state.theme.mode;
