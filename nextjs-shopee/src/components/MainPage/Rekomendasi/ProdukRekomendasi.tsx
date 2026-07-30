import CardProductRekomendasi from "./CardProdukRekomendasi";
import { getAllProducts } from "@/src/models/product/product";
import { ProdukResponse } from "@/src/type/produk";

export default async function ProdukRekomendasi() {
  const allProducts: ProdukResponse[] = await getAllProducts();

  return (
    <div className="bg-[#F5F5F5] w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {allProducts.map((product) => (
        <CardProductRekomendasi key={product.slug} product={product} />
      ))}
    </div>
  );
}
