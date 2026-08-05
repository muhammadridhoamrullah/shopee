"use client";

import { formatRupiah } from "@/src/helpers/utils";
import { Voucher } from "@/src/type/store";
import { formatHari } from "@/src/utils/Store/Store";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { toast } from "react-toastify";

interface Props {
  vouchers: Voucher[];
}

export default function StoreVoucher({ vouchers }: Props) {
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
    <div className=" w-full h-50 px-20">
      <div className="bg-white w-full h-full p-6 relative">
        {/* Awal Scroll Left */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            <IoIosArrowDropleftCircle className="w-10 h-10" />
          </button>
        )}
        {/* Akhir Scroll Left */}

        {/* Awal Mapping Card Voucher */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className=" overflow-x-auto scroll-smooth flex-1 h-full grid grid-flow-col justify-start gap-2 grid-rows-1 scrollbar-none"
        >
          {vouchers.map((voucher) => (
            <div
              key={voucher._id}
              className="bg-[#EE4D2D] w-90 h-full rounded-md flex justify-between items-center shrink-0 gap-3 px-4 text-sm relative text-white"
            >
              {/* Awal Bagian Info Voucher */}
              <div className=" flex-1 h-full flex flex-col justify-center items-start gap-1 border-r-4 border-r-white border-dashed">
                <span>DISKON {formatRupiah(voucher.discountAmount)}</span>

                <span>Min. Blj {formatRupiah(voucher.minPurchase)}</span>

                <span className="py-1 px-2  rounded-sm border border-white">
                  {voucher.code}
                </span>

                <span>Berakhir dlm: {formatHari(voucher.expiredAt)}</span>
              </div>
              {/* Akhir Bagian Info Voucher */}

              {/* Awal Button Claim */}
              <button
                onClick={() => toast.success("Berhasil Klaim Voucher!")}
                className="bg-red-800 px-3 py-1 rounded-sm cursor-pointer hover:bg-red-600 transition-colors duration-300 ease-out  font-medium"
              >
                Klaim
              </button>
              {/* Akhir Button Claim */}

              {/* Awal Stock */}
              <span className="absolute top-0 right-7 px-1 py-2 bg-red-800 rounded-b-md">
                {voucher.stock}x
              </span>
              {/* Akhir Stock */}
            </div>
          ))}
        </div>
        {/* Akhir Mapping Card Voucher */}

        {/* Awal Scroll Right */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            <IoIosArrowDroprightCircle className="w-10 h-10 " />
          </button>
        )}
        {/* Akhir Scroll Right */}
      </div>
    </div>
  );
}

// {
//       _id: "vc-001",
//       code: "DISKON1RB",
//       discountAmount: 1000, // Rp1RB
//       minPurchase: 50000, // Min. Blj Rp50RB
//       expiredAt: new Date("2026-09-16"), // Hingga: 16.09.2026
//       stock: 5, // x5
//     },
