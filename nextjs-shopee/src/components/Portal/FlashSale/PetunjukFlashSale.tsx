import Image from "next/image";
import { MdDoubleArrow } from "react-icons/md";

export default function PetunjukFlashSale() {
  const info = [
    {
      name: "Pilih Sesi",
      desc: "Pilih sesi flash sale yang ingin kamu ikuti.",
      image: "/images/portal/flash-sale/1PilihSesi.webp",
    },
    {
      name: "Tambah Produk",
      desc: "Pilih item yang ingin kamu ikuti flash sale.",
      image: "/images/portal/flash-sale/2PilihItem.png",
    },
    {
      name: "Tampilkan di Halaman Toko",
      desc: "Tambahkan produk ke Flash Sale Toko Saya agar dapat ditampilkan di halaman tokomu!",
      image: "/images/portal/flash-sale/3FlashSaleCuy.jpeg",
    },
  ];

  return (
    <div className=" w-full h-90 flex justify-between items-center gap-2">
      {info.map((item, index) => (
        <>
          <div
            key={index}
            className=" w-full h-full flex flex-col gap-2 justify-start items-center rounded-md overflow-hidden"
          >
            {/* Awal Image */}
            <div className=" w-full flex-1 relative">
              <Image src={item.image} alt={item.name} fill objectFit="cover" />
            </div>
            {/* Akhir Image */}

            {/* Awal Judul dan Deskripsi */}
            <div className=" w-full h-25 flex flex-col justify-start items-center gap-2 p-2">
              {/* Awal Judul */}
              <span className="text-xl font-semibold text-[#EE4D2D]">
                {item.name}
              </span>
              {/* Akhir Judul */}

              {/* Awal Deskripsi */}
              <span className="text-sm">{item.desc}</span>
              {/* Akhir Deskripsi */}
            </div>
            {/* Akhir Judul dan Deskripsi */}
          </div>
          {index !== info.length - 1 && (
            <MdDoubleArrow className="text-[#EE4D2D] text-8xl" />
          )}
        </>
      ))}
    </div>
  );
}
