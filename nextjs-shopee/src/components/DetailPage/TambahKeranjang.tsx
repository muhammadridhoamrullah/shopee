"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import {
  doTambahKeranjang,
  resetTambahKeranjang,
} from "@/src/store/slice/detailPage/tambahKeranjangSlice";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { GrCart } from "react-icons/gr";
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
      className="bg-[#F5F5F5] hover:bg-white px-8 py-3 w-fit font-medium cursor-pointer border border-red-800 "
      onClick={handleTambahKeranjang}
    >
      {loadingTambahKeranjang ? (
        <span>Loading</span>
      ) : (
        <div className="flex justify-center items-center gap-2">
          {/* Awal Icon Cart */}
          <GrCart className="w-5 h-5" />
          {/* Akhir Icon Cart */}

          {/* Awal Text Tambah Keranjang */}
          <span>Tambah Keranjang</span>
          {/* Akhir Text Tambah Keranjang */}
        </div>
      )}
    </button>
  );
}
