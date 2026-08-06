import Image from "next/image";
import Link from "next/link";

export default function StoreBannerStatis() {
  const bannerStatus = [
    {
      name: "Banner 1",
      image: "/images/store/bannerStatis/bannerStatis1.webp",
      link: "/banner1",
    },
    {
      name: "Banner 2",
      image: "/images/store/bannerStatis/bannerStatis2.webp",
      link: "/banner2",
    },
  ];

  return (
    <div className=" w-full h-80 px-20">
      <div className=" w-full h-full flex flex-col overflow-hidden">
        {bannerStatus.map((banner) => (
          <Link
            href={banner.link}
            className="w-full h-full block relative"
            key={banner.name}
          >
            <Image
              src={banner.image}
              alt={banner.name}
              fill
              objectFit="cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
