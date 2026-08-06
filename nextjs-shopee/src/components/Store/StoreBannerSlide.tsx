"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function StoreBannerSlide() {
  const bannerSlide = [
    {
      name: "Banner 1",
      image: "/images/store/bannerSlide/bannerSlide1.webp",
      link: "/banner1",
    },
    {
      name: "Banner 2",
      image: "/images/store/bannerSlide/bannerSlide2.webp",
      link: "/banner2",
    },
    {
      name: "Banner 3",
      image: "/images/store/bannerSlide/bannerSlide3.webp",
      link: "/banner3",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Awal Auto Slide Tiap 4 Detik
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % bannerSlide.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [bannerSlide.length]);
  // Akhir Auto Slide Tiap 4 Detik

  return (
    <div className="w-full h-140 px-20">
      {/* Awal Bingkai Slide */}
      <div className="relative w-full h-full overflow-hidden rounded-md">
        {/* Awal Track (Rel Geser) */}
        <div
          className="w-full h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {bannerSlide.map((banner) => (
            <Link
              href={banner.link}
              key={banner.name}
              className="relative block w-full h-full shrink-0"
            >
              <Image
                src={banner.image}
                alt={banner.name}
                fill
                className="object-cover"
              />
            </Link>
          ))}
        </div>
        {/* Akhir Track (Rel Geser) */}

        {/* Awal Dot Indikator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {bannerSlide.map((banner, index) => (
            <button
              key={banner.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ke ${banner.name}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ease-in-out cursor-pointer z-10 ${
                index === activeIndex ? "bg-[#EE4D2D]" : "bg-white/70"
              }`}
            />
          ))}
        </div>
        {/* Akhir Dot Indikator */}

        {/* Awal Arrow Left */}
        <button
          type="button"
          onClick={() =>
            setActiveIndex(
              (prev) => (prev - 1 + bannerSlide.length) % bannerSlide.length,
            )
          }
          aria-label="Banner sebelumnya"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-[#EE4D2D] hover:text-white text-gray-800 p-2 rounded-full z-10 cursor-pointer "
        >
          <MdKeyboardArrowLeft />
        </button>
        {/* Akhir Arrow Left */}

        {/* Awal Arrow Right */}
        <button
          type="button"
          onClick={() =>
            setActiveIndex((prev) => (prev + 1) % bannerSlide.length)
          }
          aria-label="Banner berikutnya"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-[#EE4D2D] hover:text-white text-gray-800 p-2 rounded-full z-10 cursor-pointer "
        >
          <MdKeyboardArrowRight />
        </button>
        {/* Akhir Arrow Right */}
      </div>
      {/* Akhir Bingkai Slide */}
    </div>
  );
}
