import { formatAngka, formatRupiah } from "@/src/helpers/utils";
import { ProdukRingkas } from "@/src/type/produk";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

interface Props {
  data: ProdukRingkas;
}

export default function CardProdukMungkinKamuSuka({ data }: Props) {
  const rating = 4.2;
  const mallOri = true;
  return (
    <Link
      href={`/${data.slug}`}
      className="bg-white w-full h-full rounded-md overflow-hidden shadow-md transition-all duration-300 ease-in-out flex flex-col justify-between items-start hover:scale-102"
    >
      {/* Awal Foto */}
      <div className="bg-gray-300 relative w-full h-43">
        <Image src={data.images[0]} alt={data.name} fill objectFit="cover" />

        {mallOri && (
          <Image
            src={"/MallOriRemoveBg.png"}
            alt="Mall Ori"
            width={100}
            height={100}
            className="absolute z-10 top-0 right-0 w-30 h-8"
          />
        )}
      </div>
      {/* Akhir Foto */}

      {/* Awal Info Produk */}
      <div className="flex-1 w-full flex flex-col justify-between items-start p-2 text-sm">
        {/* Awal Nama Produk */}
        <h1 className=" line-clamp-2 font-medium">{data.name}</h1>
        {/* Akhir Nama Produk */}

        {/* Awal Harga Produk dan Discount */}
        <div className="flex items-center gap-2 text-[#EE4D2D]">
          {/* Awal Harga Produk */}
          <span className="font-semibold text-lg">
            {formatRupiah(data.price)}
          </span>
          {/* Akhir Harga Produk */}

          {/* Awal Discount */}
          {data.discountPercent && (
            <span className="text-[10px] bg-red-800 text-white py-0.5 px-1">
              -{data.discountPercent}%
            </span>
          )}
          {/* Akhir Discount */}
        </div>
        {/* Akhir Harga Produk dan Discount */}

        {/* Awal Rating dan Sold */}
        <div className=" flex items-center gap-2 text-xs">
          {/* Awal Rating */}
          <div className="bg-gray-200 flex items-center gap-1 border border-[#EE4D2D] px-1 py-0.5 rounded-sm">
            {/* Awal Icon Rating */}
            <FaStar className="text-yellow-400" />
            {/* Akhir Icon Rating */}

            {/* Awal Nilai Rating */}
            <span className="font-semibold">{rating.toFixed(1)}</span>
            {/* Akhir Nilai Rating */}
          </div>
          {/* Akhir Rating */}

          {/* Awal Terjual */}
          <span>{formatAngka(data.sold)} Terjual</span>
          {/* Akhir Terjual */}
        </div>
        {/* Akhir Rating dan Sold */}
      </div>
      {/* Akhir Info Produk */}
    </Link>
  );
}
