import VerifyEmailClient from "@/app/(non-auth)/verify-email/VerifyEmailClient";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify Email - Shopee Indonesia | Belanja Terlengkap & Terpercaya",
  description:
    "Verifikasi email Anda untuk mengaktifkan akun Shopee Anda dan menikmati pengalaman belanja online yang mudah dan aman. Dapatkan akses ke berbagai produk dari berbagai kategori, mulai dari fashion, elektronik, hingga kebutuhan rumah tangga.",
  openGraph: {
    title: "Verify Email - Shopee Indonesia | Belanja Terlengkap & Terpercaya",
    description:
      "Verifikasi email Anda untuk mengaktifkan akun Shopee Anda dan menikmati pengalaman belanja online yang mudah dan aman. Dapatkan akses ke berbagai produk dari berbagai kategori, mulai dari fashion, elektronik, hingga kebutuhan rumah tangga.",
    images: [
      {
        url: "/shopee4.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailClient />
    </Suspense>
  );
}
