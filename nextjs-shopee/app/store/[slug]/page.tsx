import StoreVoucher from "@/src/components/Store/StoreVoucher";
import StoreBannerSlide from "@/src/components/Store/StoreBannerSlide";
import StoreBannerStatis from "@/src/components/Store/StoreBannerStatis";
import StoreProdukSectionByType from "@/src/components/Store/StoreProdukSectionByType";
import StoreAllProducts from "@/src/components/Store/StoreAllProducts";
import { getProductByStoreId, getStoreBySlug } from "@/src/models/store/store";
import StoreInfo from "@/src/components/Store/StoreInfo";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
    sort?: string;
  }>;
}

export default async function StoreDetail({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page, sort } = await searchParams;
  const storeDataBySlug = await getStoreBySlug(slug);
  console.log(storeDataBySlug, "store my gweh");
  if (!storeDataBySlug) {
    notFound();
  }

  const currentPage = Math.max(Number(page) || 1, 1); // Default ke halaman 1 jika tidak ada parameter page, dan pastikan minimal halaman adalah 1
  const sortOption = sort || "populer"; // Default ke "populer" jika tidak ada parameter sort

  const getAllProductsStore = await getProductByStoreId(
    storeDataBySlug._id,
    currentPage,
    sortOption,
  );
  console.log(getAllProductsStore, "Store Product");

  const dummyVouchers = [
    {
      _id: "vc-001",
      code: "DISKON1RB",
      discountAmount: 1000, // Rp1RB
      minPurchase: 50000, // Min. Blj Rp50RB
      expiredAt: new Date("2026-09-16"), // Hingga: 16.09.2026
      stock: 5, // x5
    },
    {
      _id: "vc-002",
      code: "DISKON5RB",
      discountAmount: 5000, // Rp5RB
      minPurchase: 100000, // Min. Blj Rp100RB
      expiredAt: new Date("2026-09-30"), // Hingga: 30.09.2026
      stock: 12, // x12
    },
    {
      _id: "vc-003",
      code: "DISKON10RB",
      discountAmount: 10000, // Rp10RB
      minPurchase: 200000, // Min. Blj Rp200RB
      expiredAt: new Date("2026-10-15"), // Hingga: 15.10.2026
      stock: 8, // x8
    },
    {
      _id: "vc-004",
      code: "DISKON1RB",
      discountAmount: 1000, // Rp1RB
      minPurchase: 50000, // Min. Blj Rp50RB
      expiredAt: new Date("2026-09-16"), // Hingga: 16.09.2026
      stock: 5, // x5
    },
    {
      _id: "vc-005",
      code: "DISKON5RB",
      discountAmount: 5000, // Rp5RB
      minPurchase: 100000, // Min. Blj Rp100RB
      expiredAt: new Date("2026-09-30"), // Hingga: 30.09.2026
      stock: 12, // x12
    },
    {
      _id: "vc-006",
      code: "DISKON10RB",
      discountAmount: 10000, // Rp10RB
      minPurchase: 200000, // Min. Blj Rp200RB
      expiredAt: new Date("2026-10-15"), // Hingga: 15.10.2026
      stock: 8, // x8
    },
  ];

  const dataStoreInfo = {
    data: storeDataBySlug,
    totalProducts: getAllProductsStore.totalProducts,
  };

  return (
    <div className="bg-[#F5F5F5] w-full min-h-screen flex flex-col gap-5 justify-start items-start border-b-4 border-b-[#EE4D2D] pb-10">
      {/* Awal Info Store */}
      <StoreInfo
        data={dataStoreInfo.data}
        totalProducts={dataStoreInfo.totalProducts}
      />

      {/* Akhir Info Store */}

      {/* Awal Voucher */}
      <StoreVoucher vouchers={dummyVouchers} />
      {/* Akhir Voucher */}

      {/* Awal Mungkin Kamu Suka */}
      <StoreProdukSectionByType
        storeId={storeDataBySlug._id}
        type="mungkinKamuSuka"
      />
      {/* Akhir Mungkin Kamu Suka */}

      {/* Awal Banner */}
      {/* Awal Banner Slide */}
      <StoreBannerSlide />
      {/* Akhir Banner Slide */}

      {/* Awal Banner Statis */}
      <StoreBannerStatis />
      {/* Akhir Banner Statis */}
      {/* Akhir Banner */}

      {/* Awal Produk Terlaris */}
      <StoreProdukSectionByType storeId={storeDataBySlug._id} type="terlaris" />
      {/* Akhir Produk Terlaris */}

      {/* Awal Kategori dan List Semua Produk */}
      <StoreAllProducts
        data={getAllProductsStore}
        slug={slug}
        sort={sortOption}
      />
      {/* Akhir Kategori dan List Semua Produk */}
    </div>
  );
}

// {
//   _id: '6a8000000000000000000001',
//   userId: '6a572ab6e15a597dfea5bcbc',
//   name: 'Haerin Jersey Collection',
//   slug: 'haerin-jersey-collection',
//   image: 'https://i.pinimg.com/474x/19/eb/32/19eb32ead6d19cf5f54f7e7b48c1a56f.jpg',
//   phone: '081234567890',
//   city: 'Seoul',
//   description: 'Toko jersey bola original untuk klub dan timnas favoritmu',
//   createdAt: 2026-08-02T06:35:24.213Z,
//   updatedAt: 2026-08-02T06:35:24.213Z,
//   lastLogin: 2026-08-02T06:35:24.213Z,
//   deletedAt: null
// } store my gweh

// {
//   products: [
//     {
//       _id: '6a6ee56e0798c70ca1aa8400',
//       name: 'Jersey Timnas Indonesia Home 2026',
//       slug: 'jersey-timnas-indonesia-home-2026',
//       images: [Array],
//       price: 349000,
//       discountPercent: 30,
//       sold: 8700
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa8401',
//       name: 'Jersey Argentina Home 2026',
//       slug: 'jersey-argentina-home-2026',
//       images: [Array],
//       price: 285000,
//       discountPercent: 29,
//       sold: 2700
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa83fc',
//       name: 'Jersey Real Madrid Home 25/26',
//       slug: 'jersey-real-madrid-home-25-26',
//       images: [Array],
//       price: 315000,
//       discountPercent: 30,
//       sold: 2400
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa83fb',
//       name: 'Jersey Manchester United Home 25/26',
//       slug: 'jersey-manchester-united-home-25-26',
//       images: [Array],
//       price: 299000,
//       discountPercent: 29,
//       sold: 1900
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa83fd',
//       name: 'Jersey Barcelona Away 25/26',
//       slug: 'jersey-barcelona-away-25-26',
//       images: [Array],
//       price: 289000,
//       discountPercent: 28,
//       sold: 1600
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa8402',
//       name: 'Jersey Brazil Away 2026',
//       slug: 'jersey-brazil-away-2026',
//       images: [Array],
//       price: 279000,
//       sold: 1400
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa8403',
//       name: 'Jersey Manchester City Home 25/26',
//       slug: 'jersey-manchester-city-home-25-26',
//       images: [Array],
//       price: 295000,
//       discountPercent: 28,
//       sold: 1150
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa83ff',
//       name: 'Jersey Arsenal Third 25/26',
//       slug: 'jersey-arsenal-third-25-26',
//       images: [Array],
//       price: 275000,
//       sold: 890
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa8404',
//       name: 'Jersey Inter Milan Home 25/26',
//       slug: 'jersey-inter-milan-home-25-26',
//       images: [Array],
//       price: 269000,
//       discountPercent: 28,
//       sold: 641
//     },
//     {
//       _id: '6a6ee56e0798c70ca1aa83fe',
//       name: 'Jersey Liverpool FC Away Authentic 25/26',
//       slug: 'jersey-liverpool-fc-away-authentic-25-26',
//       images: [Array],
//       price: 1190000,
//       discountPercent: 18,
//       sold: 210
//     }
//   ],
//   totalProducts: 10,
//   page: 1,
//   totalPages: 1
// } Store Product
