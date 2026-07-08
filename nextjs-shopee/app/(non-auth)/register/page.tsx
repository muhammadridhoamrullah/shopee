import RegisterClient from "@/app/(non-auth)/register/RegisterClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Shopee Indonesia | Belanja Terlengkap & Terpercaya",
  description:
    "Daftar akun Shopee Anda untuk menikmati pengalaman belanja online yang mudah dan aman. Dapatkan akses ke berbagai produk dari berbagai kategori, mulai dari fashion, elektronik, hingga kebutuhan rumah tangga.",
  openGraph: {
    title: "Register - Shopee Indonesia | Belanja Terlengkap & Terpercaya",
    description:
      "Daftar akun Shopee Anda untuk menikmati pengalaman belanja online yang mudah dan aman. Dapatkan akses ke berbagai produk dari berbagai kategori, mulai dari fashion, elektronik, hingga kebutuhan rumah tangga.",
    images: [
      {
        url: "/shopee4.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Register() {
  return <RegisterClient />;
}
