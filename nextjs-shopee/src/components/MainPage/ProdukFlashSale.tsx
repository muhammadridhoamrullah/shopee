import { flashSaleLists, formatRupiah } from "@/src/helpers/utils";
import Image from "next/image";
import Link from "next/link";

export default function ProdukFlashSale() {
  return (
    <div className=" overflow-x-auto scroll-smooth flex-1 w-full grid grid-flow-col gap-2 grid-rows-1 scrollbar-none">
      {/* Awal Mapping Produk Flash Sale */}
      {flashSaleLists.map((produk, index) => (
        <Link
          href={produk.link}
          key={produk.id}
          className=" w-43 h-full flex flex-col justify-between items-center shrink-0"
        >
          {/* Awal Foto Produk */}
          <div className=" relative flex-1 w-full shrink-0 overflow-hidden rounded-xl">
            <Image
              src={`https://picsum.photos/400/400?random=${index + 1}`}
              alt={produk.name}
              fill
              className="object-contain"
            />
          </div>
          {/* Akhir Foto Produk */}

          {/* Awal Harga dan Jumlah Terjual */}
          <div className="w-full h-18 flex flex-col justify-center items-center px-3 gap-1">
            {/* Awal Harga */}
            <div className="flex flex-col justify-center items-center ">
              {/* Awal Harga Diskon */}
              <span className=" font-bold text-[#EE4D2D]">
                {formatRupiah(produk.price)}
              </span>
              {/* Akhir Harga Diskon */}

              {/* Awal Harga Asli */}
              <span className="text-[10px] text-gray-500 line-through">
                {formatRupiah(produk.originalPrice)}
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
                  width: `${(produk.stockSold / produk.stockTotal) * 100}%`,
                }}
              />
              {/* Akhir Progress Bar */}

              {/* Awal Jumlah Terjual */}
              <span className="absolute text-white">
                {produk.stockTotal - produk.stockSold} TERJUAL
              </span>
              {/* Akhir Jumlah Terjual */}
            </div>
            {/* Akhir Jumlah Terjual */}
          </div>
          {/* Akhir Harga dan Jumlah Terjual */}
        </Link>
      ))}
      {/* Akhir Mapping Produk Flash Sale */}
    </div>
  );
}

//  {
//     id: "fs-001",
//     name: "EON Cahaya Putih 12 Watt Lampu LED Hemat Energi",
//     image: "/images/products/lampu-eon-12w.png",
//     price: 108500,
//     originalPrice: 175000,
//     discountPercent: 38,
//     isMall: true,
//     isOri: true,
//     stockSold: 187,
//     stockTotal: 250,
//     link: "/produk/eon-lampu-led-12w",
//   },
