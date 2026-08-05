"use client";

import { MenuBarItem } from "@/src/type/store";
import { useState } from "react";

interface Props {
  menuBar: MenuBarItem[];
}

export default function StoreMenuBar({ menuBar }: Props) {
  const [activeSection, setActionSection] = useState(menuBar[0].section);
  return (
    <div className="w-full h-15 grid grid-cols-6">
      {menuBar.map((menu, index) => (
        <a
          key={index}
          href={`${menu.section}`}
          className={`w-full h-full  flex justify-center items-center ${activeSection === menu.section ? "border-b-4 border-[#EE4D2D] text-[#EE4D2D]" : "hover:bg-gray-200"} text-sm transition-all duration-300 ease-in-out font-semibold`}
          onClick={() => setActionSection(menu.section)}
        >
          {menu.name}
        </a>
      ))}
    </div>
  );
}
