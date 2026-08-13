import Link from "next/link";
import ProdukRekomendasi from "./ProdukRekomendasi";

export default function Rekomendasi() {
  return (
    <div className="w-full flex flex-col justify-between items-start gap-2 rounded-t-lg">
      {/* Awal Judul Rekomendasi */}
      <h1 className=" w-full p-4 flex justify-center items-center font-semibold text-[#EE4D2D] text-lg border-b-4 border-[#EE4D2D]">
        REKOMENDASI
      </h1>
      {/* Akhir Judul Rekomendasi */}

      {/* Awal Mapping Produk Rekomendasi */}
      <ProdukRekomendasi />
      {/* Akhir Mapping Produk Rekomendasi */}

      {/* Awal Lihat Lainnya */}
      <div className="w-full h-fit flex justify-center items-center mt-5 ">
        <Link
          href={"/rekomendasi"}
          className="bg-[#EE4D2D] px-20 py-2 text-sm text-white font-semibold rounded-lg hover:bg-[#d13f1e] transition-colors duration-300 ease-in-out"
        >
          Lihat Lainnya
        </Link>
      </div>
      {/* Akhir Lihat Lainnya */}
    </div>
  );
}
