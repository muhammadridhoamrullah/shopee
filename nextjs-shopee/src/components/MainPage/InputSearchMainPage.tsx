"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { searchRecommendations } from "../../helpers/utils";
import { getItemRandomly } from "@/src/helpers/hooks";

export default function InputSearchMainPage() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  let randomRecommendations = useMemo(
    () => getItemRandomly(searchRecommendations, 7),
    [],
  );

  async function submitHandler(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!keyword.trim()) return;
    router.push(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
  }

  return (
    <div className="flex-1 min-w-0 h-full flex flex-col justify-between items-center gap-2  pt-1.5">
      {/* Awal Input */}
      <form
        onSubmit={submitHandler}
        autoComplete="off"
        className="bg-white w-full h-12 rounded-md  flex justify-between items-center gap-1 p-1"
      >
        {/* Awal Input Search */}
        <input
          className="text-black flex-1 h-full pl-2 outline-none"
          type="search"
          name="keyword"
          id="keyword"
          placeholder="Cari produk, brand, dan kategori"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          autoComplete="off"
        />
        {/* Akhir Input Search */}

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
