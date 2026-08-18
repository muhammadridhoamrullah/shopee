import { InputItemFlashSale } from "@/src/type/flashSale";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import z from "zod";

export const tambahItemFlashSaleSlice = createSlice({
  name: "tambahItemFlashSale",
  initialState: {
    loadingTambahItemFlashSale: false,
    errorTambahItemFlashSale: null,
    dataTambahItemFlashSale: null,
  },
  reducers: {
    tambahItemFlashSaleReq: (state) => {
      state.loadingTambahItemFlashSale = true;
      state.errorTambahItemFlashSale = null;
    },
    tambahItemFlashSaleSuccess: (state, action) => {
      state.dataTambahItemFlashSale = action.payload;
      state.loadingTambahItemFlashSale = false;
    },
    tambahItemFlashSaleError: (state, action) => {
      state.dataTambahItemFlashSale = null;
      state.errorTambahItemFlashSale = action.payload;
      state.loadingTambahItemFlashSale = false;
    },
    resetTambahItemFlashSale: (state) => {
      state.dataTambahItemFlashSale = null;
      state.errorTambahItemFlashSale = null;
      state.loadingTambahItemFlashSale = false;
    },
  },
});

export const {
  tambahItemFlashSaleReq,
  tambahItemFlashSaleSuccess,
  tambahItemFlashSaleError,
  resetTambahItemFlashSale,
} = tambahItemFlashSaleSlice.actions;

// Thunk untuk menambahkan item ke flash sale
export function doTambahItemFlashSale(data: InputItemFlashSale) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(tambahItemFlashSaleReq());

      //   HIT API untuk menambahkan item ke flash sale
      const response = await fetch(`/api/flashSale`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
        credentials: "include", // Sertakan cookies dalam permintaan
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to add item to flash sale",
        );
      }
      dispatch(tambahItemFlashSaleSuccess(responseData));

      return true;
    } catch (error) {
      let errMessage = "Internal Server Error";
      if (error instanceof z.ZodError) {
        const path = error.issues[0].path[0];
        const message = error.issues[0].message;

        errMessage = `Validation error on ${String(path)}: ${message}`;
      } else if (error instanceof Error) {
        errMessage = error.message;
      }
      dispatch(tambahItemFlashSaleError(errMessage));
      return false;
    }
  };
}

export default tambahItemFlashSaleSlice.reducer;
