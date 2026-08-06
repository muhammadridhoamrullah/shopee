import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoStorefrontOutline } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { MdOutlineStarOutline } from "react-icons/md";
import { LuUserRoundCheck } from "react-icons/lu";
import StoreMenuBar from "@/src/components/Store/StoreMenuBar";
import StoreVoucher from "@/src/components/Store/StoreVoucher";
import StoreMungkinKamuSuka from "@/src/components/Store/StoreMungkinKamuSuka";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function StoreDetail({ params }: Props) {
  const { slug } = await params;
  const storeId = "6a8000000000000000000001";

  const menuBar = [
    { name: "Halaman Utama", section: "" },
    { name: "Produk", section: "#products" },
    { name: "Kaos", section: "#kaos" },
    { name: "Jersey", section: "#jersey" },
    { name: "Sepatu", section: "#sepatu" },
    { name: "Aksesoris", section: "#aksesoris" },
  ];

  const dummyVouchers = [
    {
      _id: "vc-001",
      code: "DISKON1RB",
      discountAmount: 1000, // Rp1RB
      minPurchase: 50000, // Min. Blj Rp50RB
      expiredAt: new Date("2026-09-16"), // Hingga: 16.09.2026
      stock: 5, // x5
    },
    {
      _id: "vc-002",
      code: "DISKON5RB",
      discountAmount: 5000, // Rp5RB
      minPurchase: 100000, // Min. Blj Rp100RB
      expiredAt: new Date("2026-09-30"), // Hingga: 30.09.2026
      stock: 12, // x12
    },
    {
      _id: "vc-003",
      code: "DISKON10RB",
      discountAmount: 10000, // Rp10RB
      minPurchase: 200000, // Min. Blj Rp200RB
      expiredAt: new Date("2026-10-15"), // Hingga: 15.10.2026
      stock: 8, // x8
    },
    {
      _id: "vc-004",
      code: "DISKON1RB",
      discountAmount: 1000, // Rp1RB
      minPurchase: 50000, // Min. Blj Rp50RB
      expiredAt: new Date("2026-09-16"), // Hingga: 16.09.2026
      stock: 5, // x5
    },
    {
      _id: "vc-005",
      code: "DISKON5RB",
      discountAmount: 5000, // Rp5RB
      minPurchase: 100000, // Min. Blj Rp100RB
      expiredAt: new Date("2026-09-30"), // Hingga: 30.09.2026
      stock: 12, // x12
    },
    {
      _id: "vc-006",
      code: "DISKON10RB",
      discountAmount: 10000, // Rp10RB
      minPurchase: 200000, // Min. Blj Rp200RB
      expiredAt: new Date("2026-10-15"), // Hingga: 15.10.2026
      stock: 8, // x8
    },
  ];

  return (
    <div className="bg-[#F5F5F5] w-full min-h-screen flex flex-col gap-5 justify-start items-start">
      {/* Awal Info Store */}
      <div className="bg-white w-full h-60 px-20 flex flex-col justify-between items-start shadow-md">
        {/* Awal Info Store */}
        <div className=" flex-1 w-full flex justify-between items-center gap-2">
          {/* Awal Foto Store */}
          <div className=" w-90 h-full flex justify-center items-center px-4 py-6 ">
            {/* Awal Bingkai Foto Store */}
            <div className="bg-white w-full h-full rounded-md relative overflow-hidden">
              <Image
                src={"/images/store/background.jpg"}
                alt="Background Store"
                fill
                className="object-cover blur-[3px] z-0"
              />

              <div className="relative z-10 w-full h-full px-3 py-2 flex flex-col justify-center items-center gap-1">
                {/* Awal Foto dan Nama Store */}
                <div className=" w-full h-full flex justify-between items-center gap-2">
                  {/* Awal Round Foto */}
                  <Image
                    src={"/shopee3.png"}
                    alt="Foto Profil"
                    width={100}
                    height={100}
                    className="rounded-full w-20 h-20 object-cover"
                  />
                  {/* Akhir Round Foto */}

                  {/* Awal Nama Store */}
                  <div className=" flex-1 h-full pt-2 flex flex-col gap-0.5 justify-start items-start">
                    {/* Awal Nama Store */}
                    <h1 className="font-semibold line-clamp-2 text-white">
                      Haerin Jersey Collection
                    </h1>
                    {/* Akhir Nama Store */}

                    {/* Awal Online Terakhir */}
                    <p className="text-xs text-gray-300">
                      Aktif 1 jam yang lalu
                    </p>
                    {/* Akhir Online Terakhir */}
                  </div>
                  {/* Akhir Nama Store */}
                </div>
                {/* Akhir Foto dan Nama Store */}

                {/* Awal Tombol Ikuti dan Chat */}
                <div className=" w-full h-fit flex justify-between items-center gap-2 text-xs text-white">
                  {/* Awal Tombol Ikuti */}
                  <button className="border border-white w-full h-fit p-1 flex justify-center items-center gap-1 cursor-pointer">
                    {/* Awal Icon Ikuti */}
                    <FiPlus className="w-4 h-4 " />
                    {/* Akhir Icon Ikuti */}

                    {/* Awal Text Ikuti */}
                    <span>Ikuti</span>
                    {/* Akhir Text Ikuti */}
                  </button>

                  {/* Akhir Tombol Ikuti */}

                  {/* Awal Tombol Chat */}
                  <button className="border border-white w-full h-fit p-1 flex justify-center items-center gap-1 cursor-pointer">
                    {/* Awal Icon Chat */}
                    <IoChatboxEllipsesOutline className="w-4 h-4" />
                    {/* Akhir Icon Chat */}
                    {/* Awal Text Chat */}
                    <span>Chat</span>
                    {/* Akhir Text Chat */}
                  </button>
                  {/* Akhir Tombol Chat */}
                </div>
                {/* Akhir Tombol Ikuti dan Chat */}
              </div>
            </div>
            {/* Akhir Bingkai Foto Store */}
          </div>
          {/* Akhir Foto Store */}

          {/* Awal Info-Info Store */}
          <div className=" flex-1 h-full px-4 py-6 flex justify-between items-center text-sm">
            {/* Awal Produk, Mengikuti, Performa */}
            <div className="flex-1 h-full flex flex-col justify-between items-start">
              {/* Awal Produk */}
              <div className="flex items-center gap-2">
                {/* Awal Icon Produk */}
                <IoStorefrontOutline className="w-4 h-4" />
                {/* Akhir Icon Produk */}

                {/* Awal Text Produk */}
                <span>
                  Produk: <span className="text-[#EE4D2D]">30</span>
                </span>
                {/* Akhir Text Produk */}
              </div>
              {/* Akhir Produk */}

              {/* Awal Mengikuti */}
              <div className="flex items-center gap-2">
                {/* Awal Icon Mengikuti */}
                <FiUserPlus className="w-4 h-4" />
                {/* Akhir Icon Mengikuti */}
                {/* Awal Text Mengikuti */}
                <span>
                  Mengikuti: <span className="text-[#EE4D2D]">30</span>
                </span>
                {/* Akhir Text Mengikuti */}
              </div>
              {/* Akhir Mengikuti */}

              {/* Awal Performa */}
              <div className="flex items-center gap-2">
                {/* Awal Icon Performa */}
                <IoChatboxEllipsesOutline className="w-4 h-4" />
                {/* Akhir Icon Performa */}

                {/* Awal Text Performa */}
                <span>
                  Performa Chat:{" "}
                  <span className="text-[#EE4D2D]">30% (Hitungan Menit)</span>
                </span>
                {/* Akhir Text Performa */}
              </div>
              {/* Akhir Performa */}
            </div>
            {/* Akhir Produk, Mengikuti, Performa */}

            {/* Awal Pengikut, Penilaian, Bergabung */}
            <div className=" flex-1 h-full flex flex-col justify-between items-start">
              {/* Awal Pengikut */}
              <div className="flex items-center gap-2">
                {/* Awal Icon Pengikut */}
                <LuUsers className="w-4 h-4" />
                {/* Akhir Icon Pengikut */}

                {/* Awal Text Pengikut */}
                <span>
                  Pengikut: <span className="text-[#EE4D2D]">30</span>
                </span>
                {/* Akhir Text Pengikut */}
              </div>
              {/* Akhir Pengikut */}

              {/* Awal Penilaian */}
              <div className="flex items-center gap-2">
                {/* Awal Icon Penilaian */}
                <MdOutlineStarOutline className="w-4 h-4" />
                {/* Akhir Icon Penilaian */}

                {/* Awal Text Penilaian */}
                <span>
                  Penilaian:{" "}
                  <span className="text-[#EE4D2D]">4.6 (531 Penilaian)</span>
                </span>
                {/* Akhir Text Penilaian */}
              </div>
              {/* Akhir Penilaian */}

              {/* Awal Bergabung */}
              <div className="flex items-center gap-2">
                {/* Awal Icon Bergabung */}
                <LuUserRoundCheck className="w-4 h-4" />
                {/* Akhir Icon Bergabung */}

                {/* Awal Text Bergabung */}
                <span>
                  Bergabung:{" "}
                  <span className="text-[#EE4D2D]">30 Bulan Lalu</span>
                </span>
                {/* Akhir Text Bergabung */}
              </div>
              {/* Akhir Bergabung */}
            </div>
            {/* Akhir Pengikut, Penilaian, Bergabung */}
          </div>
          {/* Akhir Info-Info Store */}
        </div>
        {/* Akhir Info Store */}

        {/* Awal Bar */}
        <StoreMenuBar menuBar={menuBar} />
        {/* Akhir Bar */}
      </div>
      {/* Akhir Info Store */}

      {/* Awal Voucher */}
      <StoreVoucher vouchers={dummyVouchers} />
      {/* Akhir Voucher */}

      {/* Awal Mungkin Kamu Suka */}
      <StoreMungkinKamuSuka storeId={storeId} />
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
