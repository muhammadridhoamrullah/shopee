import BreadCrumbsCategory from "@/src/components/DetailPage/BreadCrumbsCategory";
import CardDetailProduk from "@/src/components/DetailPage/CardDetailProduk";
import Store from "@/src/components/DetailPage/Store";
import { getBreadCrumb } from "@/src/models/category/category";
import { getProductBySlug } from "@/src/models/product/product";
import { getStoreById } from "@/src/models/store/store";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProdukDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }
  console.log(product, "productBySlug");

  const store = await getStoreById(product.storeId);

  if (!store) {
    notFound();
  }

  const breadCrumbsCategory = await getBreadCrumb(product.categoryId);

  return (
    <div className="bg-[#F5F5F5] w-full h-fit flex flex-col gap-2 px-20 py-4 border-b-4 border-[#EE4D2D]">
      {/* Awal Kategori */}
      <BreadCrumbsCategory
        category={breadCrumbsCategory}
        productName={product.name}
      />
      {/* Akhir Kategori */}

      {/* Awal Detail Produk */}
      <CardDetailProduk product={product} />
      {/* Akhir Detail Produk */}

      {/* Awal Toko Penjual */}
      <Store store={store} />
      {/* Akhir Toko Penjual */}

      {/* Awal Spesifikasi dan Deskripsi Produk */}
      <div className="bg-yellow-300 w-full">
        Spesifikasi dan Deskripsi Produk
      </div>
      {/* Akhir Spesifikasi dan Deskripsi Produk */}

      {/* Awal Penilaian Produk */}
      <div className="bg-purple-300 w-full">Penilaian Produk</div>
      {/* Akhir Penilaian Produk */}

      {/* Awal Produk Lain Dari Toko Ini */}
      <div className="bg-gray-300 w-full">Produk Lain Dari Toko Ini</div>
      {/* Akhir Produk Lain Dari Toko Ini */}

      {/* Awal Kamu Mungkin Juga Suka */}
      <div className="bg-gray-300 w-full">Kamu Mungkin Juga Suka</div>
      {/* Akhir Kamu Mungkin Juga Suka */}
    </div>
  );
}


// {
//   _id: '6a6ee56e0798c70ca1aa8400',
//   name: 'Jersey Timnas Indonesia Home 2026',
//   slug: 'jersey-timnas-indonesia-home-2026',
//   categoryId: '6a7000000000000000000003',
//   storeId: '6a8000000000000000000001',
//   images: [
//     'https://picsum.photos/600/600?random=6',
//     'https://picsum.photos/600/600?random=56',
//     'https://picsum.photos/600/600?random=106',
//     'https://picsum.photos/600/600?random=156',
//     'https://picsum.photos/600/600?random=206',
//     'https://picsum.photos/600/600?random=256'
//   ],
//   price: 349000,
//   originalPrice: 499000,
//   discountPercent: 30,
//   quantity: 200,
//   sold: 8700,
//   createdAt: 2026-08-02T06:36:28.104Z,
//   updatedAt: 2026-08-02T06:36:28.104Z,
//   flashSale: {
//     _id: '6a9676870e1423469cb678fb',
//     productId: '6a6ee56e0798c70ca1aa8400',
//     storeId: '6a8000000000000000000001',
//     flashPrice: 300000,
//     flashStock: 2,
//     flashSold: 0,
//     startTime: 2026-09-01T05:00:00.000Z,
//     endTime: 2026-09-01T08:00:00.000Z,
//     createdAt: 2026-09-01T06:53:59.007Z,
//     updatedAt: 2026-09-01T06:53:59.007Z
//   }
// } productBySlug