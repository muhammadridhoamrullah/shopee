interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function StoreDetail({ params }: Props) {
  const { slug } = await params;
  return (
    <div className="bg-pink-700 w-full min-h-screen flex flex-col gap-2 justify-start items-start">
      {/* Awal Info Store */}
      {/* Akhir Info Store */}

      {/* Awal Voucher */}
      {/* Akhir Voucher */}

      {/* Awal Mungkin Kamu Suka */}
      {/* Akhir Mungkin Kamu Suka */}

      {/* Awal Banner */}
      {/* Akhir Banner */}

      {/* Awal Produk Terlaris */}
      {/* Akhir Produk Terlaris */}

      {/* Awal Kategori dan List Semua Produk */}
      {/* Akhir Kategori dan List Semua Produk */}
    </div>
  );
}
