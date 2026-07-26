"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const SCROLL_THRESHOLD = 300;

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      className={`cursor-pointer fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#EE4D2D] text-white shadow-lg transition-all duration-300 hover:bg-[#d8431f] ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <FaArrowUp className="text-base" />
    </button>
  );
}
