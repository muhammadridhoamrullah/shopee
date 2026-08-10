"use client";

import { ProdukRingkas } from "@/src/type/produk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import CardProdukUtama from "../CardProduk/CardProdukUtama";

interface Props {
  data: {
    products: ProdukRingkas[];
    totalProducts: number;
    page: number;
    totalPages: number;
  };
  slug: string;
  sort: string;
}

export default function StoreAllProducts({ data, slug, sort }: Props) {
  const [dropdownHarga, setDropDownHarga] = useState(false);
  const router = useRouter();

  console.log(sort, "sort gweh");

  function handleSort(sort: string) {
    router.push(`/store/${slug}?sort=${sort}`);
  }

  function toggleDropdownHarga() {
    setDropDownHarga(!dropdownHarga);
  }

  function handlePageChange(newPage: number) {
    router.push(`/store/${slug}?page=${newPage}&sort=${sort}`);
  }

  return (
    <div className=" w-full h-fit px-20 ">
      {/* Awal Filter (Kiri) dan Produk (Kanan) */}
      {data.products.length > 0 ? (
        <div className=" w-full h-full flex justify-between items-start gap-4">
          {/* Awal Filter (Kiri) */}
          <div className="bg-orange-600 w-60 h-full">Filter Coy</div>
          {/* Akhir Filter (Kiri) */}

          {/* Awal Produk (Kanan) */}
          <div className=" flex-1 h-full flex flex-col justify-start items-start gap-2 text-sm">
            {/* Awal Filter */}
            <div className="bg-gray-300 w-full h-18 flex justify-between items-center p-2">
              {/* Awal Filter */}
              <div className=" flex items-center gap-2 text-black font-medium">
                {/* Awal Urutkan */}
                <span>Urutkan</span>
                {/* Akhir Urutkan */}

                {/* Awal Populer */}
                <button
                  onClick={() => handleSort("populer")}
                  className={`px-5 py-2 transition-colors duration-300 ease-in-out cursor-pointer ${sort === "populer" ? "bg-[#EE4D2D] text-white hover:bg-[#C43D24]" : "bg-white hover:bg-gray-200"}`}
                >
                  Populer
                </button>
                {/* Akhir Populer */}

                {/* Awal Terbaru */}
                <button
                  onClick={() => handleSort("terbaru")}
                  className={`px-5 py-2 transition-colors duration-300 ease-in-out cursor-pointer ${sort === "terbaru" ? "bg-[#EE4D2D] text-white hover:bg-[#C43D24]" : "bg-white hover:bg-gray-200"}`}
                >
                  Terbaru
                </button>
                {/* Akhir Terbaru */}

                {/* Awal Terlaris */}
                <button
                  onClick={() => handleSort("terlaris")}
                  className={`px-5 py-2 transition-colors duration-300 ease-in-out cursor-pointer ${sort === "terlaris" ? "bg-[#EE4D2D] text-white hover:bg-[#C43D24]" : "bg-white hover:bg-gray-200"}`}
                >
                  Terlaris
                </button>
                {/* Akhir Terlaris */}

                {/* Awal Harga */}
                <button
                  className="bg-white w-52 h-fit p-2 flex justify-between items-center hover:bg-gray-200 transition-colors duration-300 ease-in-out cursor-pointer relative"
                  onClick={toggleDropdownHarga}
                >
                  {/* Awal Harga */}
                  <span>Harga</span>
                  {/* Akhir Harga */}

                  {/* Awal Icon Dropdown */}
                  <MdKeyboardArrowDown className="w-5 h-5" />
                  {/* Akhir Icon Dropdown */}

                  {/* Awal Dropdown Harga */}
                  {dropdownHarga && (
                    <div className="absolute w-52 top-full left-0 bg-white shadow-lg rounded-b-md p-2 z-50">
                      <button
                        onClick={() => handleSort("termurah")}
                        className="block cursor-pointer py-2 hover:text-[#EE4D2D]"
                      >
                        Harga: Rendah ke Tinggi
                      </button>
                      <button
                        onClick={() => handleSort("termahal")}
                        className="block cursor-pointer py-2 hover:text-[#EE4D2D]"
                      >
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
                <span>
                  {data.totalPages === 0
                    ? "0/0"
                    : `${data.page}/${data.totalPages}`}
                </span>
                {/* Akhir Jumlah Page */}

                {/* Awal Previous/Next */}
                <div className="flex items-center">
                  {/* Awal Previous */}
                  <button
                    onClick={() => handlePageChange(data.page - 1)}
                    disabled={data.page === 1}
                    className="p-2 bg-white border-t border-l border-b border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MdKeyboardArrowLeft />
                  </button>
                  {/* Akhir Previous */}

                  {/* Awal Next */}
                  <button
                    onClick={() => handlePageChange(data.page + 1)}
                    disabled={data.page >= data.totalPages}
                    className="p-2 bg-white border border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed "
                  >
                    <MdKeyboardArrowRight />
                  </button>
                  {/* Akhir Next */}
                </div>
                {/* Akhir Previous/Next */}
              </div>
              {/* Akhir Jumlah Page dan Previous/Next */}
            </div>
            {/* Akhir Filter */}

            {/* Awal Mapping Produk */}

            <div className="w-full h-fit grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {data.products.map((produk) => (
                <CardProdukUtama key={produk._id} produk={produk} />
              ))}
            </div>

            {/* Akhir Mapping Produk */}
          </div>
          {/* Akhir Produk (Kanan) */}
        </div>
      ) : (
        <div className="text-[#EE4D2D] text-lg font-semibold text-center">
          Tidak ada produk yang ditemukan.
        </div>
      )}
      {/* Akhir Filter (Kiri) dan Produk (Kanan) */}
    </div>
  );
}
