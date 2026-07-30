import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { API_URL } from "@/src/helpers/utils";

export const checkoutKeranjangSlice = createSlice({
  name: "checkoutKeranjang",
  initialState: {
    dataCheckoutKeranjang: null,
    errorCheckoutKeranjang: null,
    loadingCheckoutKeranjang: false,
  },
  reducers: {
    checkoutKeranjangReq: (state) => {
      state.loadingCheckoutKeranjang = true;
      state.errorCheckoutKeranjang = null;
    },
    checkoutKeranjangSuccess: (state, action) => {
      state.loadingCheckoutKeranjang = false;
      state.dataCheckoutKeranjang = action.payload;
    },
    checkoutKeranjangError: (state, action) => {
      state.dataCheckoutKeranjang = null;
      state.loadingCheckoutKeranjang = false;
      state.errorCheckoutKeranjang = action.payload;
    },
    resetCheckoutKeranjang: (state) => {
      state.dataCheckoutKeranjang = null;
      state.errorCheckoutKeranjang = null;
      state.loadingCheckoutKeranjang = false;
    },
  },
});

export const {
  checkoutKeranjangReq,
  checkoutKeranjangSuccess,
  checkoutKeranjangError,
  resetCheckoutKeranjang,
} = checkoutKeranjangSlice.actions;

// Thunk untuk checkout keranjang
export function doCheckoutKeranjang() {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(checkoutKeranjangReq());

      // HIT API untuk checkout keranjang
      const response = await fetch(`${API_URL}/api/order/checkoutKeranjang`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include", // Sertakan cookies dalam permintaan
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Checkout keranjang gagal");
      }

      dispatch(checkoutKeranjangSuccess(data.data));
    } catch (error) {
      let errMessage = "An error occurred during checkout.";
      if (error instanceof Error) {
        errMessage = error.message;
      }
      dispatch(checkoutKeranjangError(errMessage));
    }
  };
}

export default checkoutKeranjangSlice.reducer;
