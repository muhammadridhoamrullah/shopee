import { getProductByStoreId } from "@/src/models/product/product";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import CardProdukMungkinKamuSuka from "./CardProdukMungkinKamuSuka";

interface Props {
  storeId: string;
}

export default async function StoreMungkinKamuSuka({ storeId }: Props) {
  const productMungkinKamuSuka = await getProductByStoreId(storeId);

  console.log(productMungkinKamuSuka, "Kamu Suka");

  return (
    <div className="w-full h-80 px-20">
      {/* Awal Mungkin Kamu Suka */}
      <div className=" w-full h-full flex flex-col gap-2 justify-between items-start">
        {/* Awal Text Mungkin Kamu Suka dan Link Lihat Semua */}
        <div className=" w-full h-10 flex justify-between items-center text-gray-500">
          {/* Awal Text Mungkin Kamu Suka */}
          <span className="text-lg font-semibold">KAMU MUNGKIN SUKA</span>
          {/* Akhir Text Mungkin Kamu Suka */}

          {/* Awal Link Lihat Semua */}
          <Link
            href={`/rekomendasi/`}
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
          {productMungkinKamuSuka.map((produk) => (
            <CardProdukMungkinKamuSuka key={produk._id} data={produk} />
          ))}
        </div>
        {/* Akhir Map 5 Produk */}
      </div>
      {/* Akhir Mungkin Kamu Suka */}
    </div>
  );
}

// [
//   {
//     _id: '6a6ee56e0798c70ca1aa8402',
//     name: 'Jersey Brazil Away 2026',
//     slug: 'jersey-brazil-away-2026',
//     images: [
//       'https://picsum.photos/600/600?random=8',
//       'https://picsum.photos/600/600?random=58',
//       'https://picsum.photos/600/600?random=108',
//       'https://picsum.photos/600/600?random=158',
//       'https://picsum.photos/600/600?random=208',
//       'https://picsum.photos/600/600?random=258'
//     ],
//     price: 279000,
//     sold: 1400
//   },
//   {
//     _id: '6a6ee56e0798c70ca1aa8404',
//     name: 'Jersey Inter Milan Home 25/26',
//     slug: 'jersey-inter-milan-home-25-26',
//     images: [
//       'https://picsum.photos/600/600?random=10',
//       'https://picsum.photos/600/600?random=60',
//       'https://picsum.photos/600/600?random=110',
//       'https://picsum.photos/600/600?random=160',
//       'https://picsum.photos/600/600?random=210',
//       'https://picsum.photos/600/600?random=260'
//     ],
//     price: 269000,
//     discountPercent: 28,
//     sold: 641
//   },
//   {
//     _id: '6a6ee56e0798c70ca1aa83fd',
//     name: 'Jersey Barcelona Away 25/26',
//     slug: 'jersey-barcelona-away-25-26',
//     images: [
//       'https://picsum.photos/600/600?random=3',
//       'https://picsum.photos/600/600?random=53',
//       'https://picsum.photos/600/600?random=103',
//       'https://picsum.photos/600/600?random=153',
//       'https://picsum.photos/600/600?random=203',
//       'https://picsum.photos/600/600?random=253'
//     ],
//     price: 289000,
//     discountPercent: 28,
//     sold: 1600
//   },
//   {
//     _id: '6a6ee56e0798c70ca1aa83fb',
//     name: 'Jersey Manchester United Home 25/26',
//     slug: 'jersey-manchester-united-home-25-26',
//     images: [
//       'https://picsum.photos/600/600?random=1',
//       'https://picsum.photos/600/600?random=51',
//       'https://picsum.photos/600/600?random=101',
//       'https://picsum.photos/600/600?random=151',
//       'https://picsum.photos/600/600?random=201',
//       'https://picsum.photos/600/600?random=251'
//     ],
//     price: 299000,
//     discountPercent: 29,
//     sold: 1900
//   },
//   {
//     _id: '6a6ee56e0798c70ca1aa8400',
//     name: 'Jersey Timnas Indonesia Home 2026',
//     slug: 'jersey-timnas-indonesia-home-2026',
//     images: [
//       'https://picsum.photos/600/600?random=6',
//       'https://picsum.photos/600/600?random=56',
//       'https://picsum.photos/600/600?random=106',
//       'https://picsum.photos/600/600?random=156',
//       'https://picsum.photos/600/600?random=206',
//       'https://picsum.photos/600/600?random=256'
//     ],
//     price: 349000,
//     discountPercent: 30,
//     sold: 8700
//   }
// ] Kamu Suka
