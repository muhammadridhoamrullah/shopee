import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

export const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    dataLogout: null,
    errorLogout: null,
    loadingLogout: false,
  },
  reducers: {
    logoutReq: (state) => {
      state.loadingLogout = true;
      state.errorLogout = null;
    },
    logoutSuccess: (state, action) => {
      state.loadingLogout = false;
      state.dataLogout = action.payload;
    },
    logoutError: (state, action) => {
      state.loadingLogout = false;
      state.errorLogout = action.payload;
    },
  },
});

export const { logoutReq, logoutSuccess, logoutError } = logoutSlice.actions;

// Thunk untuk mealkukan logout
export function doLogout() {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(logoutReq());

      const response = await fetch(`/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include", // Include cookies in the request
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || "Logout failed");
      }

      dispatch(logoutSuccess(data.data));
    } catch (error) {
      let errMessage = "Internal Server Error";
      if (error instanceof Error) {
        errMessage = error.message;
      }
      dispatch(logoutError(errMessage));
    }
  };
}

export default logoutSlice.reducer;
