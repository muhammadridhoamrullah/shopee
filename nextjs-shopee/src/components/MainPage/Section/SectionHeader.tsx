import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface Props {
  title: string;
  link: string;
  children?: React.ReactNode;
}

export default function SectionHeader({ title, link, children }: Props) {
  return (
    <div className="w-full flex justify-between items-center p-5">
      {/* Awal Text dan Timer Flash Sale */}
      <div className="flex justify-start items-center gap-2">
        {/* Awal Text Flash Sale */}
        <h1 className="w-full font-bold text-[#EE4D2D]">{title}</h1>
        {/* Akhir Text Flash Sale */}

        {/* Awal Children */}
        {children}
        {/* Akhir Children */}
      </div>
      {/* Akhir Text dan Timer Flash Sale */}

      {/* Awal Link Lihat Semua */}
      <div className="flex justify-start items-center gap-1 text-[#EE4D2D] font-semibold text-xs">
        {/* Awal Link Lihat Semua */}
        <Link href={link}>Lihat Semua</Link>
        {/* Akhir Link Lihat Semua */}

        {/* Awal Arrow */}
        <IoIosArrowForward className="" />
        {/* Akhir Arrow */}
      </div>
      {/* Akhir Link Lihat Semua */}
    </div>
  );
}
