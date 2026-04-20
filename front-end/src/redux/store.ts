import { configureStore } from "@reduxjs/toolkit";
import { menuReducer } from "../store/menuSlice";

import authReducer from "../store/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;