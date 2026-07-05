import Link from "next/link";

export default function Footer() {
  const layananPelangganMenu = [
    { name: "Bantuan", link: "/help" },
    { name: "Metode Pembayaran", link: "/payment-methods" },
    { name: "Shopeepay", link: "/shopeepay" },
    { name: "Koin Shopee", link: "/shopee-coins" },
    { name: "Lacak Pesanan Pembeli", link: "/track-order" },
    { name: "Lacak Pengiriman Penjual", link: "/track-shipment" },
    { name: "Gratis Ongkir", link: "/free-shipping" },
    { name: "Pengembalian Barang & Dana", link: "/returns-refunds" },
    { name: "Garansi Shopee", link: "/warranty" },
    { name: "XTRA Aman", link: "/xtra-aman" },
    { name: "Hubungi Kami", link: "/contact-us" },
  ];

  const jelajahiShopeeMenu = [
    { name: "Tentang Kami", link: "/about-us" },
    { name: "Karir", link: "/careers" },
    { name: "Kebijakan", link: "/policies" },
    { name: "Kebijakan Privasi Shopee", link: "/privacy-policy" },
    { name: "Blog", link: "/blog" },
    { name: "Shopee Mall", link: "/shopee-mall" },
    { name: "Seller Centre", link: "/seller-centre" },
    { name: "Flash Sale", link: "/flash-sale" },
    { name: "Kontak Media", link: "/contact-media" },
    { name: "Shopee Affiliate", link: "/shopee-affiliate" },
  ];

  return (
    <div className="bg-white w-full h-40 px-20 flex justify-between items-start gap-1 text-xs py-10">
      {/* Awal Layanan Pelanggan */}
      <div className="w-full h-fit flex flex-col gap-4">
        {/* Awal Text Layanan Pelanggan */}
        <p className="font-semibold">Layanan Pelanggan</p>
        {/* Akhir Text Layanan Pelanggan */}

        {/* Awal List Layanan Pelanggan */}
        <div className="w-full h-fit flex flex-col gap-3 text-gray-600">
          {layananPelangganMenu.map((item, index) => (
            <Link key={index} href={`${item.link}`}>
              {item.name}
            </Link>
          ))}
        </div>
        {/* Akhir List Layanan Pelanggan */}
      </div>
      {/* Akhir Layanan Pelanggan */}

      {/* Awal Jelajahi Shopee */}
      <div className="w-full h-fit flex flex-col gap-4">
        {/* Awal Text Jelajahi Shopee */}
        <p className="font-semibold">Jelajahi Shopee</p>
        {/* Akhir Text Jelajahi Shopee */}

        {/* Awal List Jelajahi Shopee */}
        <div className="w-full h-fit flex flex-col gap-3 text-gray-600">
          {jelajahiShopeeMenu.map((item, index) => (
            <Link key={index} href={`${item.link}`}>
              {item.name}
            </Link>
          ))}
        </div>
        {/* Akhir List Jelajahi Shopee */}
      </div>
      {/* Akhir Jelajahi Shopee */}

      {/* Awal Pembayaran */}
      <div className="bg-green-400 w-full h-fit">Pembayaran</div>
      {/* Akhir Pembayaran */}

      {/* Awal Ikuti Kami */}
      <div className="bg-yellow-400 w-full h-fit">Ikuti Kami</div>
      {/* Akhir Ikuti Kami */}

      {/* Awal Download Aplikais Shopee */}
      <div className="bg-purple-400 w-full h-fit">Download Aplikais Shopee</div>
      {/* Akhir Download Aplikais Shopee */}
    </div>
  );
}
