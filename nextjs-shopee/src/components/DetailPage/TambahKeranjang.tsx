"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { doTambahKeranjang } from "@/src/store/slice/detailPage/tambahKeranjangSlice";
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

  //   Dispatch action untuk menambahkan item ke keranjang

  async function handleTambahKeranjang() {
    dispatch(doTambahKeranjang(data.productId, data.quantity));
  }

  return (
    <button className="bg-[#F5F5F5] p-2 w-fit" onClick={handleTambahKeranjang}>
      Masukkan Keranjang
    </button>
  );
}
