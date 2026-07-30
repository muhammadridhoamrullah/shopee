import { formatRupiah, formatSoldProductCount } from "@/src/helpers/utils";
import { ProdukResponse } from "@/src/type/produk";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: ProdukResponse;
}

export default function CardProductRekomendasi({ product }: Props) {
  return (
    <Link
      href={`/${product.slug}`}
      className="w-full rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out h-70 flex flex-col justify-between items-start"
    >
      {/* Awal Foto Produk */}
      <div className="relative w-full  h-45">
        {/* Awal Foto */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          objectFit="cover"
          sizes="180px"
        />
        {/* Akhir Foto */}

        {/* Awal Badge */}
        {/* Akhir Badge */}

        {/* Awal Discount  */}
        {product.discountPercent && (
          <span className="absolute top-0 right-0 bg-[#EE4D2D] text-white text-sm font-semibold px-1 py-0.5 rounded-bl-md">
            {product.discountPercent}% OFF
          </span>
        )}
        {/* Akhir Discount  */}
      </div>
      {/* Akhir Foto Produk */}

      {/* Awal Info Produk */}
      <div className="flex-1 w-full p-2 flex flex-col justify-between items-start ">
        {/* Awal Nama Produk */}
        <h1 className=" flex-1 text-sm  line-clamp-2">{product.name}</h1>
        {/* Akhir Nama Produk */}

        {/* Awal Harga dan Jumlah Terjual */}
        <div className="w-full flex justify-between items-center gap-1">
          {/* Awal Harga */}
          <span className=" line-clamp-1 flex-1 text-sm font-semibold text-[#EE4D2D]">
            {formatRupiah(product.price)}
          </span>
          {/* Akhir Harga */}

          {/* Awal Jumlah Terjual */}
          <span className="  text-xs font-medium">
            {formatSoldProductCount(product.sold)}
          </span>
          {/* Akhir Jumlah Terjual */}
        </div>
        {/* Akhir Harga dan Jumlah Terjual */}
      </div>
      {/* Akhir Info Produk */}
    </Link>
  );
}
