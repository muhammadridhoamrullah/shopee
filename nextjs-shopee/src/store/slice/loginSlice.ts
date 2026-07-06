import { API_URL, formDataLogin } from "@/src/type/type";
import { createSlice } from "@reduxjs/toolkit";
import z from "zod";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    dataLogin: null,
    errorLogin: null,
    loadingLogin: false,
    isLogin: false,
  },
  reducers: {
    loginRequest: (state) => {
      state.loadingLogin = true;
      state.errorLogin = null;
    },
    loginSuccess: (state, action) => {
      state.loadingLogin = false;
      state.dataLogin = action.payload;
      state.isLogin = true;
    },
    loginError: (state, action) => {
      state.loadingLogin = false;
      state.errorLogin = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginError } = loginSlice.actions;

export function doLogin(formData: formDataLogin) {
  return async (dispatch: any) => {
    try {
      dispatch(loginRequest());

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      console.log(response, "response login");

      const data = await response.json();
      console.log(data, "data login slice");

      dispatch(loginSuccess(data.data));
    } catch (error) {
      let errMessage = "An error occurred during login.";
      if (error instanceof z.ZodError) {
        const path = error.issues[0].path[0];
        const message = error.issues[0].message;
        errMessage = `Validation error on ${String(path)}: ${message}`;
      } else if (error instanceof Error) {
        errMessage = error.message;
      }

      dispatch(loginError(errMessage));
    }
  };
}

export default loginSlice.reducer;
