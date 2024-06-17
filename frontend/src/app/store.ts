import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { api } from "./services/api";
import themeReducer from "../features/theme/themeSlice";
import userReducer from "../features/user/userSlice";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  [api.reducerPath]: api.reducer,
});

const persistConfig = { key: "root", storage };
const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
