import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";

interface CheckoutKeranjangState {
  dataCheckoutKeranjang: { orderId: string; token: string } | null;
  errorCheckoutKeranjang: string | null;
  loadingCheckoutKeranjang: boolean;
}

const initialState: CheckoutKeranjangState = {
  dataCheckoutKeranjang: null,
  errorCheckoutKeranjang: null,
  loadingCheckoutKeranjang: false,
};

export const checkoutKeranjangSlice = createSlice({
  name: "checkoutKeranjang",
  initialState,
  reducers: {
    checkoutKeranjangReq: (state) => {
      state.loadingCheckoutKeranjang = true;
      state.errorCheckoutKeranjang = null;
    },
    checkoutKeranjangSuccess: (
      state,
      action: PayloadAction<{ orderId: string; token: string }>,
    ) => {
      state.loadingCheckoutKeranjang = false;
      state.dataCheckoutKeranjang = action.payload;
    },
    checkoutKeranjangError: (state, action: PayloadAction<string>) => {
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
      const response = await fetch(`/api/order/checkoutKeranjang`, {
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
