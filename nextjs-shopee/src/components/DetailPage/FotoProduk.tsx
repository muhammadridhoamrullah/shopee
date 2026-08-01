"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import {
  Download,
  Fullscreen,
  Slideshow,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { formatAngka } from "@/src/helpers/utils";
import { toast } from "react-toastify";
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
    <div className=" w-120 h-150 flex flex-col justify-between items-center gap-2">
      {/* Awal Foto */}
      <div className=" flex-1 w-full flex flex-col gap-1 justify-between items-center">
        {/* Awal Foto Utama */}
        <div
          onClick={() => {
            setOpen(true);
            setIndex(0);
          }}
          className="bg-gray-400 flex-1 w-full relative cursor-pointer"
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
            className=" w-full h-full flex scrollbar-none  gap-1  overflow-x-auto scroll-smooth"
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
      <div className=" w-full h-15 flex justify-between items-center divide-x-2 divide-gray-200 [&>*:not(:first-child)]:pl-2 [&>*:not(:last-child)]:pr-2 px-4 py-2 ">
        {/* Awal Share */}
        <div className=" w-full h-full flex justify-center items-center gap-1">
          {/* Awal Text Share */}
          <span className="text-sm font-semibold">Share:</span>
          {/* Akhir Text Share */}

          {/* Awal Icon-Icon Share */}
          <div className=" w-fit gap-2  flex justify-center items-center ">
            {/* Awal Icon Messenger */}
            <Link
              href="https://www.messenger.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookMessenger className="w-7 h-7 text-[#006AFF]" />
            </Link>
            {/* Akhir Icon Messenger */}

            {/* Awal Icon Facebook */}
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-7 h-7 text-[#C13584]" />
            </Link>
            {/* Akhir Icon Facebook */}
            {/* Awal Icon Instagram */}
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareInstagram className="w-7 h-7 text-[#C13584]" />
            </Link>
            {/* Akhir Icon Instagram */}

            {/* Awal Icon Twitter */}
            <Link
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareXTwitter className="w-7 h-7 text-[#14171A]" />
            </Link>
            {/* Akhir Icon Twitter */}
          </div>
          {/* Akhir Icon-Icon Share */}
        </div>
        {/* Akhir Share */}

        {/* Awal Favorit */}
        <button
          type="button"
          className="w-full h-full flex justify-center items-center gap-2"
        >
          {/* Awal Icon Favorit */}
          <FaRegHeart
            onClick={() => toast.success("Berhasil menambahkan ke favorit")}
            className="w-7 h-7 text-red-400"
          />
          {/* Akhir Icon Favorit */}

          {/* Awal Text Favorit */}
          <span className="text-sm font-semibold">
            Favorit ({formatAngka(3824)})
          </span>
          {/* Akhir Text Favorit */}
        </button>
        {/* Akhir Favorit */}
      </div>
      {/* Akhir Share dan Favorit */}

      {/* Awal Lightbox */}
      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={data.map((image) => ({ src: image }))}
        plugins={[Zoom, Fullscreen, Download, Slideshow]}
      />
      {/* Akhir Lightbox */}
    </div>
  );
}
