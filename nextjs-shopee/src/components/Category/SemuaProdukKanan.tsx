"use client";

import { ProdukResponse } from "@/src/type/produk";
import { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import CardProductRekomendasi from "../MainPage/Rekomendasi/CardProdukRekomendasi";

interface Props {
  produk: ProdukResponse[];
}

export default function SemuaProdukKanan({ produk }: Props) {
  const [dropdownHarga, setDropDownHarga] = useState(false);
  console.log(produk, "produk di SmeuaPordk kanan");

  function handleDropdownHarga() {
    setDropDownHarga(!dropdownHarga);
  }

  return (
    <div className="flex-1 h-full flex flex-col gap-2 justify-start items-start">
      {/* Awal Filter Produk */}
      <div className="bg-amber-300 w-full h-18 flex justify-between items-center ">
        {/* Awal Filter */}
        <div className="bg-purple-400 flex items-center gap-2 text-black font-medium">
          {/* Awal Text Urutkan */}
          <span>Urutkan</span>
          {/* Akhir Text Urutkan */}

          {/* Awal Populer */}
          <button className="px-5 py-2 bg-[#EE4D2D] text-white rounded-md hover:bg-[#c43d24] transition-colors duration-300 ease-in-out cursor-pointer">
            Populer
          </button>
          {/* Akhir Populer */}

          {/* Awal Terbaru */}
          <button className="px-5 py-2 bg-white rounded-md hover:bg-gray-200 transition-colors duration-300 ease-in-out cursor-pointer">
            Terbaru
          </button>
          {/* Akhir Terbaru */}

          {/* Awal Terlaris */}
          <button className="px-5 py-2 bg-white rounded-md hover:bg-gray-200 transition-colors duration-300 ease-in-out cursor-pointer">
            Terlaris
          </button>
          {/* Akhir Terlaris */}

          {/* Awal Harga */}
          <button
            className="bg-white w-52 h-fit p-2 flex justify-between items-center rounded-md hover:bg-gray-200 transition-colors duration-300 ease-in-out cursor-pointer relative"
            onClick={handleDropdownHarga}
          >
            {/* Awal Harga */}
            <span>Harga</span>
            {/* Akhir Harga */}

            {/* Awal Button Arrow Down */}
            <MdKeyboardArrowDown className="w-5 h-5" />
            {/* Akhir Button Arrow Down */}

            {/* Awal Dropdown Harga */}
            {dropdownHarga && (
              <div className="absolute w-52 top-full left-0 bg-white shadow-lg rounded-b-md p-2">
                <button className="block cursor-pointer py-2 hover:text-[#EE4D2D]">
                  Harga: Rendah ke Tinggi
                </button>
                <button className="block cursor-pointer py-2 hover:text-[#EE4D2D]">
                  Harga: Tinggi ke Rendah
                </button>
              </div>
            )}
            {/* Akhir Dropdown Harga */}
          </button>
          {/* Akhir Harga */}
        </div>
        {/* Akhir Filter */}

        {/* Awal Jumlah Page dan Previous/Next */}
        <div className="flex items-center gap-2">
          {/* Awal Jumlah Page */}
          <span>1/8</span>
          {/* Akhir Jumlah Page */}

          {/* Awal Previous/Next */}
          <div className="flex items-center">
            {/* Awal Previous */}
            <button className="p-2 bg-white border-t border-l border-b border-gray-300">
              <MdKeyboardArrowLeft />
            </button>
            {/* Akhir Previous */}

            {/* Awal Next */}
            <button className="p-2 bg-white border border-gray-300">
              <MdKeyboardArrowRight />
            </button>
            {/* Akhir Next */}
          </div>
          {/* Akhir Previous/Next */}
        </div>
        {/* Akhir Jumlah Page dan Previous/Next */}
      </div>
      {/* Akhir Filter Produk */}

      {/* Awal List Produk */}
      {produk.length === 0 ? (
        <div className="bg-red-500 w-full text-center">
          Belum ada produk yang tersedia pada kategori ini.
        </div>
      ) : (
        <div className=" w-full h-fit grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {produk.map((el) => (
            <CardProductRekomendasi key={el.slug} product={el} />
          ))}
        </div>
      )}
      {/* Akhir List Produk */}
    </div>
  );
}
