"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import FormFlashSale from "./FormFlashSale";
import PetunjukFlashSale from "./PetunjukFlashSale";

export default function DaftarFlashSale() {
  const [formFlashSale, setFormFlashSale] = useState(false);

  function handleFormFlashSale() {
    setFormFlashSale(!formFlashSale);
  }
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
            Atur produk yang ingin ditampilkan di halaman Flash Sale
            tokomu!Pelajari Lebih Lanjut
          </span>
          {/* Akhir Petunjuk Flash Sale */}
        </div>
        {/* Akhir Text Daftar Flash Sale */}

        {/* Awal Button Form Flash Sale */}
        <button
          onClick={handleFormFlashSale}
          className="bg-[#EE4D2D] py-2 px-4 flex justify-between items-center gap-2 text-white rounded-md cursor-pointer hover:bg-[#d13f1e] transition-all duration-300"
        >
          {/* Awal Icon + */}
          <FiPlus className="text-lg" />
          {/* Akhir Icon + */}

          {/* Awal Text Buat */}
          <span>Buat</span>
          {/* Akhir Text Buat */}
        </button>
        {/* Akhir Button Form Flash Sale */}
      </div>
      {/* Akhir Text Daftar Flash Sale */}

      {/* Awal Form Daftar Flash Sale */}
      {formFlashSale ? <FormFlashSale /> : <PetunjukFlashSale />}
      {/* Akhir Form Daftar Flash Sale */}
    </div>
  );
}
