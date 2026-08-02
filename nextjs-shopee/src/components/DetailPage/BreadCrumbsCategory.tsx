import { KategoriResponse } from "@/src/type/category";
import Link from "next/link";
import { log } from "node:console";
import { Fragment } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

interface Props {
  category: KategoriResponse[];
}

export default function BreadCrumbsCategory({ category }: Props) {
  const tes = category.map((cat) => cat.name).join(" > ");
  console.log(tes, "Tes");

  log(category, "category Bread");
  return (
    <div className=" w-full line-clamp-1 h-fit flex justify-start items-center gap-1 text-sm">
      {category.map((cat, index) => (
        <Fragment key={cat._id}>
          {/* separator cuma dirender di antara item, jadi item pertama tidak diawali ">" */}
          {index > 0 && <MdKeyboardArrowRight className="text-[#EE4D2D]" />}
          <Link className="text-[#EE4D2D] " href={`/category/${cat.slug}`}>
            {cat.name}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}

// Olahraga & Outdoor > Pakaian Olahraga Pria > Jersey Tes

// [
//   {
//     _id: '6a7000000000000000000001',
//     name: 'Olahraga & Outdoor',
//     slug: 'olahraga-dan-outdoor',
//     ancestorsId: [],
//     createdAt: 2026-08-02T06:35:38.839Z,
//     updatedAt: 2026-08-02T06:35:38.839Z
//   },
//   {
//     _id: '6a7000000000000000000002',
//     name: 'Pakaian Olahraga Pria',
//     slug: 'pakaian-olahraga-pria',
//     ancestorsId: [ '6a7000000000000000000001' ],
//     createdAt: 2026-08-02T06:35:38.839Z,
//     updatedAt: 2026-08-02T06:35:38.839Z
//   },
//   {
//     _id: '6a7000000000000000000003',
//     name: 'Jersey',
//     slug: 'jersey',
//     ancestorsId: [ '6a7000000000000000000001', '6a7000000000000000000002' ],
//     createdAt: 2026-08-02T06:35:38.839Z,
//     updatedAt: 2026-08-02T06:35:38.839Z
//   }
// ] breadCrumbsCa

// [
//   {
//     _id: '6a7000000000000000000001',
//     name: 'Olahraga & Outdoor',
//     slug: 'olahraga-dan-outdoor',
//     ancestorsId: [],
//     createdAt: 2026-08-02T06:35:38.839Z,
//     updatedAt: 2026-08-02T06:35:38.839Z
//   },
//   {
//     _id: '6a7000000000000000000002',
//     name: 'Pakaian Olahraga Pria',
//     slug: 'pakaian-olahraga-pria',
//     ancestorsId: [ '6a7000000000000000000001' ],
//     createdAt: 2026-08-02T06:35:38.839Z,
//     updatedAt: 2026-08-02T06:35:38.839Z
//   },
//   {
//     _id: '6a7000000000000000000003',
//     name: 'Jersey',
//     slug: 'jersey',
//     ancestorsId: [ '6a7000000000000000000001', '6a7000000000000000000002' ],
//     createdAt: 2026-08-02T06:35:38.839Z,
//     updatedAt: 2026-08-02T06:35:38.839Z
//   }
// ] category Bread
