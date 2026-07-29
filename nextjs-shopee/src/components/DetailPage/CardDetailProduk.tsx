"use client";

import { formatRupiah } from "@/src/helpers/utils";
import { ProdukResponse } from "@/src/type/produk";

interface Props {
  product: ProdukResponse;
}

export default function CardDetailProduk({ product }: Props) {



  return (
    <div className="bg-white w-full min-h-0 flex justify-start items-start p-4 gap-4">
      {/* Awal Foto Produk */}
      <div className="bg-green-600 w-120 h-150">Foto Produk</div>
      {/* Akhir Foto Produk */}

      {/* Awal Informasi Produk */}
      <div className="bg-purple-950/20 flex-1 h-full flex flex-col gap-2 justify-start items-start">
        {/* Awal Nama Produk dan Rating, Penilaian, Terjual, dan Laporkan */}
        <div className="bg-olive-700 w-full h-ft flex flex-col gap-2 justify-start items-start">
          {/* Awal Nama Produk */}
          <p className="bg-green-400 font-semibold text-xl line-clamp-2">
            {product.name} Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Aliquid praesentium, velit quibusdam quidem esse odio deleniti
            nulla nisi facilis perferendis vitae nobis sint fugit nesciunt
            molestiae repellendus, itaque eum ea minus! Praesentium quos quis
            aspernatur enim, voluptatum dignissimos odio corporis rerum
            laboriosam, quibusdam obcaecati ipsum temporibus. Blanditiis,
            voluptatum? Amet, laudantium.
          </p>
          {/* Akhir Nama Produk */}

          {/* Awal Rating, Penilaianm Terjual, dan Laporkan */}
          <div className="bg-purple-900 w-full py-2">
            Rating, Penilaian, Terjual, dan Laporkan
          </div>
          {/* Akhir Rating, Penilaianm Terjual, dan Laporkan */}
        </div>
        {/* Akhir Nama Produk dan Rating, Penilaian, Terjual, dan Laporkan */}

        {/* Awal Harga Produk, Voucher, Pengiriman, Jaminan Shopee, Warna, Kuantitas, Tombol Masuk Keranjang dan Beli Sekarang */}
        <div className="bg-blue-900 w-full h-full flex flex-col gap-4 px-4">
          {/* Awal Harga Produk */}
          <div className="bg-[#F5F5F5] w-full h-fit flex justify-start items-center gap-2 p-2 ">
            {/* Awal Harga Setelah Diskon */}
            <span className="text-3xl font-semibold text-[#EE4D2D]">
              {formatRupiah(product.price)}
            </span>
            {/* Akhir Harga Setelah Diskon */}

            {/* Awal Harga Sebelum Diskon */}
            {product.originalPrice && (
              <span className="line-through text-sm text-gray-500">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
            {/* Akhir Harga Sebelum Diskon */}

            {/* Awal Diskon */}
            {product.discountPercent && (
              <span className="bg-red-500 text-white text-sm font-bold px-2 py-1">
                {product.discountPercent}% OFF
              </span>
            )}
            {/* Akhir Diskon */}
          </div>
          {/* Akhir Harga Produk */}

          {/* Awal Voucher */}
          <div className="bg-white w-full flex justify-start items-center gap-4 text-sm">
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
          <div className="bg-green-700">Kuantitas</div>
          {/* Akhir Kuantitas */}

          {/* Awal Tombol Masuk Keranjang dan Beli Sekarang */}
          <div className="bg-red-600">
            Tombol Masuk Keranjang dan Beli Sekarang
          </div>
          {/* Akhir Tombol Masuk Keranjang dan Beli Sekarang */}
        </div>
        {/* Akhir Harga Produk, Voucher, Pengiriman, Jaminan Shopee, Warna, Kuantitas, Tombol Masuk Keranjang dan Beli Sekarang */}
      </div>
      {/* Akhir Informasi Produk */}
    </div>
  );
}
