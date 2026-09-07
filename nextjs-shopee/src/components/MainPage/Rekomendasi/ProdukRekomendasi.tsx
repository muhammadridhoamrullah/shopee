import CardProdukUtama from "../../CardProduk/CardProdukUtama";

import { getProductsForRecommendation } from "@/src/models/product/product";

export default async function ProdukRekomendasi() {
  const allProducts = await getProductsForRecommendation(30);

  console.log(allProducts, "Rekomendasi - allProducts");

  return (
    <div className="bg-[#F5F5F5] w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {allProducts.map((el) => (
        <CardProdukUtama key={el._id} produk={el} />
      ))}
    </div>
  );
}

