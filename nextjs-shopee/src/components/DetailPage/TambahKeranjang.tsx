"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import {
  doTambahKeranjang,
  resetTambahKeranjang,
} from "@/src/store/slice/detailPage/tambahKeranjangSlice";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  data: {
    productId: string;
    quantity: number;
  };
}

export default function TambahKeranjang({ data }: Props) {
  const { loadingTambahKeranjang, dataTambahKeranjang, errorTambahKeranjang } =
    useAppSelector((state) => state.tambahKeranjang);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (errorTambahKeranjang) {
      toast.error(errorTambahKeranjang);
    }
  }, [errorTambahKeranjang]);

  useEffect(() => {
    if (dataTambahKeranjang) {
      toast.success("Berhasil menambahkan produk ke keranjang");
      dispatch(resetTambahKeranjang());
    }
  }, [dataTambahKeranjang, router, dispatch]);

  //   Dispatch action untuk menambahkan item ke keranjang

  async function handleTambahKeranjang() {
    dispatch(doTambahKeranjang(data.productId, data.quantity));
  }

  return (
    <button
      disabled={loadingTambahKeranjang}
      className="bg-[#F5F5F5] px-5 py-2 w-fit font-medium cursor-pointer"
      onClick={handleTambahKeranjang}
    >
      {loadingTambahKeranjang ? "Loading..." : "Masuk Keranjang"}
    </button>
  );
}
