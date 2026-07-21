import Link from "next/link";
import TimerFlashSale from "./TimerFlashSale";
import { IoIosArrowForward } from "react-icons/io";
import ProdukFlashSale from "./ProdukFlashSale";

export default function FlashSale() {
  return (
    <div className="bg-white w-full h-75 flex flex-col justify-between items-start">
      {/* Awal Flash Sale */}
      <div className="w-full flex justify-between items-center p-5">
        {/* Awal Text dan Timer Flash Sale */}
        <div className="flex justify-start items-center gap-2">
          {/* Awal Text Flash Sale */}
          <h1 className="w-full font-bold text-[#EE4D2D]">FLASH SALE</h1>
          {/* Akhir Text Flash Sale */}

          {/* Awal Timer Flash Sale */}
          <TimerFlashSale />
          {/* Akhir Timer Flash Sale */}
        </div>
        {/* Akhir Text dan Timer Flash Sale */}

        {/* Awal Link Lihat Semua */}
        <div className="flex justify-start items-center gap-1 text-[#EE4D2D] font-semibold text-xs">
          {/* Awal Link Lihat Semua */}
          <Link href={"/flash-sale"}>Lihat Semua</Link>
          {/* Akhir Link Lihat Semua */}

          {/* Awal Arrow */}
          <IoIosArrowForward className="" />
          {/* Akhir Arrow */}
        </div>
        {/* Akhir Link Lihat Semua */}
      </div>
      {/* Akhir Flash Sale */}

      {/* Awal Mapping Produk Flash Sale */}
      <ProdukFlashSale />
      {/* Akhir Mapping Produk Flash Sale */}
    </div>
  );
}
