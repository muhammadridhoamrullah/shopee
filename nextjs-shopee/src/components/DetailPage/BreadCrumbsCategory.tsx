import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { KategoriResponse } from "@/src/type/category";

interface Props {
  category: KategoriResponse[];
  productName: string;
}

export default function BreadCrumbsCategory({ category, productName }: Props) {
  return (
    <div className="w-full flex flex-wrap items-center gap-1 text-xs text-gray-500">
      {/* Awal Link Beranda */}
      <Link href="/" className="hover:text-[#EE4D2D]">
        Shopee
      </Link>
      {/* Akhir Link Beranda */}

      {/* Awal Mapping Kategori */}
      {category.map((kategori) => (
        <div key={kategori._id} className="flex items-center gap-1">
          <IoIosArrowForward className="text-[10px]" />
          <Link
            href={`/category/${kategori.slug}`}
            className="hover:text-[#EE4D2D]"
          >
            {kategori.name}
          </Link>
        </div>
      ))}
      {/* Akhir Mapping Kategori */}

      {/* Awal Nama Produk -- halaman saat ini, jadi teks biasa bukan link */}
      <IoIosArrowForward className="text-[10px]" />
      <span className="text-gray-700 line-clamp-1">{productName}</span>
      {/* Akhir Nama Produk */}
    </div>
  );
}
