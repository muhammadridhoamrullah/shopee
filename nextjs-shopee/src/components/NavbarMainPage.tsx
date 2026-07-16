import Image from "next/image";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoIosGlobe } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function NavbarMainPage() {
  const menuLinks = [
    { name: "Seller Center", link: "/seller-center" },
    { name: "Mulai Berjualan", link: "/mulai-berjualan" },
    { name: "Download", link: "/download" },
    {
      name: "Ikuti Kami",
      link: "/ikuti-kami",
      subMenu: [
        { icon: <FaFacebook />, link: "https://www.facebook.com/ShopeeID/" },
        { icon: <FaTwitter />, link: "https://twitter.com/ShopeeID" },
        {
          icon: <FaSquareInstagram />,
          link: "https://www.instagram.com/shopeeid/",
        },
      ],
    },
  ];

  const notificationLinks = [
    {
      name: "Notifikasi",
      link: "/notifikasi",
      icon: <IoIosNotificationsOutline />,
    },
    { name: "Bantuan", link: "/bantuan", icon: <IoIosHelpCircleOutline /> },
    { name: "Bahasa", link: "/bahasa", icon: <IoIosGlobe /> },
  ];

  return (
    <nav className="bg-[#EE4D2D] w-full h-30 py-2 px-20 flex flex-col justify-between items-center text-white text-[13px]">
      {/* Awal Link */}
      <div className="w-full h-fit flex justify-between items-center">
        {/* Awal Seller Center  etc */}
        <div className="w-fit h-fit flex justify-start items-center divide-x divide-gray-400 [&>*:not(:first-child)]:pl-2 [&>*:not(:last-child)]:pr-2">
          {menuLinks.map((menu, idx) => (
            <div className="flex gap-1" key={idx}>
              <Link href={menu.link}>{menu.name}</Link>
              {menu.subMenu && (
                <div className="flex gap-2 justify-start items-center ">
                  {menu.subMenu.map((subMenu, subIdx) => (
                    <Link key={subIdx} href={subMenu.link}>
                      {subMenu.icon}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Akhir Seller Center  etc */}

        {/* Awal Login/Daftar etc  */}
        <div className="w-fit h-fit flex justify-start items-center gap-4">
          {/* Awal Notifikasi, Bantuan, Bahasa */}
          <div className="w-fit h-fit flex justify-start items-center gap-2">
            {notificationLinks.map((el, idx) => (
              <Link
                key={idx}
                className="flex justify-start items-center gap-1"
                href={el.link}
              >
                {/* Awal Icon */}
                {el.icon}
                {/* Akhir Icon */}

                {/* Awal Text */}
                {el.name}
                {el.name === "Bahasa" && <RiArrowDropDownLine />}
                {/* Akhir Text */}
              </Link>
            ))}
          </div>
          {/* Akhir Notifikasi, Bantuan, Bahasa */}

          {/* Awal Daftar Login */}
          <div className="bg-red-500 w-fit h-fit flex justify-start items-center divide-x divide-gray-400 [&>*:not(:first-child)]:pl-2 [&>*:not(:last-child)]:pr-2 font-semibold">
            {/* Awal Link Daftar */}
            <Link href={"/register"}>Daftar</Link>
            {/* Akhir Link Daftar */}
            {/* Awal Link Login */}
            <Link href={"/login"}>Login</Link>
            {/* Akhir Link Login */}
          </div>
          {/* Akhir Daftar Login */}
        </div>
        {/* Akhir Login/Daftar etc  */}
      </div>
      {/* Akhir Link */}

      {/* Awal Search Bar */}
      <div className="bg-pink-900 w-full h-19 flex justify-between items-center gap-4">
        {/* Awal Logo Shopee */}
        <div className="bg-amber-700 w-[20%] h-full flex justify-center items-center relative">
          <Image
            src={"/shopee5.png"}
            alt="Logo Shopee"
            fill
            className="object-contain"
          />
        </div>
        {/* Akhir Logo Shopee */}
        {/* Awal Search Input */}
        <div className="bg-blue-400 w-full">Search</div>
        {/* Akhir Search Input */}

        {/* Awal Keranjang */}
        <div className="bg-red-400 w-[20%]">Keranjang</div>
        {/* Akhir Keranjang */}
      </div>
      {/* Akhir Search Bar */}
    </nav>
  );
}
