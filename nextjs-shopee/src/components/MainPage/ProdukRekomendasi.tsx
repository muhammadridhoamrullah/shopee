import { dummyProducts } from "@/src/helpers/utils";
import CardProductRekomendasi from "./CardProductRekomendasi";

export default function ProdukRekomendasi() {
  return (
    <div className="bg-[#F5F5F5] w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {dummyProducts.map((product, index) => (
        <CardProductRekomendasi key={product.slug} product={product} />
      ))}
    </div>
  );
}
