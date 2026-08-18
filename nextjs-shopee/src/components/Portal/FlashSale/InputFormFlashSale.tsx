"use client";

import { FLASH_SALE_SLOTS, jadikanWIB } from "@/src/helpers/flashSale";
import { formatRupiah } from "@/src/helpers/utils";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import {
  doTambahItemFlashSale,
  resetTambahItemFlashSale,
} from "@/src/store/slice/flashSale/tambahItemFlashSale";
import { ProdukRingkas } from "@/src/type/produk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { toast } from "react-toastify";

interface Props {
  products: ProdukRingkas[];
  tanggalHariIni: string;
}

export default function InputFormFlashSale({
  products,
  tanggalHariIni,
}: Props) {
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
  console.log(formFlashSale, "Form Flash Sale");

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

    console.log(data, "Data Submit FSale");

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

  const kriteria = [
    "Stok flash sale tidak boleh lebih besar dari stok produk",
    "Harga flash sale tidak boleh lebih besar dari harga produk",
    "Tanggal flash sale tidak boleh lebih kecil dari tanggal sekarang",
    "Slot flash sale tidak boleh sama dengan slot flash sale yang sudah ada",
    "Pilih produk yang ingin ditampilkan di halaman flash sale tokomu",
    "Pilih slot waktu yang ingin ditampilkan di halaman flash sale tokomu",
    "Pilih tanggal yang ingin ditampilkan di halaman flash sale tokomu",
    "Pilih harga flash sale yang ingin ditampilkan di halaman flash sale tokomu",
    "Pilih stok flash sale yang ingin ditampilkan di halaman flash sale tokomu",
  ];

  function slotSudahLewat(slot: { start: number; end: number }) {
    // Belum pilih tanggal
    if (!formFlashSale.tanggal) return false;

    // Tanggal yang dipilih lebih besar dari tanggal hari ini
    if (formFlashSale.tanggal > tanggalHariIni) return false;

    // Tanggal yang dipilih sama dengan tanggal hari ini
    const [tahun, bulan, tanggal] = formFlashSale.tanggal
      .split("-")
      .map(Number);
    const endTime = jadikanWIB(tahun, bulan, tanggal, slot.end);

    return endTime <= new Date();
  }

  return (
    <div className="flex-1 h-full p-5 flex flex-col gap-5 justify-start items-start">
      {/* Awal Produk Flash Sale Saya */}
      <div className="bg-blue-400 w-full h-fit flex flex-col gap-2 justify-start items-start rounded-md p-4">
        {/* Awal Judul Produk Flash Sale Saya */}
        <span className="bg-amber-200 font-bold text-lg">
          Produk Flash Sale Saya
        </span>
        {/* Akhir Judul Produk Flash Sale Saya */}

        {/* Awal Form Produk Flash Sale Saya */}
        <form
          onSubmit={submitHandler}
          className="bg-pink-400 w-full h-fit flex flex-col gap-2 justify-start items-start"
        >
          {/* Awal Informasi Kriteria Produk Flash Sale */}
          <div className="bg-green-500 w-full h-fit flex flex-col gap-2 justify-start items-start rounded-md overflow-hidden ">
            {/* Awal Judul Kriteria Produk */}
            <span className="bg-blue-500 p-2 font-bold w-full border-b border-gray-300">
              Kriteria Produk Flash Sale
            </span>
            {/* Akhir Judul Kriteria Produk */}

            {/* Awal Daftar Kriteria Produk Flash Sale */}
            <ul className="columns-2 gap-x-8 list-none p-2 w-full flex-1 min-h-0 overflow-y-auto text-xs text-gray-700">
              {kriteria.map((item, index) => (
                <li
                  key={index}
                  className="bg-amber-950 break-inside-avoid flex gap-2 items-start mb-2"
                >
                  <FaCheck className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                  <span className="min-w-0 wrap-break-word">{item}</span>
                </li>
              ))}
            </ul>
            {/* Akhir Daftar Kriteria Produk Flash Sale */}
          </div>
          {/* Akhir Informasi Kriteria Produk Flash Sale */}

          {/* Awal Tanggal */}
          <div className="bg-yellow-500 w-full h-fit flex justify-start items-center gap-2">
            {/* Awal Text Tanggal */}
            <span className="bg-pink-600 font-semibold w-40">Tanggal</span>
            {/* Akhir Text Tanggal */}

            {/* Awal Input Tanggal */}
            <input
              type="date"
              name="tanggal"
              id="tanggal"
              min={tanggalHariIni}
              className="bg-white border border-[#EE4D2D] rounded-sm px-3 py-1 flex justify-center items-center cursor-pointer hover:bg-gray-300  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent text-sm"
              onChange={changeHandler}
              value={formFlashSale.tanggal}
            />
            {/* Akhir Input Tanggal */}
          </div>
          {/* Akhir Tanggal */}

          {/* Awal Slot Waktu */}
          <div className="bg-red-500 w-full h-fit flex justify-start items-center gap-2">
            {/* Awal Text Slot Waktu */}
            <span className="bg-pink-600 font-semibold w-40">Slot Waktu</span>
            {/* Akhir Text Slot Waktu */}

            {/* Awal Input Slot Waktu */}
            <select
              className="bg-white  px-3 py-1 border border-[#EE4D2D] rounded-sm text-start cursor-pointer hover:bg-gray-300  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent text-sm"
              name="slotStart"
              id="slotStart"
              onChange={changeHandler}
              value={formFlashSale.slotStart}
            >
              <option value="">Pilih Slot Waktu</option>
              {FLASH_SALE_SLOTS.map((slot, index) => (
                <option
                  disabled={slotSudahLewat(slot)}
                  key={index}
                  value={slot.start}
                >
                  {String(slot.start).padStart(2, "0")}:00 -{" "}
                  {String(slot.end).padStart(2, "0")}:00
                </option>
              ))}
            </select>
            {/* Akhir Input Slot Waktu */}
          </div>
          {/* Akhir Slot Waktu */}

          {/* Awal Pilih Produk */}
          <div className="bg-purple-500 w-full h-fit flex justify-start items-center gap-2">
            {/* Awal Text Pilih Produk */}
            <span className="bg-pink-600 font-semibold w-40">Pilih Produk</span>
            {/* Akhir Text Pilih Produk */}

            {/* Awal Input Pilih Produk */}
            <select
              name="productId"
              id="productId"
              className="bg-white  px-3 py-1 border border-[#EE4D2D] rounded-sm text-start cursor-pointer hover:bg-gray-300  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent text-sm"
              onChange={changeHandler}
              value={formFlashSale.productId}
            >
              <option value="">Pilih Produk</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name} - {formatRupiah(product.price)}
                </option>
              ))}
            </select>
            {/* Akhir Input Pilih Produk */}
          </div>
          {/* Akhir Pilih Produk */}

          {/* Awal Harga Flash Sale */}
          <div className="bg-pink-500 w-full h-fit flex justify-start items-center gap-2">
            {/* Awal Text Harga Flash Sale */}
            <span className="bg-pink-600 font-semibold w-40">
              Harga Flash Sale
            </span>
            {/* Akhir Text Harga Flash Sale */}

            {/* Awal Input Harga Flash Sale */}
            <input
              type="text"
              name="flashPrice"
              id="flashPrice"
              className="bg-white px-3 py-1 border border-[#EE4D2D] rounded-sm text-start cursor-pointer hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent text-sm"
              onChange={changeHandler}
              value={formFlashSale.flashPrice}
            />
            {/* Akhir Input Harga Flash Sale */}
          </div>
          {/* Akhir Harga Flash Sale */}

          {/* Awal Stok Flash Sale */}
          <div className="bg-cyan-500 w-full h-fit flex justify-start items-center gap-2">
            {/* Awal Text Stok Flash Sale */}
            <span className="bg-cyan-600 font-semibold w-40">
              Stok Flash Sale
            </span>
            {/* Akhir Text Stok Flash Sale */}

            {/* Awal Input Stok Flash Sale */}
            <input
              type="text"
              name="flashStock"
              id="flashStock"
              className="bg-white px-3 py-1 border border-[#EE4D2D] rounded-sm text-start cursor-pointer hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#EE4D2D] focus:border-transparent text-sm"
              onChange={changeHandler}
              value={formFlashSale.flashStock}
            />
            {/* Akhir Input Stok Flash Sale */}
          </div>
          {/* Akhir Stok Flash Sale */}

          {/* Awal Button Submit */}
          <button
            type="submit"
            disabled={loadingTambahItemFlashSale}
            className="bg-[#EE4D2D] w-50 py-2 text-white rounded-md hover:bg-orange-500 transition-all duration-300 ease-in-out cursor-pointer"
          >
            Submit
          </button>
          {/* Akhir Button Submit */}
        </form>
        {/* Akhir Form Produk Flash Sale Saya */}
      </div>
      {/* Akhir Produk Flash Sale Saya */}
    </div>
  );
}

// console.log(products, "Products FormFlashSale");
// [
//     {
//         "_id": "6a6ee56e0798c70ca1aa83ff",
//         "name": "Jersey Arsenal Third 25/26",
//         "slug": "jersey-arsenal-third-25-26",
//         "images": [
//             "https://picsum.photos/600/600?random=5",
//             "https://picsum.photos/600/600?random=55",
//             "https://picsum.photos/600/600?random=105",
//             "https://picsum.photos/600/600?random=155",
//             "https://picsum.photos/600/600?random=205",
//             "https://picsum.photos/600/600?random=255"
//         ],
//         "price": 275000,
//         "sold": 890
//     },
//     {
//         "_id": "6a6ee56e0798c70ca1aa83fb",
//         "name": "Jersey Manchester United Home 25/26",
//         "slug": "jersey-manchester-united-home-25-26",
//         "images": [
//             "https://picsum.photos/600/600?random=1",
//             "https://picsum.photos/600/600?random=51",
//             "https://picsum.photos/600/600?random=101",
//             "https://picsum.photos/600/600?random=151",
//             "https://picsum.photos/600/600?random=201",
//             "https://picsum.photos/600/600?random=251"
//         ],
//         "price": 299000,
//         "discountPercent": 29,
//         "sold": 1900
//     },
//     {
//         "_id": "6a6ee56e0798c70ca1aa83fc",
//         "name": "Jersey Real Madrid Home 25/26",
//         "slug": "jersey-real-madrid-home-25-26",
//         "images": [
//             "https://picsum.photos/600/600?random=2",
//             "https://picsum.photos/600/600?random=52",
//             "https://picsum.photos/600/600?random=102",
//             "https://picsum.photos/600/600?random=152",
//             "https://picsum.photos/600/600?random=202",
//             "https://picsum.photos/600/600?random=252"
//         ],
//         "price": 315000,
//         "discountPercent": 30,
//         "sold": 2400
//     },
//     {
//         "_id": "6a6ee56e0798c70ca1aa8401",
//         "name": "Jersey Argentina Home 2026",
//         "slug": "jersey-argentina-home-2026",
//         "images": [
//             "https://picsum.photos/600/600?random=7",
//             "https://picsum.photos/600/600?random=57",
//             "https://picsum.photos/600/600?random=107",
//             "https://picsum.photos/600/600?random=157",
//             "https://picsum.photos/600/600?random=207",
//             "https://picsum.photos/600/600?random=257"
//         ],
//         "price": 285000,
//         "discountPercent": 29,
//         "sold": 2700
//     },
//     {
//         "_id": "6a6ee56e0798c70ca1aa8403",
//         "name": "Jersey Manchester City Home 25/26",
//         "slug": "jersey-manchester-city-home-25-26",
//         "images": [
//             "https://picsum.photos/600/600?random=9",
//             "https://picsum.photos/600/600?random=59",
//             "https://picsum.photos/600/600?random=109",
//             "https://picsum.photos/600/600?random=159",
//             "https://picsum.photos/600/600?random=209",
//             "https://picsum.photos/600/600?random=259"
//         ],
//         "price": 295000,
//         "discountPercent": 28,
//         "sold": 1150
//     },
//     {
//         "_id": "6a6ee56e0798c70ca1aa8402",
//         "name": "Jersey Brazil Away 2026",
//         "slug": "jersey-brazil-away-2026",
//         "images": [
//             "https://picsum.photos/600/600?random=8",
//             "https://picsum.photos/600/600?random=58",
//             "https://picsum.photos/600/600?random=108",
//             "https://picsum.photos/600/600?random=158",
//             "https://picsum.photos/600/600?random=208",
//             "https://picsum.photos/600/600?random=258"
//         ],
//         "price": 279000,
//         "sold": 1400
//     },
//     {
//         "_id": "6a6ee56e0798c70ca1aa8404",
//         "name": "Jersey Inter Milan Home 25/26",
//         "slug": "jersey-inter-milan-home-25-26",
//         "images": [
//             "https://picsum.photos/600/600?random=10",
//             "https://picsum.photos/600/600?random=60",
//             "https://picsum.photos/600/600?random=110",
//             "https://picsum.photos/600/600?random=160",
//             "https://picsum.photos/600/600?random=210",
//             "https://picsum.photos/600/600?random=260"
//         ],
//         "price": 269000,
//         "discountPercent": 28,
//         "sold": 641
//     },
//     {
//         "_id": "6a6ee56e0798c70ca1aa83fd",
//         "name": "Jersey Barcelona Away 25/26",
//         "slug": "jersey-barcelona-away-25-26",
//         "images": [
//             "https://picsum.photos/600/600?random=3",
//             "https://picsum.photos/600/600?random=53",
//             "https://picsum.photos/600/600?random=103",
//             "https://picsum.photos/600/600?random=153",
//             "https://picsum.photos/600/600?random=203",
//             "https://picsum.photos/600/600?random=253"
//         ],
//         "price": 289000,
//         "discountPercent": 28,
//         "sold": 1600
//     },
//     {
//         "_id": "6a6ee56e0798c70ca1aa83fe",
//         "name": "Jersey Liverpool FC Away Authentic 25/26",
//         "slug": "jersey-liverpool-fc-away-authentic-25-26",
//         "images": [
//             "https://picsum.photos/600/600?random=4",
//             "https://picsum.photos/600/600?random=54",
//             "https://picsum.photos/600/600?random=104",
//             "https://picsum.photos/600/600?random=154",
//             "https://picsum.photos/600/600?random=204",
//             "https://picsum.photos/600/600?random=254"
//         ],
//         "price": 1190000,
//         "discountPercent": 18,
//         "sold": 210
//     },
//     {
//         "_id": "6a6ee56e0798c70ca1aa8400",
//         "name": "Jersey Timnas Indonesia Home 2026",
//         "slug": "jersey-timnas-indonesia-home-2026",
//         "images": [
//             "https://picsum.photos/600/600?random=6",
//             "https://picsum.photos/600/600?random=56",
//             "https://picsum.photos/600/600?random=106",
//             "https://picsum.photos/600/600?random=156",
//             "https://picsum.photos/600/600?random=206",
//             "https://picsum.photos/600/600?random=256"
//         ],
//         "price": 349000,
//         "discountPercent": 30,
//         "sold": 8700
//     }
// ]
