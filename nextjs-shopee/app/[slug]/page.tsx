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
  console.log(product, "product");

  const store = await getStoreById(product.storeId);

  if (!store) {
    notFound();
  }

  const breadCrumbsCategory = await getBreadCrumb(product.categoryId);
  console.log(breadCrumbsCategory, "breadCrumbsCa");

  return (
    <div className="bg-[#F5F5F5] w-full h-fit flex flex-col gap-2 px-20 py-4 border-b-4 border-[#EE4D2D]">
      {/* Awal Kategori */}
      <BreadCrumbsCategory category={breadCrumbsCategory} />
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
