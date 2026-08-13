"use client";

import { ProdukResponse } from "@/src/type/produk";
import { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { TbInputSearch } from "react-icons/tb";
import CardProductRekomendasi from "../MainPage/Rekomendasi/CardProdukRekomendasi";
import { useRouter } from "next/navigation";
import { StoreRingkas } from "@/src/type/store";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { formatAngka } from "@/src/helpers/utils";

interface Props {
  data: {
    products: ProdukResponse[];
    totalProducts: number;
    page: number;
    totalPages: number;
    stores: StoreRingkas[];
  };
  keyword: string;
  sort: string;
}

export default function TokoDanProdukSearch({ data, keyword, sort }: Props) {
  const [dropdownHarga, setDropDownHarga] = useState(false);

  const router = useRouter();

  function handleDropdownHarga() {
    setDropDownHarga(!dropdownHarga);
  }

  function handleSort(nilaiSort: string) {
    router.push(
      `/search?keyword=${encodeURIComponent(keyword)}&sort=${nilaiSort}`,
    );
  }

  function handlePageChange(halamanBaru: number) {
    router.push(
      `/search?keyword=${encodeURIComponent(keyword)}&page=${halamanBaru}&sort=${sort}`,
    );
  }

  const mallOri = true;
  const rating = 4.3;
  const pengikut = 386750;
  return (
    <div className=" flex-1 h-full flex flex-col gap-2">
      {/* Awal Toko Yang Terkait */}
      <div className="w-full h-80  flex gap-2">
        {data.stores.map((store) => (
          <div
            key={store._id}
            className="flex-1 min-w-0 bg-white rounded-md overflow-hidden shadow-md flex flex-col justify-center items-center gap-2 px-2"
          >
            {/* Awal Foto Store */}
            <Image
              src={store.image}
              alt={store.name}
              width={100}
              height={100}
              className="w-20 h-20 rounded-full object-cover"
            />
            {/* Akhir Foto Store */}
            {/* Awal Nama Store */}
            <h3 className="text-lg font-semibold line-clamp-1">{store.name}</h3>
            {/* Akhir Nama Store */}

            {/* Awal Info Store */}
            <div className=" w-full h-fit flex justify-center items-center divide-x divide-gray-200 [&>*:not(:first-child)]:pl-1 [&>*:not(:last-child)]:pr-1 text-xs ">
              {/* Awal Mall Ori */}
              {mallOri && (
                <Image
                  src={"/MallOriRemoveBg.png"}
                  width={100}
                  height={100}
                  alt="Mall Ori"
                  className="w-15 h-4 "
                />
              )}
              {/* Akhir Mall Ori */}

              {/* Awal Rating */}
              <div className="flex items-center gap-1.5">
                {/* Awal Icon Rating */}

                <FaStar className="w-4 h-4 shrink-0  text-yellow-500" />
                {/* Akhir Icon Rating */}

                {/* Awal Jumlah Rating */}
                <span className="text-gray-600 font-bold">
                  {rating.toFixed(1)}
                </span>
                {/* Akhir Jumlah Rating */}
              </div>
              {/* Akhir Rating */}

              {/* Awal Pengikut */}
              <span className="text-gray-600 line-clamp-1">
                {formatAngka(pengikut)} Pengikut
              </span>
              {/* Akhir Pengikut */}
            </div>
            {/* Akhir Info Store */}

            {/* Awal Button Kunjungi Store */}
            <Link
              href={`/store/${store.slug}`}
              className="bg-[#EE4D2D] hover:bg-[#c43d24] text-white font-semibold px-5 py-2 cursor-pointer  transition-colors duration-300 ease-in-out rounded-md mt-3"
            >
              Kunjungi Toko
            </Link>
            {/* Akhir Button Kunjungi Store */}
          </div>
        ))}
      </div>
      {/* Akhir Toko Yang Terkait */}

      {/* Awal Produk Hasil Search */}
      <div className=" w-full h-fit flex flex-col gap-2 justify-start items-start">
        {/* Awal Hasil Pencarian "Keyword" */}
        <div className=" flex items-center gap-2 text-gray-600 font-medium text-lg">
          {/* Awal Icon Search */}
          <TbInputSearch className="w-8 h-8" />
          {/* Akhir Icon Search */}

          {/* Awal Text Hasil Pencarian */}
          <span>
            Hasil pencarian untuk{" "}
            <span className="text-[#EE4D2D]">&apos;{keyword}&apos;</span>
          </span>
          {/* Akhir Text Hasil Pencarian */}
        </div>
        {/* Akhir Hasil Pencarian "Keyword" */}

        {/* Awal Filter */}
        <div className="bg-gray-300 w-full h-18 flex justify-between items-center p-2">
          {/* Awal Filter */}
          <div className=" flex items-center gap-2 text-black font-medium">
            {/* Awal Text Urutkan */}
            <span>Urutkan</span>
            {/* Akhir Text Urutkan */}

            {/* Awal Populer */}
            <button
              onClick={() => handleSort("populer")}
              className={`px-5 py-2  transition-colors duration-300 ease-in-out cursor-pointer ${sort === "populer" ? "bg-[#EE4D2D] text-white  hover:bg-[#C43D24] " : " bg-white hover:bg-gray-200"}`}
            >
              Populer
            </button>
            {/* Akhir Populer */}

            {/* Awal Terbaru */}
            <button
              onClick={() => handleSort("terbaru")}
              className={`px-5 py-2  transition-colors duration-300 ease-in-out cursor-pointer ${sort === "terbaru" ? "bg-[#EE4D2D] text-white  hover:bg-[#c43d24] " : " bg-white hover:bg-gray-200"}`}
            >
              Terbaru
            </button>
            {/* Akhir Terbaru */}

            {/* Awal Terlaris */}
            <button
              onClick={() => handleSort("terlaris")}
              className={`px-5 py-2  transition-colors duration-300 ease-in-out cursor-pointer ${sort === "terlaris" ? "bg-[#EE4D2D] text-white  hover:bg-[#c43d24] " : " bg-white hover:bg-gray-200"}`}
            >
              Terlaris
            </button>
            {/* Akhir Terlaris */}

            {/* Awal Harga */}
            <button
              className="bg-white w-52 h-fit p-2 flex justify-between items-center hover:bg-gray-200 transition-colors duration-300 ease-in-out cursor-pointer relative"
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
                disabled={data.page <= 1}
                className="p-2 bg-white border-t border-l border-b border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MdKeyboardArrowLeft />
              </button>
              {/* Akhir Previous */}

              {/* Awal Next */}
              <button
                onClick={() => handlePageChange(data.page + 1)}
                disabled={data.page >= data.totalPages}
                className="p-2 bg-white border border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* Awal Map Card Produk Terkait */}
        {data.products.length === 0 ? (
          <div className="bg-red-500 w-full text-center">
            Tidak ada produk yang cocok dengan pencarian ini.
          </div>
        ) : (
          <div className=" w-full h-fit grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data.products.map((el) => (
              <CardProductRekomendasi key={el.slug} product={el} />
            ))}
          </div>
        )}
        {/* Awal Map Card Produk Terkait */}
      </div>
      {/* Akhir Produk Hasil Search */}
    </div>
  );
}

// [
//   {
//     _id: '6a8000000000000000000001',
//     name: 'Haerin Jersey Collection',
//     slug: 'haerin-jersey-collection',
//     image: 'https://i.pinimg.com/474x/19/eb/32/19eb32ead6d19cf5f54f7e7b48c1a56f.jpg'
//   }
// ] my store gwehhh
