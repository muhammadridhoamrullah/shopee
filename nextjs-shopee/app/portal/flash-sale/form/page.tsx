"use client";

import { FaCheck } from "react-icons/fa6";

export default function FormFlashSale() {
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
        <div className="bg-pink-400 w-full h-fit flex flex-col gap-2 justify-start items-start">
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

          {/* Awal Slot Waktu */}
          <div className="bg-red-500 w-full">Slot Waktu</div>
          {/* Akhir Slot Waktu */}

          {/* Awal Pilih Produk */}
          <div className="bg-purple-500 w-full">Pilih Produk</div>
          {/* Akhir Pilih Produk */}
        </div>
        {/* Akhir Form Produk Flash Sale Saya */}
      </div>
      {/* Akhir Produk Flash Sale Saya */}
    </div>
  );
}

// productId: "",
// flashPrice: "",
// flashStock: "",
// tanggal: "",
// slotStart: "",
