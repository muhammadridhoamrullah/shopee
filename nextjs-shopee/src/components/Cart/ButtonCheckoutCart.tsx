"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import {
  doCheckoutKeranjang,
  resetCheckoutKeranjang,
} from "@/src/store/slice/cart/checkoutKeranjangSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ButtonCheckoutCart() {
  const {
    loadingCheckoutKeranjang,
    dataCheckoutKeranjang,
    errorCheckoutKeranjang,
  } = useAppSelector((state) => state.checkoutKeranjang);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (errorCheckoutKeranjang) {
      toast.error(errorCheckoutKeranjang);
    }
  }, [errorCheckoutKeranjang]);

  useEffect(() => {
    if (dataCheckoutKeranjang) {
      window.snap.pay(dataCheckoutKeranjang.token, {
        onSuccess: () => {
          toast.success("Pembayaran berhasil");
          router.push(`/order/${dataCheckoutKeranjang.orderId}`);
          dispatch(resetCheckoutKeranjang());
        },

        onPending: () => {
          toast.info("Menunggu pembayaran");
          router.push(`/order/${dataCheckoutKeranjang.orderId}`);
          dispatch(resetCheckoutKeranjang());
        },
        onError: () => {
          toast.error("Pembayaran gagal, silahkan coba lagi");
          dispatch(resetCheckoutKeranjang());
        },
        onClose: () => {
          toast.info("Anda menutup popup pembayaran");
          dispatch(resetCheckoutKeranjang());
        },
      });
    }
  }, [dataCheckoutKeranjang, dispatch, router]);

  function handleCheckout() {
    dispatch(doCheckoutKeranjang());
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loadingCheckoutKeranjang}
      className="bg-[#EE4D2D] px-4 py-2 rounded-md font-semibold text-lg"
    >
      {loadingCheckoutKeranjang ? "Loading..." : "Checkout CUY"}
    </button>
  );
}
