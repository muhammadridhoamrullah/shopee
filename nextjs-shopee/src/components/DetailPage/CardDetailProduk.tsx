"use client";

import { formatRupiah } from "@/src/helpers/utils";
import { ProdukResponse } from "@/src/type/produk";
import { useState } from "react";
import TambahKeranjang from "./TambahKeranjang";
import BeliSekarang from "./BeliSekarang";
import { toast } from "react-toastify";
import StarRating from "./StarRating";
import FotoProduk from "./FotoProduk";

interface Props {
  product: ProdukResponse;
}

export default function CardDetailProduk({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  console.log(quantity, "quantity");

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(product.quantity, prev + 1));
    // Ingatkan saya ubah ini nanti
  };

  const data = {
    productId: product._id,
    quantity: quantity,
  };

  const rating = 4.5;
  const totalPenilaian = 100;
  const totalTerjual = 50;

  return (
    <div className="bg-white w-full min-h-0 flex justify-start items-start p-4 gap-4 shadow-md ">
      {/* Awal Foto Produk */}
      <FotoProduk data={product.images} />
      {/* Akhir Foto Produk */}

      {/* Awal Informasi Produk */}
      <div className="bg-purple-950/20 flex-1 h-full flex flex-col gap-2 justify-start items-start">
        {/* Awal Nama Produk dan Rating, Penilaian, Terjual, dan Laporkan */}
        <div className="bg-olive-700 w-full h-ft flex flex-col gap-2 justify-start items-start">
          {/* Awal Nama Produk */}
          <p className="bg-green-400 font-semibold text-xl line-clamp-2">
            {product.name}
          </p>
          {/* Akhir Nama Produk */}

          {/* Awal Rating, Penilaianm Terjual, dan Laporkan */}
          <div className="bg-purple-900 w-full h-7 flex justify-between items-center text-sm  ">
            {/* Awal Rating, Penilaian, Terjual */}
            <div className="bg-green-800 w-full h-full  flex justify-start items-center divide-x divide-gray-400 [&>*:not(:first-child)]:pl-1 [&>*:not(:last-child)]:pr-1">
              {/* Awal Rating */}
              <div className="bg-amber-800 flex h-full items-center gap-1.5 ">
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
              <div className="bg-pink-400 flex h-full items-center gap-1.5">
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
              <div className="bg-blue-500 flex h-full items-center gap-1.5">
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
              className="text-gray-300 cursor-pointer hover:text-red-500 transition-colors duration-300 ease-in-out"
              onClick={() => toast.warning("Gweh laporkan lu ye!")}
            >
              Laporkan
            </button>
            {/* Akhir Laporkan */}
          </div>
          {/* Akhir Rating, Penilaianm Terjual, dan Laporkan */}
        </div>
        {/* Akhir Nama Produk dan Rating, Penilaian, Terjual, dan Laporkan */}

        {/* Awal Harga Produk, Voucher, Pengiriman, Jaminan Shopee, Warna, Kuantitas, Tombol Masuk Keranjang dan Beli Sekarang */}
        <div className="bg-blue-900 w-full h-full flex flex-col gap-4 px-4 text-sm">
          {/* Awal Harga Produk */}
          <div className="bg-[#F5F5F5] w-full h-fit flex justify-start items-center gap-2 p-2 ">
            {/* Awal Harga Setelah Diskon */}
            <span className="text-3xl font-semibold text-[#EE4D2D]">
              {formatRupiah(product.price)}
            </span>
            {/* Akhir Harga Setelah Diskon */}

            {/* Awal Harga Sebelum Diskon */}
            {product.originalPrice && (
              <span className="line-through  text-gray-500">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
            {/* Akhir Harga Sebelum Diskon */}

            {/* Awal Diskon */}
            {product.discountPercent && (
              <span className="bg-red-500 text-white  font-bold px-2 py-1">
                {product.discountPercent}% OFF
              </span>
            )}
            {/* Akhir Diskon */}
          </div>
          {/* Akhir Harga Produk */}

          {/* Awal Voucher */}
          <div className="bg-green-900 w-full flex justify-start items-center gap-4 ">
            {/* Awal Text Voucher */}
            <span className="text-gray-500 bg-red-500 w-25 line-clamp-2">
              Voucher
            </span>
            {/* Akhir Text Voucher */}

            {/* Awal List Voucher */}
            <div className="w-full h-fit flex justify-start items-center gap-2 text-[#EE4D2D]">
              <div className="bg-red-300 px-2 py-1">POTONGAN Rp.500</div>
              <div className="bg-red-300 px-2 py-1">POTONGAN Rp.1000</div>
            </div>
            {/* Akhir List Voucher */}
          </div>
          {/* Akhir Voucher */}

          {/* Awal Pengiriman */}
          <div className="bg-purple-500">Pengiriman</div>
          {/* Akhir Pengiriman */}

          {/* Awal Jaminan Shopee */}
          <div className="bg-orange-700">Jaminan Shopee</div>
          {/* Akhir Jaminan Shopee */}

          {/* Awal Warna */}
          <div className="bg-blue-700">Warna</div>
          {/* Akhir Warna */}

          {/* Awal Kuantitas */}
          <div className="bg-white w-full h-fit flex justify-start items-center gap-4 ">
            {/* Awal Text Kuantitas */}
            <span className="text-gray-500 bg-red-500 w-25 line-clamp-2">
              Kuantitas
            </span>
            {/* Akhir Text Kuantitas */}

            {/* Awal Input Kuantitas */}
            <div className="w-full h-fit flex justify-start items-center gap-2">
              {/* Awal Input Kuantitas */}
              <div className="bg-amber-700/40 w-30 h-fit flex justify-start items-center border border-gray-300 divide-x divide-gray-300 ">
                {/* Awal Button Decrease */}
                <button
                  type="button"
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                  className="bg-amber-300 w-8 h-fit p-2 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                {/* Akhir Button Decrease */}
                {/* Awal Nilai Input Sekarang */}
                <span className="bg-purple-300 flex-1 text-center p-2 text-lg">
                  {quantity}
                </span>
                {/* Akhir Nilai Input Sekarang */}
                {/* Awal Button Increase */}
                <button
                  type="button"
                  onClick={handleIncrease}
                  disabled={quantity >= product.quantity}
                  className="bg-red-400 w-8 h-fit p-2 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="bg-red-600 w-full h-fit flex justify-start items-center gap-2">
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
