import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/src/store/StoreProvider";
import ToastProvider from "@/src/components/ToastProvider";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopee Indonesia | Belanja Terlengkap & Terpercaya",
  description:
    "Shopee Indonesia adalah platform belanja online yang menawarkan berbagai produk dari berbagai kategori, mulai dari fashion, elektronik, hingga kebutuhan rumah tangga. Dengan pengalaman belanja yang mudah dan aman, Shopee Indonesia menjadi pilihan utama bagi para konsumen untuk memenuhi kebutuhan sehari-hari mereka.",
  icons: {
    icon: "/shopee4.png",
  },
  openGraph: {
    title: "Shopee Indonesia | Belanja Terlengkap & Terpercaya",
    description:
      "Shopee Indonesia adalah platform belanja online yang menawarkan berbagai produk dari berbagai kategori, mulai dari fashion, elektronik, hingga kebutuhan rumah tangga. Dengan pengalaman belanja yang mudah dan aman, Shopee Indonesia menjadi pilihan utama bagi para konsumen untuk memenuhi kebutuhan sehari-hari mereka.",
    images: [
      {
        url: "/shopee4.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <NextTopLoader
            color={"#EE4D2D"}
            height={3}
            showSpinner={false}
            crawlSpeed={200}
            speed={200}
          />
          {children}
          <ToastProvider />
        </StoreProvider>
      </body>
    </html>
  );
}
