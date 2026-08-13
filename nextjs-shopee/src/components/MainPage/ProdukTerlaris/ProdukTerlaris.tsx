import SectionHeader from "../Section/SectionHeader";
import ProdukCarousel from "../Section/ProdukCarousel";
import { getProductTerlarisPreview } from "@/src/models/product/product";
import CardProduKTerlaris from "./CardProdukTerlaris";

export default async function ProdukTerlaris() {
  const produkTerlaris = await getProductTerlarisPreview();
  console.log(produkTerlaris, "Produk Terlaris Gweh");

  return (
    <div className="bg-white w-full h-75 flex flex-col justify-between items-start">
      {/* Awal Section Header */}
      <SectionHeader title="PRODUK TERLARIS" link="produk-terlaris" />
      {/* Akhir Section Header */}

      {/* Awal Mapping Produk Flash Sale */}
      <ProdukCarousel>
        {produkTerlaris.map((item) => (
          <CardProduKTerlaris key={item._id} produk={item} />
        ))}
      </ProdukCarousel>
      {/* Akhir Mapping Produk Flash Sale */}
    </div>
  );
}
