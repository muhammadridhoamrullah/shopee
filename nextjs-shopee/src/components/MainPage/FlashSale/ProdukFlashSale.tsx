"use client";

import { flashSaleLists, formatRupiah } from "@/src/helpers/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

export default function ProdukFlashSale() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollState();

    const el = scrollRef.current;
    if (!el) return;

    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-red-900 relative w-full flex-1">
      {/* Awal Tombol Scroll Kiri */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollByAmount("left")}
          aria-label="Geser ke kiri"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          <IoIosArrowDropleftCircle className="w-10 h-10 text-white" />
        </button>
      )}
      {/* Akhir Tombol Scroll Kiri */}

      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="bg-amber-400 overflow-x-auto scroll-smooth flex-1 w-full h-full grid grid-flow-col gap-2 grid-rows-1 scrollbar-none justify-start"
      >
        {/* Awal Mapping Produk Flash Sale */}
        {flashSaleLists.map((produk, index) => (
          <Link
            href={produk.link}
            key={produk.id}
            className=" w-43 h-full flex flex-col justify-between items-center shrink-0"
          >
            {/* Awal Foto Produk */}
            <div className=" relative flex-1 w-full shrink-0 overflow-hidden rounded-xl">
              <Image
                src={`https://picsum.photos/400/400?random=${index + 1}`}
                alt={produk.name}
                fill
                className="object-contain"
                sizes="172px"
              />
            </div>
            {/* Akhir Foto Produk */}

            {/* Awal Harga dan Jumlah Terjual */}
            <div className="w-full h-18 flex flex-col justify-center items-center px-3 gap-1">
              {/* Awal Harga */}
              <div className="flex flex-col justify-center items-center ">
                {/* Awal Harga Diskon */}
                <span className=" font-bold text-[#EE4D2D]">
                  {formatRupiah(produk.price)}
                </span>
                {/* Akhir Harga Diskon */}

                {/* Awal Harga Asli */}
                <span className="text-[10px] text-gray-500 line-through">
                  {formatRupiah(produk.originalPrice)}
                </span>
                {/* Akhir Harga Asli */}
              </div>
              {/* Akhir Harga */}

              {/* Awal Jumlah Terjual */}
              <div className="bg-[#FFBDA6] relative w-full h-5 flex justify-center items-center text-xs font-semibold text-white overflow-hidden rounded-full">
                {/* Awal Progress Bar */}
                <div
                  className="bg-linear-to-r from-[#EE4D2D] via-[#F96B4C] to-[#FFA07A]  h-full absolute left-0 top-0 transition-all duration-500 ease-in-out"
                  style={{
                    width: `${(produk.stockSold / produk.stockTotal) * 100}%`,
                  }}
                />
                {/* Akhir Progress Bar */}

                {/* Awal Jumlah Terjual */}
                <span className="absolute text-white">
                  {produk.stockTotal - produk.stockSold} TERJUAL
                </span>
                {/* Akhir Jumlah Terjual */}
              </div>
              {/* Akhir Jumlah Terjual */}
            </div>
            {/* Akhir Harga dan Jumlah Terjual */}
          </Link>
        ))}
        {/* Akhir Mapping Produk Flash Sale */}
      </div>

      {/* Awal Tombol Scroll Kanan */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollByAmount("right")}
          aria-label="Geser ke kanan"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          <IoIosArrowDroprightCircle className="w-10 h-10 text-white " />
        </button>
      )}
      {/* Akhir Tombol Scroll Kanan */}
    </div>
  );
}
