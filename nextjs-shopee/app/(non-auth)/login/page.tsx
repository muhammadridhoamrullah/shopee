"use client";

import { BsQrCode } from "react-icons/bs";
import Link from "next/link";

export default function Login() {
  return (
    <div className="w-full min-h-screen bg-[#EE4D2D] flex flex-col">
      {/* Awal Navbar */}
      <div className="w-full h-20 bg-white px-20 flex justify-between items-center">
        {/* Awal Logo Shopee */}
        <Link href="/" className="w-40 h-16 relative">
          <img
            src="/shopee1.png"
            alt="Logo Shopee"
            className="absolute w-full h-full object-contain"
          />
        </Link>
        {/* Akhir Logo Shopee */}

        {/* Awal Butuh Bantuan? */}
        <Link href={"/help"} className="text-[#EE4D2D] text-sm font-semibold">
          Butuh bantuan?
        </Link>
        {/* Akhir Butuh Bantuan? */}
      </div>
      {/* Akhir Navbar */}

      {/* Awal Form */}
      <div className="w-full h-129.5 flex justify-around items-center px-30 pt-5">
        {/* Awal Logo Shopee */}
        <div className="bg-pink-400 w-full h-full flex justify-end items-center pr-10 relative">
          <img
            src={"/shopee3.png"}
            alt="Logo Shopee"
            className="absolute w-[50%] h-[50%] object-contain"
          />
        </div>
        {/* Akhir Logo Shopee */}

        {/* Awal Form Login */}
        <div className="bg-white rounded-xl w-175 h-full overflow-hidden px-6 py-8 flex flex-col  justify-between">
          {/* Awal Log In & QR */}
          <div className="bg-pink-400 w-full h-15 flex justify-between items-center">
            {/* Awal Log In */}
            <div className="bg-mauve-700 text-lg text-[#EE4D2D] font-semibold">
              Log In
            </div>
            {/* Akhir Log In */}

            {/* Awal QR Code */}
            <BsQrCode className="text-[#EE4D2D] text-5xl" />
            {/* Akhir QR Code */}
          </div>
          {/* Akhir Log In & QR */}

          {/* Awal Form */}
          <div className="bg-green-900">FORMMM</div>
          {/* Akhir Form */}

          {/* Awal Footer Form */}
          <div className="bg-blue-950">Footer</div>
          {/* Akhir Footer Form */}

          {/* Awal Link Register */}
          <div className="bg-gray-500">Link Register</div>
          {/* Akhir Link Register */}
        </div>
        {/* Akhir Form Login */}
      </div>
      {/* Akhir Form */}

      {/* Awal Footer */}
      <div>Footer</div>
      {/* Akhir Footer */}
    </div>
  );
}
