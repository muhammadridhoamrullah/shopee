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
      toast.success("Pembelian berhasil! Silakan cek halaman pesanan Anda.");
      router.push("/my-orders");
      dispatch(resetBeliSekarang());
    }
  }, [dataBeliSekarang, dispatch, router]);

  function handleBeliSekarang() {
    dispatch(doBeliSekarang(data.productId, data.quantity));
  }

  return (
    <button className="bg-[#EE4D2D] w-fit p-2" onClick={handleBeliSekarang}>
      Beli Sekarang
    </button>
  );
}
