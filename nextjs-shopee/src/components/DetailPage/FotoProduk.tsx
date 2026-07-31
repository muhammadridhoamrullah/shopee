"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Fullscreen, Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

interface Props {
  data: string[];
}

export default function FotoProduk({ data }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;

    if (!el) return;

    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  function scrollByAmount(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <div className="bg-green-600 w-120 h-150 flex flex-col justify-between items-center gap-2">
      {/* Awal Foto */}
      <div className="bg-red-400 flex-1 w-full flex flex-col gap-1 justify-between items-center">
        {/* Awal Foto Utama */}
        <div
          onClick={() => {
            setOpen(true);
            setIndex(0);
          }}
          className="bg-gray-600 flex-1 w-full relative cursor-pointer"
        >
          <Image
            src={data[0]}
            alt={`Foto Index ${index}`}
            fill
            objectFit="cover"
          />
        </div>
        {/* Akhir Foto Utama */}

        <div className="relative w-full h-30">
          {/* Awal Scroll Left */}
          {canScrollLeft && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out bg-white rounded-full p-1"
              type="button"
              onClick={() => scrollByAmount("left")}
            >
              <IoIosArrowDropleftCircle className="w-5 h-5 text-[#EE4D2D]" />
            </button>
          )}
          {/* Akhir Scroll Left */}

          {/* Awal Foto-Lainnya */}
          <div
            onScroll={updateScrollState}
            ref={scrollRef}
            className="bg-purple-400 w-full h-full flex scrollbar-none  gap-1  overflow-x-auto scroll-smooth"
          >
            {/* Awal Mapping Foto */}
            {data.slice(1).map((image, idx) => (
              <div
                key={idx}
                className="relative w-40 h-full shrink-0 cursor-pointer"
                onClick={() => {
                  setOpen(true);
                  setIndex(idx + 1);
                }}
              >
                <Image
                  src={image}
                  alt={`Foto Index ${idx + 1}`}
                  fill
                  objectFit="cover"
                />
              </div>
            ))}

            {/* Akhir Mapping Foto */}
          </div>
          {/* Akhir Foto-Lainnya */}

          {/* Awal Scroll Right */}
          {canScrollRight && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out bg-white rounded-full p-1"
              type="button"
              onClick={() => scrollByAmount("right")}
            >
              <IoIosArrowDroprightCircle className="w-5 h-5 text-[#EE4D2D]" />
            </button>
          )}
          {/* Akhir Scroll Right */}
        </div>
      </div>

      {/* Akhir Foto */}

      {/* Awal Share dan Favorit */}
      <div className="bg-pink-600 w-full h-15">Favorit dan Share</div>
      {/* Akhir Share dan Favorit */}

      {/* Awal Lightbox */}
      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={data.map((image) => ({ src: image }))}
        plugins={[Zoom, Fullscreen]}
      />
      {/* Akhir Lightbox */}
    </div>
  );
}
