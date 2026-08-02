// Breadcrumb, urut dari induk kategori

import { toKategoriResponse } from "@/src/helpers/utils";
import { CategoryRepository } from "./category.repository";

export async function getBreadCrumb(categoryId: string) {
  const category = await CategoryRepository.findById(categoryId);

  if (!category) {
    return [];
  }

  const ancestors = await CategoryRepository.findByIds(category.ancestorsId);

  // Urutkan ancestors sesuai urutan di ancestorsId
  const sortedAncestors = category.ancestorsId
    .map((id) => ancestors.find((ancestor) => ancestor._id.equals(id)))
    .filter((ancestor) => ancestor !== undefined);

  return [...sortedAncestors, category].map(toKategoriResponse);
}

//   {
//     name: "Jersey Manchester United Home 25/26",
//     slug: "jersey-manchester-united-home-25-26",
//     categoryId: idJersey,
//     storeId: idTokoJersey,
//     images: buildImages(1),
//     price: 299000,
//     originalPrice: 420000,
//     discountPercent: 29,
//     quantity: 100,
//     sold: 1900,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },

// const category = await CategoryRepository.findById(categoryId);
//   {
//     _id: idJersey,
//     name: "Jersey",
//     slug: "jersey",
//     // Urut dari paling atas ke induk langsung -- urutan ini langsung dipakai
//     // sebagai urutan breadcrumb nanti, jadi jangan dibalik
//     ancestorsId: [idOlahraga, idPakaianOlahragaPria],
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// [
//   {
//     _id: idOlahraga,
//     name: "Olahraga & Outdoor",
//     slug: "olahraga-dan-outdoor",
//     ancestorsId: [], // Kategori paling atas, tidak punya leluhur
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     _id: idPakaianOlahragaPria,
//     name: "Pakaian Olahraga Pria",
//     slug: "pakaian-olahraga-pria",
//     ancestorsId: [idOlahraga],
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },]
