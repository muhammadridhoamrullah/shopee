import { createSlice } from "@reduxjs/toolkit";
import { pubApi } from "../axiosInstance";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    dataRegister: null,
    loadingRegister: false,
    errorRegister: null,
  },
  reducers: {
    registerReq: (state) => {
      state.loadingRegister = true;
      state.errorRegister = null;
    },
    registerSuccess: (state, action) => {
      state.loadingRegister = false;
      state.dataRegister = action.payload;
    },
    registerError: (state, action) => {
      state.loadingRegister = false;
      state.errorRegister = action.payload;
    },
  },
});

export const { registerReq, registerSuccess, registerError } =
  registerSlice.actions;

//   Thunk untuk register
export async function doRegister(formData) {
  return async (dispatch) => {
    try {
      dispatch(registerReq());

      //   Hit API Register
      const response = await pubApi.post("/users/register", formData);

      dispatch(registerSuccess(response.data));
    } catch (error) {
      dispatch(
        registerError(
          error.message || error.response?.data?.message || "Register failed",
        ),
      );
    }
  };
}

export default registerSlice.reducer;
