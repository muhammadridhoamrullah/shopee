import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import registerReducer from "./slice/registerSlice";
import verifyEmailReducer from "./slice/verifyEmailSlice";
import tambahKeranjangReducer from "./slice/detailPage/tambahKeranjangSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    verifyEmail: verifyEmailReducer,
    tambahKeranjang: tambahKeranjangReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
