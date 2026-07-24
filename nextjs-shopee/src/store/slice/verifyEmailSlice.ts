import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { API_URL } from "@/src/helpers/utils";

export const verifyEmailSlice = createSlice({
  name: "verifyEmail",
  initialState: {
    dataVerifyEmail: null,
    errorVerifyEmail: null,
    loadingVerifyEmail: false,
    isVerifyEmail: false,
  },
  reducers: {
    verifyEmailRequest: (state) => {
      state.loadingVerifyEmail = true;
      state.errorVerifyEmail = null;
    },
    verifyEmailSuccess: (state, action) => {
      state.loadingVerifyEmail = false;
      state.dataVerifyEmail = action.payload;
      state.isVerifyEmail = true;
    },
    verifyEmailError: (state, action) => {
      state.loadingVerifyEmail = false;
      state.errorVerifyEmail = action.payload;
    },
  },
});

export const { verifyEmailRequest, verifyEmailSuccess, verifyEmailError } =
  verifyEmailSlice.actions;

//   Thunk untuk melakukan verifikasi email
export function doVerifyEmail(token: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(verifyEmailRequest());

      const response = await fetch(
        `${API_URL}/api/auth/verify-email?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Email verification failed");
      }

      const data = await response.json();

      dispatch(verifyEmailSuccess(data));
    } catch (error: unknown) {
      let errMessage = "An error occurred during email verification.";
      if (error instanceof Error) {
        errMessage = error.message;
      }
      dispatch(verifyEmailError(errMessage));
    }
  };
}

export default verifyEmailSlice.reducer;
