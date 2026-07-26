import {
  bannerMenuLinks,
  imageBannerBesar,
  imageBannerKecil,
} from "@/src/helpers/utils";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="bg-white px-20 pt-6 pb-2 w-full h-96 flex flex-col  items-center gap-4">
      {/* Awal Banner */}
      <div className="flex-1 w-full flex items-center gap-1">
        {/* Awal Banner Besar Kanan */}
        <div className=" flex-1 h-full relative ">
          <Image
            src={imageBannerBesar.image}
            alt={imageBannerBesar.name}
            fill
            className="rounded-md object-cover"
          />
        </div>
        {/* Akhir Banner Besar Kanan */}

        {/* Awal Banner Kecil Kiri */}
        <div className="w-102 h-full flex flex-col gap-1 justify-between items-center">
          {imageBannerKecil.map((banner, index) => (
            <div key={index} className=" w-full h-full relative ">
              <Image
                src={banner.image}
                alt={banner.name}
                fill
                className="object cover rounded-md"
              />
            </div>
          ))}
        </div>
        {/* Akhir Banner Kecil Kiri */}
      </div>
      {/* Akhir Banner */}

      {/* Awal Menu */}
      <div className=" w-full h-22 shrink-0 flex justify-around items-center">
        {bannerMenuLinks.map((menu, index) => (
          <Link
            href={menu.link}
            key={index}
            className="w-20 h-full flex flex-col gap-1 justify-between items-center text-xs font-semibold"
          >
            {/* Awal Image Menu */}
            <div className="w-12 h-12 relative">
              <Image
                src={menu.image}
                alt={menu.name}
                fill
                className="rounded-md object-cover"
              />
            </div>
            {/* Akhir Image Menu */}

            {/* Awal Nama Menu */}
            <span className=" flex-1 w-full text-center">{menu.name}</span>
            {/* Akhir Nama Menu */}
          </Link>
        ))}
      </div>
      {/* Akhir Menu */}
    </div>
  );
}
