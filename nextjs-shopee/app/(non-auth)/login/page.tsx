import LoginClient from "@/app/(non-auth)/login/LoginClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Shopee Indonesia | Belanja Terlengkap & Terpercaya",
  description:
    "Masuk ke akun Shopee Anda untuk menikmati pengalaman belanja online yang mudah dan aman. Dapatkan akses ke berbagai produk dari berbagai kategori, mulai dari fashion, elektronik, hingga kebutuhan rumah tangga.",
  openGraph: {
    title: "Login - Shopee Indonesia | Belanja Terlengkap & Terpercaya",
    description:
      "Masuk ke akun Shopee Anda untuk menikmati pengalaman belanja online yang mudah dan aman. Dapatkan akses ke berbagai produk dari berbagai kategori, mulai dari fashion, elektronik, hingga kebutuhan rumah tangga.",
    images: [
      {
        url: "/shopee4.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function Login() {
  return <LoginClient />;
}
