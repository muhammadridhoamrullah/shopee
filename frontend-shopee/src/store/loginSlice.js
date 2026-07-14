import { createSlice } from "@reduxjs/toolkit";
import { pubApi } from "../axiosInstance";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    dataLogin: null,
    loadingLogin: false,
    errorLogin: null,
  },
  reducers: {
    loginReq: (state) => {
      state.loadingLogin = true;
      state.errorLogin = null;
    },
    loginSuccess: (state, action) => {
      state.loadingLogin = false;
      state.dataLogin = action.payload;
    },
    loginError: (state, action) => {
      state.loadingLogin = false;
      state.errorLogin = action.payload;
    },
  },
});

export const { loginReq, loginSuccess, loginError } = loginSlice.actions;

// Thunk untuk login
export async function doLogin(formData) {
  return async (dispatch) => {
    try {
      dispatch(loginReq());

      // Hit API Login
      const response = await pubApi.post("/users/login", formData);

      // Simpan access_token ke localStorage
      localStorage.access_token = response.data.access_token;

      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(
        loginError(
          error.message || error.response?.data?.message || "Login failed",
        ),
      );
    }
  };
}

export default loginSlice.reducer;
