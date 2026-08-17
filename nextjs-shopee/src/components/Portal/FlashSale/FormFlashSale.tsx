"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import {
  doTambahItemFlashSale,
  resetTambahItemFlashSale,
} from "@/src/store/slice/flashSale/tambahItemFlashSale";
import { ProdukRingkas } from "@/src/type/produk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  products: ProdukRingkas[];
}

export default function FormFlashSale({ products }: Props) {
  const {
    loadingTambahItemFlashSale,
    dataTambahItemFlashSale,
    errorTambahItemFlashSale,
  } = useAppSelector((state) => state.tambahItemFlashSale);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formFlashSale, setFormFlashSale] = useState({
    productId: "",
    flashPrice: "",
    flashStock: "",
    tanggal: "",
    slotStart: "",
  });

  // useEffect untuk Cek Error
  useEffect(() => {
    if (errorTambahItemFlashSale) {
      toast.error(errorTambahItemFlashSale);
    }
  }, [errorTambahItemFlashSale]);

  // useEffect untuk cek jika berhasil
  useEffect(() => {
    if (dataTambahItemFlashSale) {
      toast.success("Berhasil menambahkan item ke sesi Flash Sale");
      dispatch(resetTambahItemFlashSale());
    }
  }, [dataTambahItemFlashSale, dispatch]);

  function changeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setFormFlashSale({
      ...formFlashSale,
      [name]: value,
    });
  }

  async function submitHandler(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      productId: formFlashSale.productId,
      flashPrice: Number(formFlashSale.flashPrice),
      flashStock: Number(formFlashSale.flashStock),
      tanggal: formFlashSale.tanggal,
      slotStart: Number(formFlashSale.slotStart),
    };

    const result = await dispatch(doTambahItemFlashSale(data));

    if (result) {
      setFormFlashSale({
        productId: "",
        flashPrice: "",
        flashStock: "",
        tanggal: "",
        slotStart: "",
      });
      router.refresh();
    }
  }
  return (
    <div>
      <h1>Form Flash Sale</h1>
    </div>
  );
}
