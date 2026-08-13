import { getProductsBySlug } from "@/src/models/category/category";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdKeyboardArrowRight } from "react-icons/md";

import SemuaProdukKanan from "@/src/components/Category/SemuaProdukKanan";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; sort?: string }>;
}



export default async function CategorySlugPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { page, sort } = await searchParams;
  const currentPage = Math.max(Number(page) || 1, 1); // Default ke halaman 1 jika tidak ada parameter page, dan pastikan minimal halaman adalah 1
  const getAllProductsBySlug = await getProductsBySlug(slug, currentPage, sort);

  if (!getAllProductsBySlug) {
    notFound();
  }

  return (
    <div className="bg-[#F5F5F5] w-full h-fit px-20 py-4 flex flex-col gap-4 border-b-4 border-[#EE4D2D] text-sm">
      {/* Awal List Brand */}
      <div className="bg-white w-full h-80 flex flex-col justify-between items-center">
        {/* Awal Shopee Mall dan Lihat Semua */}
        <div className=" w-full flex justify-between items-center p-4">
          {/* Isinya Daftar Produk Mall Ori Dengan Kategori ${slug} */}
          {/* Awal Link Shopee Mall Category */}
          <Link
            className=" text-red-600 text-xl font-bold"
            href={`/mall/category/${slug}`}
          >
            Shopee Mall
          </Link>
          {/* Akhir Link Shopee Mall Category */}

          {/* Isinya Daftar Brand Yang Memiliki Produk Dengan Category ${slug} dan Mall Ori */}
          {/* Awal Link Lihat Semua Brand Mall Ori */}
          <Link
            href={`/mall/brands/${slug}`}
            className="flex items-center text-sm hover:text-[#EE4D2D] transition-colors duration-300 ease-in-out"
          >
            {/* Awal Text Lihat Semua */}
            <span>Lihat Semua</span>
            {/* Akhir Text Lihat Semua */}

            {/* Awal Icon Arrow Right */}
            <MdKeyboardArrowRight />
            {/* Akhir Icon Arrow Right */}
          </Link>
          {/* Akhir Link Lihat Semua Brand Mall Ori */}
        </div>
        {/* Akhir Shopee Mall dan Lihat Semua */}

        {/* Awal List Brand Mall */}
        <div className=" w-full flex-1 relative">
          <Image
            src={"/shopee1.png"}
            alt="Shopee Mall"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* Akhir List Brand Mall */}
      </div>
      {/* Akhir List Brand */}

      {/* Ingatkan saya ganti jadi h-fit */}
      {/* Awal Semua Kategori (Kiri) dan Semua Produk (Kanan) */}
      <div className=" w-full min-h-90 flex justify-between items-start gap-2">
        {/* Awal Semua Kategori (Kiri) */}
        <div className="bg-green-300 w-60 h-full">Semua Kategori</div>
        {/* Akhir Semua Kategori (Kiri) */}

        {/* Awal Semua Produk (Kanan) */}
        <SemuaProdukKanan
          data={getAllProductsBySlug}
          sort={sort ?? "populer"}
        />
        {/* Akhir Semua Produk (Kanan) */}
      </div>
      {/* Akhir Semua Kategori (Kiri) dan Semua Produk (Kanan) */}
    </div>
  );
}

// {
//   category: {
//     _id: '6a7000000000000000000003',
//     name: 'Jersey',
//     slug: 'jersey',
//     ancestorsId: [ '6a7000000000000000000001', '6a7000000000000000000002' ],
//     createdAt: 2026-08-02T06:35:38.839Z,
//     updatedAt: 2026-08-02T06:35:38.839Z
//   },
//   products: [
//     {
//       _id: '6a6ee56e0798c70ca1aa83fb',
//       name: 'Jersey Manchester United Home 25/26',
//       slug: 'jersey-manchester-united-home-25-26',
//       categoryId: '6a7000000000000000000003',
//       storeId: '6a8000000000000000000001',
//       images: [Array],
//       price: 299000,
//       originalPrice: 420000,
//       discountPercent: 29,
//       quantity: 100,
//       sold: 1900,
//       createdAt: 2026-08-02T06:36:28.104Z,
//       updatedAt: 2026-08-02T06:36:28.104Z
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa83fc',
//       name: 'Jersey Real Madrid Home 25/26',
//       slug: 'jersey-real-madrid-home-25-26',
//       categoryId: '6a7000000000000000000003',
//       storeId: '6a8000000000000000000001',
//       images: [Array],
//       price: 315000,
//       originalPrice: 450000,
//       discountPercent: 30,
//       quantity: 85,
//       sold: 2400,
//       createdAt: 2026-08-02T06:36:28.104Z,
//       updatedAt: 2026-08-02T06:36:28.104Z
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa83fd',
//       name: 'Jersey Barcelona Away 25/26',
//       slug: 'jersey-barcelona-away-25-26',
//       categoryId: '6a7000000000000000000003',
//       storeId: '6a8000000000000000000001',
//       images: [Array],
//       price: 289000,
//       originalPrice: 399000,
//       discountPercent: 28,
//       quantity: 70,
//       sold: 1600,
//       createdAt: 2026-08-02T06:36:28.104Z,
//       updatedAt: 2026-08-02T06:36:28.104Z
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa83fe',
//       name: 'Jersey Liverpool FC Away Authentic 25/26',
//       slug: 'jersey-liverpool-fc-away-authentic-25-26',
//       categoryId: '6a7000000000000000000003',
//       storeId: '6a8000000000000000000001',
//       images: [Array],
//       price: 1190000,
//       originalPrice: 1450000,
//       discountPercent: 18,
//       quantity: 25,
//       sold: 210,
//       createdAt: 2026-08-02T06:36:28.104Z,
//       updatedAt: 2026-08-02T06:36:28.104Z
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa83ff',
//       name: 'Jersey Arsenal Third 25/26',
//       slug: 'jersey-arsenal-third-25-26',
//       categoryId: '6a7000000000000000000003',
//       storeId: '6a8000000000000000000001',
//       images: [Array],
//       price: 275000,
//       quantity: 60,
//       sold: 890,
//       createdAt: 2026-08-02T06:36:28.104Z,
//       updatedAt: 2026-08-02T06:36:28.104Z
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa8400',
//       name: 'Jersey Timnas Indonesia Home 2026',
//       slug: 'jersey-timnas-indonesia-home-2026',
//       categoryId: '6a7000000000000000000003',
//       storeId: '6a8000000000000000000001',
//       images: [Array],
//       price: 349000,
//       originalPrice: 499000,
//       discountPercent: 30,
//       quantity: 200,
//       sold: 8700,
//       createdAt: 2026-08-02T06:36:28.104Z,
//       updatedAt: 2026-08-02T06:36:28.104Z
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa8401',
//       name: 'Jersey Argentina Home 2026',
//       slug: 'jersey-argentina-home-2026',
//       categoryId: '6a7000000000000000000003',
//       storeId: '6a8000000000000000000001',
//       images: [Array],
//       price: 285000,
//       originalPrice: 399000,
//       discountPercent: 29,
//       quantity: 120,
//       sold: 2700,
//       createdAt: 2026-08-02T06:36:28.104Z,
//       updatedAt: 2026-08-02T06:36:28.104Z
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa8402',
//       name: 'Jersey Brazil Away 2026',
//       slug: 'jersey-brazil-away-2026',
//       categoryId: '6a7000000000000000000003',
//       storeId: '6a8000000000000000000001',
//       images: [Array],
//       price: 279000,
//       quantity: 95,
//       sold: 1400,
//       createdAt: 2026-08-02T06:36:28.104Z,
//       updatedAt: 2026-08-02T06:36:28.104Z
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa8403',
//       name: 'Jersey Manchester City Home 25/26',
//       slug: 'jersey-manchester-city-home-25-26',
//       categoryId: '6a7000000000000000000003',
//       storeId: '6a8000000000000000000001',
//       images: [Array],
//       price: 295000,
//       originalPrice: 410000,
//       discountPercent: 28,
//       quantity: 75,
//       sold: 1150,
//       createdAt: 2026-08-02T06:36:28.105Z,
//       updatedAt: 2026-08-02T06:36:28.105Z
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa8404',
//       name: 'Jersey Inter Milan Home 25/26',
//       slug: 'jersey-inter-milan-home-25-26',
//       categoryId: '6a7000000000000000000003',
//       storeId: '6a8000000000000000000001',
//       images: [Array],
//       price: 269000,
//       originalPrice: 375000,
//       discountPercent: 28,
//       quantity: 49,
//       sold: 641,
//       createdAt: 2026-08-02T06:36:28.105Z,
//       updatedAt: 2026-08-02T12:22:05.706Z
//     }
//   ]
// } get All Products
