"use client";

import { StoreResponse } from "@/src/type/store";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { HiMiniChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { IoStorefrontOutline } from "react-icons/io5";
import { formatAngka } from "@/src/helpers/utils";
import { formatLamaStore } from "@/src/utils/DetailPageProduk/DetailPageProduk";

interface Props {
  store: StoreResponse;
}

export default function Store({ store }: Props) {
  console.log(store, "store di Store.tsx");

  return (
    <div className="bg-white w-full h-40 shadow-md flex justify-between items-center p-4 divide-x divide-gray-200 [&>*:not(:first-child)]:pl-2 [&>*:not(:last-child)]:pr-2 ">
      {/* Awal Foto Profil dan Nama Toko */}
      <div className=" w-102 h-full flex justify-between items-center gap-4">
        {/* Awal Foto Profil */}
        <div className="bg-gray-200 w-30 h-30 rounded-full overflow-hidden relative">
          <Image src={store.image} alt={store.name} fill objectFit="cover" />
        </div>
        {/* Akhir Foto Profil */}

        {/* Awal Nama Toko */}
        <div className=" flex-1 h-full flex flex-col justify-center items-start gap-2">
          {/* Awal Nama Toko */}
          <span className="font-semibold text-lg line-clamp-2">
            {store.name}
          </span>
          {/* Akhir Nama Toko */}

          {/* Awal Online */}
          <div className="flex items-center gap-1">
            <div className="bg-green-500 w-2 h-2 rounded-full"></div>
            <span className="text-xs text-gray-600">Online</span>
          </div>
          {/* Akhir Online */}

          {/* Awal Chat Sekarang dan Kunjungi Toko */}
          <div className=" w-full flex justify-start items-center gap-2 text-sm">
            {/* Awal Chat Sekarang */}
            <button
              type="button"
              onClick={() => toast.success("Chat Sekarang")}
              className="bg-[#F5F5F5] p-2 flex items-center gap-1 hover:bg-white border border-bg-[#EE4D2D] rounded-md text-[#EE4D2D] cursor-pointer"
            >
              {/* Awal Icon Chat */}
              <HiMiniChatBubbleOvalLeftEllipsis />
              {/* Akhir Icon Chat */}

              {/* Awal Text Chat Sekarang */}
              <span>Chat Sekarang</span>
              {/* Akhir Text Chat Sekarang */}
            </button>
            {/* Akhir Chat Sekarang */}

            {/* Awal Kunjungi Toko */}
            <Link
              href={`/store/${store.slug}`}
              className=" p-2 flex items-center gap-1 hover:bg-gray-200 border border-gray-300 rounded-md text-black cursor-pointer"
            >
              {/* Awal Icon Store */}
              <IoStorefrontOutline />
              {/* Akhir Icon Chat */}

              {/* Awal Text Kunjungi Toko */}
              <span>Kunjungi Toko</span>
              {/* Akhir Text Kunjungi Toko */}
            </Link>
            {/* Akhir Kunjungi Toko */}
          </div>
          {/* Akhir Chat Sekarang dan Kunjungi Toko */}
        </div>
        {/* Akhir Nama Toko */}
      </div>
      {/* Akhir Foto Profil dan Nama Toko */}

      {/* Awal Informasi Toko */}
      <div className=" flex-1 h-full flex justify-between items-center   gap-4 text-sm overflow-auto">
        {/* Awal Penilaian dan Produk */}
        <div className="w-48  flex flex-col gap-2 justify-between items-center">
          {/* Awal Penilaian */}
          <div className="w-full  flex justify-between items-center">
            {/* Awal Text Penilaian */}
            <span className="text-gray-400">Penilaian</span>
            {/* Akhir Text Penilaian */}

            {/* Awal Jumlah Penilaian */}
            <span className="text-[#EE4D2D]">{formatAngka(38000)}</span>
            {/* Akhir Jumlah Penilaian */}
          </div>
          {/* Akhir Penilaian */}

          {/* Awal Produk */}
          <div className=" w-full flex justify-between items-center">
            {/* Awal Text Produk */}
            <span className="text-gray-400">Produk</span>
            {/* Akhir Text Produk */}

            {/* Awal Jumlah Produk */}
            <span className="text-[#EE4D2D]">{formatAngka(150)}</span>
            {/* Akhir Jumlah Produk */}
          </div>
          {/* Akhir Produk */}
        </div>
        {/* Akhir Penilaian dan Produk */}

        {/* Awal Persentase Chat Dibalas dan Waktu Chat Dibalas */}
        <div className=" flex-1 flex flex-col gap-2 justify-between items-center">
          {/* Awal Persentase Chat Dibalas */}
          <div className=" w-full  flex justify-between items-center">
            {/* Awal Text Persentase Chat Dibalas */}
            <span className="text-gray-400">Persentase Chat Dibalas</span>
            {/* Akhir Text Persentase Chat Dibalas */}

            {/* Awal Persen Persentase Chat Dibalas */}
            <span className="text-[#EE4D2D]">100%</span>
            {/* Akhir Persen Persentase Chat Dibalas */}
          </div>
          {/* Akhir Persentase Chat Dibalas */}

          {/* Awal Waktu Chat Dibalas */}
          <div className=" w-full flex justify-between items-center">
            {/* Awal Text Waktu Chat Dibalas */}
            <span className="text-gray-400">Waktu Chat Dibalas</span>
            {/* Akhir Text Waktu Chat Dibalas */}

            {/* Awal Jumlah Waktu Chat Dibalas */}
            <span className="text-[#EE4D2D]">Hitungan Jam</span>
            {/* Akhir Jumlah Waktu Chat Dibalas */}
          </div>
          {/* Akhir Waktu Chat Dibalas */}
        </div>
        {/* Akhir Persentase Chat Dibalas dan Waktu Chat Dibalas */}

        {/* Awal Bergabung dan Pengikut */}
        <div className=" w-48 flex flex-col gap-2 justify-between items-center">
          {/* Awal Bergabung */}
          <div className=" w-full  flex justify-between items-center">
            {/* Awal Text Bergabung */}
            <span className="text-gray-400">Bergabung</span>
            {/* Akhir Text Bergabung */}

            {/* Awal Persen Bergabung */}
            <span className="text-[#EE4D2D]">
              {formatLamaStore(store.createdAt)}
            </span>
            {/* Akhir Persen Bergabung */}
          </div>
          {/* Akhir Bergabung */}

          {/* Awal Pengikut */}
          <div className="w-full flex justify-between items-center">
            {/* Awal Text Pengikut */}
            <span className="text-gray-400">Pengikut</span>
            {/* Akhir Text Pengikut */}

            {/* Awal Jumlah Pengikut */}
            <span className="text-[#EE4D2D]">{formatAngka(1200)}</span>
            {/* Akhir Jumlah Pengikut */}
          </div>
          {/* Akhir Pengikut */}
        </div>
        {/* Akhir Bergabung dan Pengikut */}
      </div>
      {/* Akhir Informasi Toko */}
    </div>
  );
}

// {

//   _id: '6a69f12930ce0d2e3f516bf8',

//   userId: '6a572ab6e15a597dfea5bcbc',

//   name: 'Kang Haerin HQ',

//   slug: 'kang-haerin-hq',

//   image: 'https://i.pinimg.com/474x/19/eb/32/19eb32ead6d19cf5f54f7e7b48c1a56f.jpg',

//   phone: '081234567890',

//   city: 'Jakarta',

//   description: 'Toko menjual merchandise dari NewJeans',

//   createdAt: 2026-07-29T12:25:10.496Z,

//   updatedAt: 2026-07-29T12:25:10.496Z,

//   deletedAt: null

// } store di Store.tsx
