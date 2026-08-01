import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/src/store/StoreProvider";
import ToastProvider from "@/src/components/ToastProvider";
import ScrollToTopButton from "@/src/components/ScrollToTopButton";
import NextTopLoader from "nextjs-toploader";
import Footer from "@/src/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001",
  ),
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
        url: "/shopee2.png",
        width: 800,
        height: 600,
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
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />
        <StoreProvider>
          <NextTopLoader
            color={"#EE4D2D"}
            height={3}
            showSpinner={false}
            crawlSpeed={200}
            speed={200}
          />
          {children}
          <Footer />
          <ToastProvider />
          <ScrollToTopButton />
        </StoreProvider>
      </body>
    </html>
  );
}
