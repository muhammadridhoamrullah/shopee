"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import PetunjukFlashSale from "./PetunjukFlashSale";
import { ProdukRingkas } from "@/src/type/produk";
import AdaDaftarFlashSale from "./AdaDaftarFlashSale";
import Link from "next/link";

interface Props {
  products: ProdukRingkas[];
}

export default function DaftarFlashSale({ products }: Props) {
  const [adaFlashSale, setAdaFlashSale] = useState(false);

  return (
    <div className="bg-white w-full h-fit p-5 rounded-md shadow-md flex flex-col gap-4 justify-start items-start">
      {/* Awal Text Daftar Flash Sale */}
      <div className=" w-full h-fit flex justify-between items-center">
        {/* Awal Text Daftar Flash Sale */}
        <div className=" flex flex-col justify-between items-start gap-2">
          {/* Awal Text Daftar Flash Sale */}
          <span className="font-bold text-xl">Daftar Flash Sale</span>
          {/* Akhir Text Daftar Flash Sale */}

          {/* Awal Petunjuk Flash Sale */}
          <span className="text-sm text-gray-400">
            Atur produk yang ingin ditampilkan di halaman Flash Sale tokomu!{" "}
            <span className="text-blue-500 underline cursor-pointer">
              Pelajari Lebih Lanjut
            </span>
          </span>
          {/* Akhir Petunjuk Flash Sale */}
        </div>
        {/* Akhir Text Daftar Flash Sale */}

        {/* Awal Button Form Flash Sale */}
        <Link
          href={"/portal/flash-sale/form"}
          className="bg-[#EE4D2D] py-2 px-4 flex justify-between items-center gap-2 text-white rounded-md cursor-pointer hover:bg-[#d13f1e] transition-all duration-300"
        >
          {/* Awal Icon + */}
          <FiPlus className="text-lg" />
          {/* Akhir Icon + */}

          {/* Awal Text Buat */}
          <span>Buat</span>
          {/* Akhir Text Buat */}
        </Link>
        {/* Akhir Button Form Flash Sale */}
      </div>
      {/* Akhir Text Daftar Flash Sale */}

      {/* Awal Form Daftar Flash Sale */}
      {adaFlashSale ? <AdaDaftarFlashSale /> : <PetunjukFlashSale />}
      {/* Akhir Form Daftar Flash Sale */}
    </div>
  );
}
