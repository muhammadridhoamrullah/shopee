import Footer from "../Footer";
import FlashSale from "./FlashSale/FlashSale";
import Kategori from "./Kategori/Kategori";
import ProdukTerlaris from "./ProdukTerlaris/ProdukTerlaris";
import Rekomendasi from "./Rekomendasi/Rekomendasi";

export default function KategoriToRekomendasi() {
  return (
    <div className="bg-[#F5F5F5] w-full h-full px-20 py-5 flex flex-col gap-5 justify-start items-start">
      {/* Awal Kategori */}
      <Kategori />
      {/* Akhir Kategori */}
      {/* Awal Flash Sale */}
      <FlashSale />
      {/* Akhir Flash Sale */}

      {/* Awal Produk Terlaris */}
      {/* <ProdukTerlaris /> */}
      {/* Akhir Produk Terlaris */}

      {/* Awal Rekomendasi */}
      <Rekomendasi />
      {/* Akhir Rekomendasi */}

      {/* Awal Footer */}
      {/* <Footer /> */}
      {/* Akhir Footer */}
    </div>
  );
}
