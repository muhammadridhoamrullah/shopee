import { API_URL, formDataRegister } from "@/src/type/type";
import { createSlice } from "@reduxjs/toolkit";
import z from "zod";
import { AppDispatch } from "../store";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    dataRegister: null,
    errorRegister: null,
    loadingRegister: false,
    isRegister: false,
  },
  reducers: {
    registerRequest: (state) => {
      state.loadingRegister = true;
      state.errorRegister = null;
    },
    registerSuccess: (state, action) => {
      state.loadingRegister = false;
      state.dataRegister = action.payload;
      state.isRegister = true;
    },
    registerError: (state, action) => {
      state.loadingRegister = false;
      state.errorRegister = action.payload;
    },
  },
});

export const { registerRequest, registerSuccess, registerError } =
  registerSlice.actions;

//   Thunk untuk melakukan register
export function doRegister(formData: formDataRegister) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(registerRequest());

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData, "errorData slice reg");
        throw new Error(errorData.message || "Register failed");
      }

      const data = await response.json();

      dispatch(registerSuccess(data));
    } catch (error: unknown) {
      let errMessage = "An error occurred during register.";
      if (error instanceof z.ZodError) {
        const path = error.issues[0].path[0];
        const message = error.issues[0].message;
        errMessage = `Invalid on ${String(path)}: ${message}`;
      } else if (error instanceof Error) {
        errMessage = error.message;
      }

      dispatch(registerError(errMessage));
    }
  };
}

export default registerSlice.reducer;
