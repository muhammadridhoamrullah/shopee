import TambahKeranjang from "@/src/components/DetailPage/TambahKeranjang";
import { formatRupiah } from "@/src/helpers/utils";
import { getProductBySlug } from "@/src/models/product/product";
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

  const data = {
    productId: product._id,
    quantity: 1,
  };

  return (
    <div className="bg-pink-400 w-full min-h-screen flex flex-col gap-3">
      <div className="bg-green-500 px-20">Produk {product.name}</div>
      <span className="bg-red-400 px-20">{formatRupiah(product.price)}</span>

      <TambahKeranjang data={data} />
    </div>
  );
}

// {
//   _id: '6a670a23a1bf20f75eced6aa',
//   name: 'Parfum Zara Man Vibrant Leather',
//   slug: 'parfum-zara-man-vibrant-leather',
//   image: 'https://picsum.photos/400/400?random=26',
//   price: 165000,
//   sold: 6700,
//   createdAt: 2026-07-27T07:34:56.905Z,
//   updatedAt: 2026-07-27T07:34:56.905Z
// } product
