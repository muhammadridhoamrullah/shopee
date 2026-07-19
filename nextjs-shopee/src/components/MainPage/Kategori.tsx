import { kategoriMenuLists } from "@/src/helpers/utils";
import Image from "next/image";
import Link from "next/link";

export default function Kategori() {
  return (
    <div className="bg-white w-full h-90  flex flex-col justify-between items-start">
      {/* Awal Text Kategori */}
      <h1 className="w-full p-5 font-bold text-gray-500 border-b-2 border-[#F5F5F5]">
        KATEGORI
      </h1>
      {/* Akhir Text Kategori */}

      {/* Awal Menu Kategori */}
      <div className=" relative  flex-1 w-full">
        {/* Awal Panah Kiri */}
        {/* Akhir Panah Kiri */}
        {/* [&>*:not(:first-child)]:pl-2 [&>*:not(:last-child)]:pr-2 */}
        {/* Awal Mapping Menu Kategori */}
        <div className="overflow-x-auto scroll-smooth flex-1 h-full grid grid-flow-col grid-rows-2 scrollbar-none divide-x-2 divide-[#F5F5F5]  ">
          {kategoriMenuLists.map((kategori, index) => (
            <Link
              href={kategori.link}
              key={index}
              className=" w-28 h-full flex flex-col justify-center items-center   hover:bg-gray-200/30  transition-colors duration-500 ease-in-out gap-1 shrink-0"
            >
              {/* Awal Foto */}
              <div className=" flex-1 w-full flex justify-center items-center relative shrink-0">
                <Image
                  src={kategori.image}
                  alt={kategori.name}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              {/* Akhir Foto */}

              {/* Awal Nama Kategori */}
              <span className="text-xs h-15 w-full flex justify-center items-start text-center border-b-2 border-[#F5F5F5] font-semibold text-gray-500">
                {kategori.name}
              </span>
              {/* Akhir Nama Kategori */}
            </Link>
          ))}
        </div>
        {/* Akhir Mapping Menu Kategori */}

        {/* Awal Panah Kanan */}
        {/* Akhir Panah Kanan */}
      </div>
      {/* Akhir Menu Kategori */}
    </div>
  );
}
