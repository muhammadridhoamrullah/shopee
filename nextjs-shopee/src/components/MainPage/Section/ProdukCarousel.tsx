"use client";

import { useEffect, useRef, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

interface Props {
  children: React.ReactNode;
}

export default function ProdukCarousel({ children }: Props) {
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
    <div className="relative w-full flex-1">
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
        className=" overflow-x-auto scroll-smooth  w-full h-full grid grid-flow-col gap-4 grid-rows-1 scrollbar-none justify-start"
      >
        {/* Awal Mapping Produk Flash Sale */}
        {children}
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
