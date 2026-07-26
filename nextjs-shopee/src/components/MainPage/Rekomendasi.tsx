import ProdukRekomendasi from "./ProdukRekomendasi";

export default function Rekomendasi() {
  return (
    <div className="bg-white w-full flex flex-col justify-between items-start gap-2 rounded-t-lg">
      {/* Awal Judul Rekomendasi */}
      <h1 className=" w-full p-4 flex justify-center items-center font-semibold text-[#EE4D2D] text-lg border-b-4 border-[#EE4D2D]">
        REKOMENDASI
      </h1>
      {/* Akhir Judul Rekomendasi */}

      {/* Awal Mapping Produk Rekomendasi */}
      <ProdukRekomendasi />
      {/* Akhir Mapping Produk Rekomendasi */}
    </div>
  );
}
