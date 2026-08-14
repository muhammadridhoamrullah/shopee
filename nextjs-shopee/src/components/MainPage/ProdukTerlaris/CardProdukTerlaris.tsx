import { formatSoldProductCount } from "@/src/helpers/utils";
import { ProdukRingkas } from "@/src/type/produk";
import Image from "next/image";
import Link from "next/link";
import { AiFillFire } from "react-icons/ai";

interface Props {
  produk: ProdukRingkas;
}

export default function CardProduKTerlaris({ produk }: Props) {
  return (
    <Link
      href={produk.slug}
      key={produk._id}
      className=" w-43 h-full flex flex-col gap-1 justify-between items-center shrink-0 hover:scale-102 transition-transform duration-300 ease-in-out"
    >
      {/* Awal Foto Produk */}
      <div className="bg-green-600 relative flex-1 w-full shrink-0 overflow-hidden rounded-xl">
        <Image
          src={produk.images[0]}
          alt={produk.name}
          fill
          objectFit="cover"
          sizes="172px"
        />

        <div className="absolute w-full bg-black/70 flex justify-center items-center gap-1 py-1 bottom-0">
          {/* Awal Text Jumlah Jual */}
          <span className=" font-semibold text-sm text-white ">
            TERJUAL {formatSoldProductCount(produk.sold)}
          </span>
          {/* Akhir Text Jumlah Jual */}

          {/* Awal Icon Fire */}
          <AiFillFire className=" text-orange-400" />
          {/* Akhir Icon Fire */}
        </div>
      </div>
      {/* Akhir Foto Produk */}

      {/* Awal Nama, Harga, Rating, Terjual Produk */}
      <span className=" w-full min-10 shrink-0 line-clamp-2 px-2 text-sm font-semibold text-center ">
        {produk.name}
      </span>
      {/* Akhir Nama, Harga, Rating, Terjual Produk */}
    </Link>
  );
}
