import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import registerReducer from "./slice/registerSlice";
import verifyEmailReducer from "./slice/verifyEmailSlice";
import tambahKeranjangReducer from "./slice/detailPage/tambahKeranjangSlice";
import beliSekarangReducer from "./slice/detailPage/beliSekarangSlice";
import checkoutKeranjangReducer from "./slice/cart/checkoutKeranjangSlice";
import logoutReducer from "./slice/logoutSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    verifyEmail: verifyEmailReducer,
    tambahKeranjang: tambahKeranjangReducer,
    beliSekarang: beliSekarangReducer,
    checkoutKeranjang: checkoutKeranjangReducer,
    logout: logoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
