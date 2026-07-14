import Link from "next/link";

export default function NonAuthHeader() {
  return (
    <div className="w-full h-20 bg-white px-20 flex justify-between items-center">
      {/* Awal Logo Shopee */}
      <Link href="/" className="w-40 h-16 relative">
        <img
          src="/shopee1.png"
          alt="Logo Shopee"
          className="absolute w-full h-full object-contain"
        />
      </Link>
      {/* Akhir Logo Shopee */}

      {/* Awal Butuh Bantuan? */}
      <Link href={"/help"} className="text-[#EE4D2D] text-sm font-semibold">
        Butuh bantuan?
      </Link>
      {/* Akhir Butuh Bantuan? */}
    </div>
  );
}
