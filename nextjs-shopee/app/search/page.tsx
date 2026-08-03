import TokoDanProdukSearch from "@/src/components/Search/TokoDanProdukSearch";
import { getSearchProducts } from "@/src/models/product/product";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<{ keyword?: string; page?: string }>;
}

export async function generateMetadata({
  searchParams,
}: Omit<Props, "children">): Promise<Metadata> {
  const { keyword } = (await searchParams) ?? { keyword: undefined };
  if (!keyword) {
    return {
      title: "Hasil Pencarian | Shopee Indonesia",
      description: "Hasil pencarian produk di Shopee Indonesia.",
    };
  }

  const description = `Hasil pencarian produk dengan kata kunci "${keyword}" di Shopee Indonesia.`;

  return {
    title: `Jual "${keyword}" Harga Terbaik & Termurah | Shopee Indonesia`,
    description,
    openGraph: {
      title: `Jual "${keyword}" Harga Terbaik & Termurah | Shopee Indonesia`,
      description,
      images: [
        {
          url: "/shopee2.png",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { keyword, page } = await searchParams;

  if (!keyword) {
    return (
      <div className="text-[#EE4D2D] text-lg font-semibold text-center">
        Masukkan keyword di kolom pencarian.
      </div>
    );
  }

  const currentPage = Number(page) || 1;

  const resultSearch = await getSearchProducts(keyword, currentPage);
  console.log(resultSearch, "resultSearch");

  return (
    <div className="bg-[#F5F5F5] w-full h-fit px-20 py-4 flex justify-between items-start gap-4 border-b-4 border-[#EE4D2D] text-sm">
      {/* Awal Filter Kiri */}
      <div className="bg-pink-400 w-60 h-full ">Filter</div>
      {/* Akhir Filter Kiri */}

      {/* Awal Toko Yang Terkait dan Produk */}
      <TokoDanProdukSearch />
      {/* Akhir Toko Yang Terkait dan Produk */}
    </div>
  );
}

// {
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
//     }
//   ],
//   totalProducts: 2,
//   page: 1,
//   totalPages: 1
// } resultSearch
