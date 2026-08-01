"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import {
  doBeliSekarang,
  resetBeliSekarang,
} from "@/src/store/slice/detailPage/beliSekarangSlice";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  data: {
    productId: string;
    quantity: number;
  };
}

export default function BeliSekarang({ data }: Props) {
  const { dataBeliSekarang, errorBeliSekarang, loadingBeliSekarang } =
    useAppSelector((state) => state.beliSekarang);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (errorBeliSekarang) {
      toast.error(errorBeliSekarang);
    }
  }, [errorBeliSekarang]);

  useEffect(() => {
    if (dataBeliSekarang) {
      window.snap.pay(dataBeliSekarang.token, {
        onSuccess: () => {
          toast.success("Pembayaran berhasil");
          router.push(`/order/${dataBeliSekarang.orderId}`);
          dispatch(resetBeliSekarang());
        },
        onPending: () => {
          toast.info("Menunggu pembayaran");
          router.push(`/order/${dataBeliSekarang.orderId}`);
          dispatch(resetBeliSekarang());
        },
        onError: () => {
          toast.error("Pembayaran gagal, silahkan coba lagi");
          dispatch(resetBeliSekarang());
        },
        onClose: () => {
          toast.info("Anda menutup popup pembayaran");
          dispatch(resetBeliSekarang());
        },
      });
    }
  }, [dataBeliSekarang, dispatch, router]);

  function handleBeliSekarang() {
    dispatch(doBeliSekarang(data.productId, data.quantity));
  }

  return (
    <button
      disabled={loadingBeliSekarang}
      className="bg-red-800 hover:bg-red-700 w-fit px-8 py-3 font-medium cursor-pointer text-white"
      onClick={handleBeliSekarang}
    >
      {loadingBeliSekarang ? "Loading..." : "Beli Sekarang"}
    </button>
  );
}
