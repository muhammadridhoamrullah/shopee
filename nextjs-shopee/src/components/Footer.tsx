import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { BsQrCode } from "react-icons/bs";

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

  const pembayaranMenu = [
    { name: "Alfamart", img: "/images/payment/alfamart.png" },
    { name: "BCA", img: "/images/payment/bca.png" },
    { name: "BNI", img: "/images/payment/bni.png" },
    { name: "BRI", img: "/images/payment/bri.png" },
    { name: "BSI", img: "/images/payment/bsi.png" },
    { name: "CIMB Niaga", img: "/images/payment/cimb-niaga.png" },
    { name: "Indomaret", img: "/images/payment/indomaret.png" },
    { name: "Mandiri", img: "/images/payment/mandiri.png" },
    { name: "Mastercard", img: "/images/payment/mastercard.png" },
    { name: "Seabank", img: "/images/payment/seabank.png" },
    { name: "Shopeepay", img: "/images/payment/shopeepay.png" },
    { name: "Visa", img: "/images/payment/visa.png" },
  ];

  const pengirimanMenu = [
    { name: "Anteraja", img: "/images/shipping/anteraja.png" },
    { name: "Gosend", img: "/images/shipping/gosend.png" },
    { name: "Grab Express", img: "/images/shipping/grab-express.png" },
    { name: "JNE", img: "/images/shipping/jne.png" },
    { name: "JNT", img: "/images/shipping/jnt.png" },
    { name: "Ninja Express", img: "/images/shipping/ninja-express.png" },
    { name: "Sicepat", img: "/images/shipping/sicepat.png" },
    { name: "SPX", img: "/images/shipping/spx.png" },
  ];

  const ikutiKamiMenu = [
    {
      name: "Facebook",
      icon: <FaFacebook />,
      link: "https://www.facebook.com/ShopeeID",
    },
    {
      name: "Instagram",
      icon: <AiFillInstagram />,
      link: "https://www.instagram.com/shopee_id/",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      link: "https://twitter.com/ShopeeID",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/company/shopee/",
    },
    {
      name: "Shopee University",
      icon: <FaGraduationCap />,
      link: "https://university.shopee.co.id/",
    },
  ];

  const downloadAplikasiShopeeMenu = [
    {
      name: "App Store",
      icon: <FaApple />,
      link: "https://www.apple.com/app-store/",
    },
    {
      name: "Google Play",
      icon: <FaGooglePlay />,
      link: "https://play.google.com/store",
    },
    {
      name: "App Gallery",
      icon: <HiMiniComputerDesktop />,
      link: "https://www.shopee.co.id/",
    },
  ];

  return (
    <div className="bg-[#eeecec] w-full h-fit px-20 flex justify-between items-start gap-1 text-xs py-10">
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

      {/* Awal Pembayaran dan Pengiriman */}
      <div className=" w-full h-fit flex flex-col gap-4">
        {/* Awal Pembayaran */}
        <div className=" w-full h-fit flex flex-col gap-4">
          {/* Awal Text Pembayaran */}
          <p className="font-semibold">Pembayaran</p>
          {/* Akhir Text Pembayaran */}

          {/* Awal List Pembayaran */}
          <div className="w-full h-fit flex flex-wrap justify-start items-center gap-2">
            {pembayaranMenu.map((item, index) => (
              <div
                key={index}
                className=" w-18 h-10 flex justify-center items-center border border-gray-300 rounded-md"
              >
                {/* <img src={item.img} alt={item.name} className="w-full h-full object-contain" /> */}
                <p>{item.name}</p>
              </div>
            ))}
          </div>

          {/* Akhir List Pembayaran */}
        </div>
        {/* Akhir Pembayaran */}

        {/* Awal Pengiriman */}
        <div className=" w-full h-fit flex flex-col gap-4">
          {/* Awal Text Pengiriman */}
          <p className="font-semibold">Pengiriman</p>
          {/* Akhir Text Pengiriman */}

          {/* Awal List Pengiriman */}
          <div className=" w-full h-fit flex flex-wrap justify-start items-center gap-2">
            {pengirimanMenu.map((item, index) => (
              <div
                key={index}
                className=" w-18 h-10 flex justify-center items-center border border-gray-300 rounded-md"
              >
                {/* <img src={item.img} alt={item.name} className="w-full h-full object-contain" /> */}
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          {/* Akhir List Pengiriman */}
        </div>
        {/* Akhir Pengiriman */}
      </div>
      {/* Akhir Pembayaran dan Pengiriman */}

      {/* Awal Ikuti Kami dan Keamanan */}
      <div className="w-full h-fit flex flex-col gap-4">
        {/* Awal Ikuti Kami */}
        <div className="w-full h-fit flex flex-col gap-4">
          {/* Awal Text Ikuti Kami */}
          <p className="font-semibold">Ikuti Kami</p>
          {/* Akhir Text Ikuti Kami */}

          {/* Awal List Ikuti Kami */}
          <div className="w-full h-fit flex flex-col gap-2">
            {ikutiKamiMenu.map((item, index) => (
              <Link
                className="w-full h-fit flex justify-start items-center gap-1 text-gray-600 hover:text-[#EE4D2D]"
                key={index}
                href={`${item.link} `}
              >
                {/* Awal Icon */}
                <div className="w-6 h-6 flex justify-start items-center text-lg">
                  {item.icon}
                </div>
                {/* Akhir Icon */}
                {/* Awal Text */}
                <p>{item.name}</p>
                {/* Akhir Text */}
              </Link>
            ))}
          </div>
          {/* Akhir List Ikuti Kami */}
        </div>
        {/* Akhir Ikuti Kami */}

        {/* Awal Keamanan */}
        <div className=" w-full h-fit flex flex-col gap-4">
          {/* Awal Text Keamanan */}
          <p className="font-semibold">Keamanan</p>
          {/* Akhir Text Keamanan */}

          {/* Awal List Keamanan */}
          <div className="w-full h-fit flex justify-start items-center gap-1 text-gray-600">
            {/* Awal Logo */}
            <div className="w-6 h-6 flex justify-start items-center text-lg">
              <MdOutlineSecurity />
            </div>
            {/* Akhir Logo */}

            {/* Awal Text Keamanan */}
            <p className="text-gray-600">Keamanan berbelanja di Shopee</p>
            {/* Akhir Text Keamanan */}
          </div>
          {/* Akhir List Keamanan */}
        </div>
        {/* Akhir Keamanan */}
      </div>
      {/* Akhir Ikuti Kami dan Keamanan */}

      {/* Awal Download Aplikasi Shopee */}
      <div className=" w-full h-fit flex flex-col gap-4">
        {/* Awal Text Download Aplikasi Shopee */}
        <p className="font-semibold">Download Aplikasi Shopee</p>
        {/* Akhir Text Download Aplikasi Shopee */}

        {/* Awal List Download Aplikasi Shopee */}
        <div className=" w-full h-25 flex justify-between items-center gap-2">
          {/* Awal QRIS */}
          <div className="bg-white rounded-md w-full h-full flex justify-center items-center relative">
            <BsQrCode className="absolute w-full h-full  py-2" />
          </div>
          {/* Akhir QRIS */}

          {/* Awal List App Store, Google Play, Desktop */}
          <div className=" w-full h-full flex flex-col justify-between items-start">
            {downloadAplikasiShopeeMenu.map((item, index) => (
              <Link
                href={`${item.link}`}
                key={index}
                className="w-full h-fit px-2 py-1 flex justify-start items-center gap-2 bg-white text-gray-600 hover:bg-[#F5F5F5] rounded-md"
              >
                {/* Awal Icon */}
                {item.icon}
                {/* Akhir Icon */}

                {/* Awal Text */}
                <p>{item.name}</p>
                {/* Akhir Text */}
              </Link>
            ))}
          </div>
          {/* Akhir List App Store, Google Play, Desktop */}
        </div>
        {/* Akhir List Download Aplikasi Shopee */}
      </div>
      {/* Akhir Download Aplikasi Shopee */}
    </div>
  );
}
