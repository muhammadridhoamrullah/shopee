import { formatRupiah } from "@/src/helpers/utils";
import { FlashSaleProdukResponse } from "@/src/type/flashSale";
import Image from "next/image";
import Link from "next/link";

interface Props {
  produk: FlashSaleProdukResponse;
}

export default function CardFlashSale({ produk }: Props) {
  return (
    <Link
      href={produk.slug}
      key={produk._id}
      className=" w-43 h-full flex flex-col justify-between items-center shrink-0"
    >
      {/* Awal Foto Produk */}
      <div className=" relative flex-1 w-full shrink-0 overflow-hidden rounded-xl">
        <Image
          src={produk.image}
          alt={produk.name}
          fill
          className="object-contain"
          sizes="172px"
        />
      </div>
      {/* Akhir Foto Produk */}

      {/* Awal Harga dan Jumlah Terjual */}
      <div className="w-full h-18 flex flex-col justify-center items-center px-3 gap-1">
        {/* Awal Harga */}
        <div className="flex flex-col justify-center items-center ">
          {/* Awal Harga Diskon */}
          <span className=" font-bold text-[#EE4D2D]">
            {formatRupiah(produk.flashPrice)}
          </span>
          {/* Akhir Harga Diskon */}

          {/* Awal Harga Asli */}
          <span className="text-[10px] text-gray-500 line-through">
            {formatRupiah(produk.normalPrice)}
          </span>
          {/* Akhir Harga Asli */}
        </div>
        {/* Akhir Harga */}

        {/* Awal Jumlah Terjual */}
        <div className="bg-[#FFBDA6] relative w-full h-5 flex justify-center items-center text-xs font-semibold text-white overflow-hidden rounded-full">
          {/* Awal Progress Bar */}
          <div
            className="bg-linear-to-r from-[#EE4D2D] via-[#F96B4C] to-[#FFA07A]  h-full absolute left-0 top-0 transition-all duration-500 ease-in-out"
            style={{
              width: `${(produk.flashSold / produk.flashStock) * 100}%`,
            }}
          />
          {/* Akhir Progress Bar */}

          {/* Awal Jumlah Terjual */}
          <span className="absolute text-white">
            {produk.flashStock - produk.flashSold} TERJUAL
          </span>
          {/* Akhir Jumlah Terjual */}
        </div>
        {/* Akhir Jumlah Terjual */}
      </div>
      {/* Akhir Harga dan Jumlah Terjual */}
    </Link>
  );
}
