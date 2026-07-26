import { IoIosArrowForward } from "react-icons/io";
import FlashSale from "../FlashSale/FlashSale";
import ProdukFlashSale from "../FlashSale/ProdukFlashSale";
import Link from "next/link";
import TimerFlashSale from "../FlashSale/TimerFlashSale";

export default function ProdukTerlaris() {
  return (
    <div className="bg-white w-full h-75 flex flex-col justify-between items-start">
      {/* Awal Flash Sale */}
      <div className=" w-full flex justify-between items-center p-5">
        {/* Awal Text dan Timer Flash Sale */}
        <h1 className=" font-bold text-[#EE4D2D]">PRODUK TERLARIS</h1>
        {/* Akhir Text dan Timer Flash Sale */}

        {/* Awal Link Lihat Semua */}
        <div className=" w-fit flex justify-start items-center gap-1 text-[#EE4D2D] font-semibold text-xs">
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
