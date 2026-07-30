import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import z from "zod";
import { API_URL } from "@/src/helpers/utils";

interface BeliSekarangState {
  dataBeliSekarang: { orderId: string; token: string } | null;
  errorBeliSekarang: string | null;
  loadingBeliSekarang: boolean;
}

const initialState: BeliSekarangState = {
  dataBeliSekarang: null,
  errorBeliSekarang: null,
  loadingBeliSekarang: false,
};

export const beliSekarangSlice = createSlice({
  name: "beliSekarang",
  initialState,
  reducers: {
    beliSekarangReq: (state) => {
      state.loadingBeliSekarang = true;
      state.errorBeliSekarang = null;
    },
    beliSekarangSuccess: (
      state,
      action: PayloadAction<{ orderId: string; token: string }>,
    ) => {
      state.loadingBeliSekarang = false;
      state.dataBeliSekarang = action.payload;
    },
    beliSekarangError: (state, action: PayloadAction<string>) => {
      state.dataBeliSekarang = null;
      state.loadingBeliSekarang = false;
      state.errorBeliSekarang = action.payload;
    },
    resetBeliSekarang: (state) => {
      state.dataBeliSekarang = null;
      state.errorBeliSekarang = null;
      state.loadingBeliSekarang = false;
    },
  },
});

export const {
  beliSekarangReq,
  beliSekarangSuccess,
  beliSekarangError,
  resetBeliSekarang,
} = beliSekarangSlice.actions;

// Thunk untuk melakukan pembelian sekarang
export function doBeliSekarang(productId: string, quantity: number) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(beliSekarangReq());

      //   HIT API untuk melakukan pembelian sekarang
      const response = await fetch(`/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
        cache: "no-store",
        credentials: "include", // Sertakan cookies dalam permintaan
      });

      const data = await response.json();

      if (!response.ok) {
        const errMessage = "An error occurred while processing the purchase.";
        throw new Error(data.message || errMessage);
      }

      dispatch(beliSekarangSuccess(data.data));
    } catch (error) {
      let errMessage = "An error occurred while processing the purchase.";
      if (error instanceof z.ZodError) {
        const path = error.issues[0].path[0];
        const message = error.issues[0].message;
        errMessage = `Validation error on ${String(path)}: ${message}`;
      } else if (error instanceof Error) {
        errMessage = error.message;
      }
      dispatch(beliSekarangError(errMessage));
    }
  };
}

export default beliSekarangSlice.reducer;
