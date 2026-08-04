"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { searchRecommendations } from "../../../helpers/utils";
import { getItemRandomly } from "@/src/helpers/hooks";
import { ProdukResponse } from "@/src/type/produk";

export default function InputSearchMainPage() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<{
    keyword: string;
    items: ProdukResponse[];
  }>({ keyword: "", items: [] });
  const router = useRouter();

  const randomRecommendations = useMemo(
    () => getItemRandomly(searchRecommendations, 7),
    [],
  );

  // Debounce
  useEffect(() => {
    const kata = keyword.trim();

    if (kata.length < 3) return;

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?keyword=${encodeURIComponent(kata)}`,
        );

        const data = await response.json();

        setResults({ keyword: kata, items: data.data || [] });
      } catch (error) {
        setResults({ keyword: kata, items: [] });
        console.error("Error fetching search results:", error);
      }
    }, 300); // Delay 300ms

    return () => clearTimeout(timer);
  }, [keyword]);

  async function submitHandler(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!keyword.trim()) return;
    router.push(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
  }

  const showSuggestions =
    results.keyword === keyword.trim() && results.items.length > 0;
  return (
    <div className="flex-1 min-w-0 h-full flex flex-col justify-between items-center gap-2  pt-1.5">
      {/* Awal Input */}
      <form
        onSubmit={submitHandler}
        autoComplete="off"
        className="bg-white w-full h-12 rounded-md  flex justify-between items-center gap-1 p-1 relative"
      >
        {/* Awal Input Search */}
        <input
          className=" text-black flex-1 h-full pl-2 outline-none"
          type="search"
          name="keyword"
          id="keyword"
          placeholder="Cari produk, brand, dan kategori"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          autoComplete="off"
        />
        {/* Akhir Input Search */}

        {/* Awal Suggestion Search */}
        {showSuggestions && (
          <div className="absolute bg-white w-full h-fit left-0 top-full shadow-md z-10 mt-1 rounded-md  p-2 text-black flex flex-col gap-2 items-center justify-start">
            {results.items.map((item) => (
              <Link
                href={`/${item.slug}`}
                key={item._id}
                className="w-full  hover:bg-gray-200 truncate p-2"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
        {/* Akhir Suggestion Search */}

        {/* Awal Icon Search */}
        <button
          type="submit"
          className="bg-[#EE4D2D] w-20 h-full rounded-md flex justify-center items-center  cursor-pointer hover:bg-[#EE4D2D]/90 transition-all duration-300"
        >
          <IoMdSearch className="text-white text-2xl" />
        </button>
        {/* Akhir Icon Search */}
      </form>
      {/* Akhir Input */}

      {/* Awal Rekomendasi Search */}
      <div className=" w-full h-fit flex justify-between items-center">
        {/* Awal Mapping */}

        {randomRecommendations.map((item, index) => (
          <Link
            href={`/search?keyword=${encodeURIComponent(item)}`}
            key={index}
            className="text-[11px]  hover:text-blue-500 cursor-pointer truncate"
          >
            {item}
          </Link>
        ))}
        {/* Akhir Mapping */}
      </div>
      {/* Akhir Rekomendasi Search */}
    </div>
  );
}

// [
//     {
//         "_id": "6a6ee56e0798c70ca1aa83fb",
//         "name": "Jersey Manchester United Home 25/26",
//         "slug": "jersey-manchester-united-home-25-26",
//         "categoryId": "6a7000000000000000000003",
//         "storeId": "6a8000000000000000000001",
//         "images": [
//             "https://picsum.photos/600/600?random=1",
//             "https://picsum.photos/600/600?random=51",
//             "https://picsum.photos/600/600?random=101",
//             "https://picsum.photos/600/600?random=151",
//             "https://picsum.photos/600/600?random=201",
//             "https://picsum.photos/600/600?random=251"
//         ],
//         "price": 299000,
//         "originalPrice": 420000,
//         "discountPercent": 29,
//         "quantity": 100,
//         "sold": 1900,
//         "createdAt": "2026-08-02T06:36:28.104Z",
//         "updatedAt": "2026-08-02T06:36:28.104Z"
//     },
//     {
//         "_id": "6a6ee56e0798c70ca1aa83fc",
//         "name": "Jersey Real Madrid Home 25/26",
//         "slug": "jersey-real-madrid-home-25-26",
//         "categoryId": "6a7000000000000000000003",
//         "storeId": "6a8000000000000000000001",
//         "images": [
//             "https://picsum.photos/600/600?random=2",
//             "https://picsum.photos/600/600?random=52",
//             "https://picsum.photos/600/600?random=102",
//             "https://picsum.photos/600/600?random=152",
//             "https://picsum.photos/600/600?random=202",
//             "https://picsum.photos/600/600?random=252"
//         ],
//         "price": 315000,
//         "originalPrice": 450000,
//         "discountPercent": 30,
//         "quantity": 85,
//         "sold": 2400,
//         "createdAt": "2026-08-02T06:36:28.104Z",
//         "updatedAt": "2026-08-02T06:36:28.104Z"
//     },
//     {
//         "_id": "6a6ee56e0798c70ca1aa83fd",
//         "name": "Jersey Barcelona Away 25/26",
//         "slug": "jersey-barcelona-away-25-26",
//         "categoryId": "6a7000000000000000000003",
//         "storeId": "6a8000000000000000000001",
//         "images": [
//             "https://picsum.photos/600/600?random=3",
//             "https://picsum.photos/600/600?random=53",
//             "https://picsum.photos/600/600?random=103",
//             "https://picsum.photos/600/600?random=153",
//             "https://picsum.photos/600/600?random=203",
//             "https://picsum.photos/600/600?random=253"
//         ],
//         "price": 289000,
//         "originalPrice": 399000,
//         "discountPercent": 28,
//         "quantity": 70,
//         "sold": 1600,
//         "createdAt": "2026-08-02T06:36:28.104Z",
//         "updatedAt": "2026-08-02T06:36:28.104Z"
//     },
//     {
//         "_id": "6a6ee56e0798c70ca1aa83fe",
//         "name": "Jersey Liverpool FC Away Authentic 25/26",
//         "slug": "jersey-liverpool-fc-away-authentic-25-26",
//         "categoryId": "6a7000000000000000000003",
//         "storeId": "6a8000000000000000000001",
//         "images": [
//             "https://picsum.photos/600/600?random=4",
//             "https://picsum.photos/600/600?random=54",
//             "https://picsum.photos/600/600?random=104",
//             "https://picsum.photos/600/600?random=154",
//             "https://picsum.photos/600/600?random=204",
//             "https://picsum.photos/600/600?random=254"
//         ],
//         "price": 1190000,
//         "originalPrice": 1450000,
//         "discountPercent": 18,
//         "quantity": 25,
//         "sold": 210,
//         "createdAt": "2026-08-02T06:36:28.104Z",
//         "updatedAt": "2026-08-02T06:36:28.104Z"
//     },
//     {
//         "_id": "6a6ee56e0798c70ca1aa83ff",
//         "name": "Jersey Arsenal Third 25/26",
//         "slug": "jersey-arsenal-third-25-26",
//         "categoryId": "6a7000000000000000000003",
//         "storeId": "6a8000000000000000000001",
//         "images": [
//             "https://picsum.photos/600/600?random=5",
//             "https://picsum.photos/600/600?random=55",
//             "https://picsum.photos/600/600?random=105",
//             "https://picsum.photos/600/600?random=155",
//             "https://picsum.photos/600/600?random=205",
//             "https://picsum.photos/600/600?random=255"
//         ],
//         "price": 275000,
//         "quantity": 60,
//         "sold": 890,
//         "createdAt": "2026-08-02T06:36:28.104Z",
//         "updatedAt": "2026-08-02T06:36:28.104Z"
//     }
// ]
