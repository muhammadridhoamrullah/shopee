import { ProdukRingkas } from "@/src/type/produk";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import CardProdukMungkinKamuSuka from "./CardProdukMungkinKamuSuka";

interface Props {
  title: string;
  link: string;
  produk: ProdukRingkas[];
}

export default function CardStoreProductSection({
  title,
  link,
  produk,
}: Props) {
  console.log(title, "title");

  return (
    <div className="w-full h-80 px-20">
      {/* Awal Mungkin Kamu Suka */}
      <div className=" w-full h-full flex flex-col gap-2 justify-between items-start">
        {/* Awal Text Mungkin Kamu Suka dan Link Lihat Semua */}
        <div className=" w-full h-10 flex justify-between items-center text-gray-500">
          {/* Awal Text Mungkin Kamu Suka */}
          <span className="text-lg font-semibold">{title}</span>
          {/* Akhir Text Mungkin Kamu Suka */}

          {/* Awal Link Lihat Semua */}
          <Link
            href={`${link}`}
            className="b flex items-center text-sm hover:text-[#EE4D2D] transition-colors duration-300 ease-in-out"
          >
            {/* Awal Text Lihat Semua */}
            <span>Lihat Semua</span>
            {/* Akhir Text Lihat Semua */}

            {/* Awal Icon Arrow Right */}
            <MdKeyboardArrowRight />
            {/* Akhir Icon Arrow Right */}
          </Link>
          {/* Akhir Link Lihat Semua */}
        </div>
        {/* Akhir Text Mungkin Kamu Suka dan Link Lihat Semua */}

        {/* Awal Map 5 Produk */}
        <div className="flex-1 w-full grid grid-cols-5 gap-3">
          {produk.map((produk) => (
            <CardProdukMungkinKamuSuka key={produk._id} data={produk} />
          ))}
        </div>
        {/* Akhir Map 5 Produk */}
      </div>
      {/* Akhir Mungkin Kamu Suka */}
    </div>
  );
}
