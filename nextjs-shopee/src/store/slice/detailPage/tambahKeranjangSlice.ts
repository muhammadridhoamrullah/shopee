import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import z from "zod";
import { API_URL } from "@/src/helpers/utils";

export const tambahKeranjangSlice = createSlice({
  name: "tambahKeranjang",
  initialState: {
    dataTambahKeranjang: null,
    errorTambahKeranjang: null,
    loadingTambahKeranjang: false,
  },
  reducers: {
    tambahKeranjangReq: (state) => {
      state.loadingTambahKeranjang = true;
      state.errorTambahKeranjang = null;
    },
    tambahKeranjangSuccess: (state, action) => {
      state.loadingTambahKeranjang = false;
      state.dataTambahKeranjang = action.payload;
    },
    tambahKeranjangError: (state, action) => {
      state.dataTambahKeranjang = null;
      state.loadingTambahKeranjang = false;
      state.errorTambahKeranjang = action.payload;
    },
    resetTambahKeranjang: (state) => {
      state.dataTambahKeranjang = null;
      state.errorTambahKeranjang = null;
      state.loadingTambahKeranjang = false;
    },
  },
});

export const {
  tambahKeranjangReq,
  tambahKeranjangSuccess,
  tambahKeranjangError,
  resetTambahKeranjang,
} = tambahKeranjangSlice.actions;

// Thunk untuk menambahkan item ke keranjang
export function doTambahKeranjang(productId: string, quantity: number) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(tambahKeranjangReq());

      //   HIT API untuk menambahkan item ke keranjang
      const response = await fetch(`${API_URL}/api/cart`, {
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
        throw new Error(data.message || "Failed to add item to cart");
      }

      dispatch(tambahKeranjangSuccess(data));
    } catch (error) {
      let errMessage = "An error occurred while adding item to cart.";
      if (error instanceof z.ZodError) {
        const path = error.issues[0].path[0];
        const message = error.issues[0].message;
        errMessage = `Validation error on ${String(path)}: ${message}`;
      } else if (error instanceof Error) {
        errMessage = error.message;
      }
      dispatch(tambahKeranjangError(errMessage));
    }
  };
}

export default tambahKeranjangSlice.reducer;
