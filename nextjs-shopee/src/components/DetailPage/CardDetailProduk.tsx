"use client";

import { formatRupiah } from "@/src/helpers/utils";
import { ProdukResponse } from "@/src/type/produk";
import { useState } from "react";
import TambahKeranjang from "./TambahKeranjang";
import BeliSekarang from "./BeliSekarang";
import { toast } from "react-toastify";
import StarRating from "./StarRating";
import FotoProduk from "./FotoProduk";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";

interface Props {
  product: ProdukResponse;
}

// {
//   _id: '6a6ee56e0798c70ca1aa8404',
//   name: 'Jersey Inter Milan Home 25/26',
//   slug: 'jersey-inter-milan-home-25-26',
//   categoryId: '6a7000000000000000000003',
//   storeId: '6a8000000000000000000001',
//   images: [
//     'https://picsum.photos/600/600?random=10',
//     'https://picsum.photos/600/600?random=60',
//     'https://picsum.photos/600/600?random=110',
//     'https://picsum.photos/600/600?random=160',
//     'https://picsum.photos/600/600?random=210',
//     'https://picsum.photos/600/600?random=260'
//   ],
//   price: 269000,
//   originalPrice: 375000,
//   discountPercent: 28,
//   quantity: 49,
//   sold: 641,
//   createdAt: 2026-08-02T06:36:28.105Z,
//   updatedAt: 2026-08-02T12:22:05.706Z,
//   flashSale: {
//     _id: '6a9826c90fd6bb363bcb2df9',
//     productId: '6a6ee56e0798c70ca1aa8404',
//     storeId: '6a8000000000000000000001',
//     flashPrice: 250000,
//     flashStock: 1,
//     flashSold: 0,
//     startTime: 2026-09-02T11:00:00.000Z,
//     endTime: 2026-09-02T14:00:00.000Z,
//     createdAt: 2026-09-02T13:38:17.282Z,
//     updatedAt: 2026-09-02T13:38:17.282Z
//   },
//   discount: undefined,
//   harga: {
//     effectivePrice: 250000,
//     strikePrice: 269000,
//     discountPercentage: 7,
//     promoSource: 'flashSale'
//   }
// } productBySlug

export default function CardDetailProduk({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(product.quantity, prev + 1));
  };

  const data = {
    productId: product._id,
    quantity: quantity,
  };

  const rating = 4.5;
  const totalPenilaian = 100;
  const totalTerjual = 50;

  const warna = [
    "Merah",
    "Biru",
    "Hijau",
    "Kuning",
    "Hitam",
    "Putih",
    "Ungu",
    "Coklat",
    "Abu-abu",
    "Oranye",
  ];
  const size = [
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
  ];

  const mallOri = true;

  return (
    <div className="bg-white w-full min-h-0 flex justify-start items-start p-4 gap-4 shadow-md ">
      {/* Awal Foto Produk */}
      <FotoProduk data={product.images} />
      {/* Akhir Foto Produk */}

      {/* Awal Informasi Produk */}
      <div className=" flex-1 h-full flex flex-col gap-2 justify-start items-start">
        {/* Awal Nama Produk dan Rating, Penilaian, Terjual, dan Laporkan */}
        <div className=" w-full h-fit flex flex-col gap-2 justify-start items-start">
          {/* Awal Nama Produk */}
          <div className="w-full h-fit flex flex-col justify-start items-start ">
            {/* Awal Logo Mall Ori */}
            {mallOri && (
              <Image
                src={"/MallOriRemoveBg.png"}
                alt="Mall Ori"
                width={70}
                height={50}
              />
            )}
            {/* Akhir Logo Mall Ori */}

            {/* Awal Nama Produk */}
            <span className="w-full  font-semibold text-lg line-clamp-2 text-justify">
              {product.name}
            </span>
            {/* Akhir Nama Produk */}
          </div>
          {/* Akhir Nama Produk */}

          {/* Awal Rating, Penilaian Terjual, dan Laporkan */}
          <div className=" w-full h-7 flex justify-between items-center text-sm  ">
            {/* Awal Rating, Penilaian, Terjual */}
            <div className=" w-full h-full  flex justify-start items-center divide-x divide-gray-400 [&>*:not(:first-child)]:pl-3 [&>*:not(:last-child)]:pr-3">
              {/* Awal Rating */}
              <div className=" flex h-full items-center gap-1.5 ">
                {/* Awal Text Rating */}
                <span className="font-semibold text-md border-b border-b-black">
                  {rating.toFixed(1)}
                </span>
                {/* Akhir Text Rating */}

                {/* Awal Icon Rating */}
                <StarRating rating={rating} />
                {/* Akhir Icon Rating */}
              </div>
              {/* Akhir Rating */}
              {/* Awal Penilaian */}
              <div className=" flex h-full items-center gap-1.5">
                {/* Awal Nilai */}
                <span className="font-semibold text-md border-b border-b-black">
                  {totalPenilaian}
                </span>
                {/* Akhir Nilai */}

                {/* Awal Text Penilaian */}
                <span className="">Penilaian</span>
                {/* Akhir Text Penilaian */}
              </div>
              {/* Akhir Penilaian */}
              {/* Awal Terjual */}
              <div className=" flex h-full items-center gap-1.5">
                {/* Awal Terjual */}
                <span className="font-semibold text-md border-b border-b-black">
                  {totalTerjual}
                </span>
                {/* Akhir Terjual */}

                {/* Awal Text Terjual */}
                <span className="">Terjual</span>
                {/* Akhir Text Terjual */}
              </div>
              {/* Akhir Terjual */}
            </div>
            {/* Awal Rating, Penilaian, Terjual */}
            {/* Awal Laporkan */}
            <button
              className="text-gray-500 cursor-pointer hover:text-red-500 transition-colors duration-300 ease-in-out"
              onClick={() => toast.warning("Gweh laporkan lu ye!")}
            >
              Laporkan
            </button>
            {/* Akhir Laporkan */}
          </div>
          {/* Akhir Rating, Penilaian Terjual, dan Laporkan */}
        </div>
        {/* Akhir Nama Produk dan Rating, Penilaian, Terjual, dan Laporkan */}

        {/* Awal Harga Produk, Voucher, Pengiriman, Jaminan Shopee, Warna, Kuantitas, Tombol Masuk Keranjang dan Beli Sekarang */}
        <div className=" w-full h-full flex flex-col gap-4 px-4 text-sm">
          {/* Awal Harga Produk */}
          <div className="bg-[#F5F5F5] w-full h-fit flex justify-start items-center gap-2 p-2 ">
            {/* Awal Harga Setelah Diskon */}
            <span className="text-3xl font-semibold text-[#EE4D2D]">
              {formatRupiah(product.harga.effectivePrice)}
            </span>
            {/* Akhir Harga Setelah Diskon */}

            {/* Awal Harga Sebelum Diskon */}
            {product.harga.strikePrice && (
              <span className="line-through  text-gray-500">
                {formatRupiah(product.harga.strikePrice)}
              </span>
            )}
            {/* Akhir Harga Sebelum Diskon */}

            {/* Awal Diskon */}
            {product.harga.discountPercentage ? (
              <span className="bg-red-500 text-white  font-bold px-2 py-1">
                {product.harga.discountPercentage}% OFF
              </span>
            ) : null}
            {/* Akhir Diskon */}
          </div>
          {/* Akhir Harga Produk */}

          {/* Awal Voucher */}
          <div className=" w-full flex justify-start items-start gap-4 ">
            {/* Awal Text Voucher */}
            <span className="text-gray-500  w-25 line-clamp-2">Voucher</span>
            {/* Akhir Text Voucher */}

            {/* Awal List Voucher */}
            <div className="w-full h-fit flex justify-start items-center gap-2 text-[#EE4D2D]">
              <div className="bg-red-300 px-2 py-1">POTONGAN Rp.500</div>
              <div className="bg-red-300 px-2 py-1">POTONGAN Rp.1000</div>
            </div>
            {/* Akhir List Voucher */}
          </div>
          {/* Akhir Voucher */}

          {/* Awal Cicilan */}
          <div className=" w-full flex justify-start items-start gap-4">
            {/* Awal Text Cicilan */}
            <span className="text-gray-500  w-25 line-clamp-2">Cicilan</span>
            {/* Akhir Text Cicilan */}

            {/* Awal Cicilan */}
            <div className="w-full h-fit flex justify-start items-center gap-2 text-black">
              {/* Awal Cicilan */}
              <span>24x Rp39.583 (Bunga 0%)</span>
              {/* Akhir Cicilan */}

              {/* Awal Link Cicilan */}
              <div className=" text-gray-500 flex items-center ">
                {/* Awal Link Cicilan */}
                <Link href={"/cicilan"}>Cicilan</Link>
                {/* Akhir Link Cicilan */}

                {/* Awal Icon > */}
                <MdKeyboardArrowRight className="w-3 h-3" />
                {/* Akhir Icon > */}
              </div>
              {/* Akhir Link Cicilan */}
            </div>
            {/* Akhir Cicilan */}
          </div>
          {/* Akhir Cicilan */}

          {/* Awal Pengiriman */}
          <div className=" w-full flex justify-start items-start gap-4">
            {/* Awal Text Pengiriman */}
            <span className="text-gray-500  w-25 line-clamp-2">Pengiriman</span>
            {/* Akhir Text Pengiriman */}

            {/* Awal Info Pengiriman */}
            <div className="w-full h-fit flex flex-col gap-2 justify-start items-start text-gray-500">
              {/* Awal Icon dan Estimasi */}
              <div className="flex items-center gap-2">
                {/* Awal Icon */}
                <FaShippingFast className="w-5 h-5" />
                {/* Akhir Icon */}

                {/* Awal Estimasi */}
                <button
                  onClick={() => toast.warn("Estimasi Sampai")}
                  className="flex items-center"
                >
                  {/* Awal Estimasi Waktu */}
                  <span className="font-semibold">6-10 Ags</span>
                  {/* Akhir Estimasi Waktu */}

                  {/* Awal Icon */}
                  <MdKeyboardArrowRight className="w-4 h-4" />
                  {/* Akhir Icon */}
                </button>
                {/* Akhir Estimasi */}
              </div>
              {/* Akhir Icon dan Estimasi */}

              {/* Awal Info Pengiriman */}
              <span className="text-xs">
                Dapatkan Voucher s/d Rp10.000 jika pesanan terlambat.
              </span>
              {/* Akhir Info Pengiriman */}
            </div>
            {/* Akhir Info Pengiriman */}
          </div>
          {/* Akhir Pengiriman */}

          {/* Awal Jaminan Shopee */}
          <div className=" w-full flex justify-start items-start gap-4">
            {/* Awal Text Jaminan Shopee */}
            <span className="text-gray-500  w-25 line-clamp-2">
              Jaminan Shopee
            </span>
            {/* Akhir Text Jaminan Shopee */}

            {/* Awal Info Jaminan Shopee */}
            <div className=" w-full h-fit flex justify-start items-start gap-1">
              {/* Awal Icon Jaminan Shopee */}
              <IoShieldCheckmarkOutline className="w-5 h-5" />
              {/* Akhir Icon Jaminan Shopee */}

              {/* Awal Info Jaminan Shopee */}
              <span className="w-full line-clamp-1">
                15 Hari Pengembalian • 100% Original • COD-Cek Dulu • Proteksi
                Kerusakan dan lain alin
              </span>
              {/* Akhir Info Jaminan Shopee */}

              {/* Awal Icon Drop Down */}
              <MdKeyboardArrowDown className="w-5 h-5" />
              {/* Akhir Icon Drop Down */}
            </div>
            {/* Akhir Info Jaminan Shopee */}
          </div>
          {/* Akhir Jaminan Shopee */}

          {/* Awal Warna */}
          <div className=" w-full flex justify-start items-start gap-4">
            {/* Awal Text Warna */}
            <span className="text-gray-500 w-25 line-clamp-2">Warna</span>
            {/* Akhir Text Warna */}

            {/* Awal List Warna */}
            <div className=" w-full h-fit grid grid-cols-5 gap-2  text-black">
              {warna.map((warna, idx) => (
                <button
                  className="border border-gray-400 py-2 px-4 text-center hover:border-black transition-colors duration-300 ease-in-out cursor-pointer"
                  key={idx}
                >
                  {warna}
                </button>
              ))}
            </div>
            {/* Akhir List Warna */}
          </div>
          {/* Akhir Warna */}

          {/* Awal Size */}
          <div className=" w-full flex justify-start items-start gap-4">
            {/* Awal Text Size */}
            <span className="text-gray-500  w-25 line-clamp-2">Size</span>
            {/* Akhir Text Size */}

            {/* Awal List Size */}
            <div className=" w-full h-fit grid grid-cols-5 gap-2  text-black">
              {size.map((size, idx) => (
                <button
                  className="border border-gray-400 py-2 px-4 text-center hover:border-black transition-colors duration-300 ease-in-out cursor-pointer"
                  key={idx}
                >
                  {size}
                </button>
              ))}
            </div>
            {/* Akhir List Size */}
          </div>
          {/* Akhir Size */}

          {/* Awal Tabel Ukuran */}
          <button
            onClick={() => toast.info("Size Chart Cuy")}
            className=" w-fit h-fit flex justify-start items-center cursor-pointer text-[#EE4D2D]"
          >
            {/* Awal Text Tabel Ukuran */}
            <span className=" ">Tabel Ukuran</span>
            {/* Akhir Text Tabel Ukuran */}

            {/* Awal Icon Right Arrow */}
            <MdKeyboardArrowRight className="w-5 h-5" />
            {/* Akhir Icon Right Arrow */}
          </button>
          {/* Akhir Tabel Ukuran */}

          {/* Awal Kuantitas */}
          <div className="bg-white w-full h-fit flex justify-start items-center gap-4 ">
            {/* Awal Text Kuantitas */}
            <span className="text-gray-500  w-25 line-clamp-2">Kuantitas</span>
            {/* Akhir Text Kuantitas */}

            {/* Awal Input Kuantitas */}
            <div className="w-full h-fit flex justify-start items-center gap-2">
              {/* Awal Input Kuantitas */}
              <div className="w-30 h-fit flex justify-start items-center border border-gray-300 divide-x divide-gray-300 ">
                {/* Awal Button Decrease */}
                <button
                  type="button"
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                  className="w-8 h-fit py-1 px-3 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                {/* Akhir Button Decrease */}
                {/* Awal Nilai Input Sekarang */}
                <span className=" flex-1 text-center py-1 px-3 text-lg">
                  {quantity}
                </span>
                {/* Akhir Nilai Input Sekarang */}
                {/* Awal Button Increase */}
                <button
                  type="button"
                  onClick={handleIncrease}
                  disabled={quantity >= product.quantity}
                  className="w-8 h-fit py-1 px-3 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
                {/* Akhir Button Increase */}
              </div>
              {/* Akhir Input Kuantitas */}

              {/* Awal Info Jumlah Kuantitas */}
              <div className="font-bold text-xs">
                Tersedia {product.quantity}
              </div>
              {/* Akhir Info Jumlah Kuantitas */}
            </div>
            {/* Akhir Input Kuantitas */}
          </div>
          {/* Akhir Kuantitas */}

          {/* Awal Tombol Masuk Keranjang dan Beli Sekarang */}
          <div className=" w-full h-fit flex justify-start items-center gap-2">
            {/* Awal Tombol Masuk Keranjang */}
            <TambahKeranjang data={data} />
            {/* Akhir Tombol Masuk Keranjang */}

            {/* Awal Tombol Beli Sekarang */}
            <BeliSekarang data={data} />
            {/* Akhir Tombol Beli Sekarang */}
          </div>
          {/* Akhir Tombol Masuk Keranjang dan Beli Sekarang */}
        </div>
        {/* Akhir Harga Produk, Voucher, Pengiriman, Jaminan Shopee, Warna, Kuantitas, Tombol Masuk Keranjang dan Beli Sekarang */}
      </div>
      {/* Akhir Informasi Produk */}
    </div>
  );
}
