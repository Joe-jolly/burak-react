import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { UrlWithStringQuery } from "url";
import HomePageReducer from "./screens/homePage/slice";

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
