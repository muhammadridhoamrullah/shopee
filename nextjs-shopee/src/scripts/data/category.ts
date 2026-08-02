import { KategoriDokumen } from "@/src/type/category";
import { ObjectId } from "mongodb";

// _id ditulis manual sebagai string hex TETAP, bukan new ObjectId() kosong.
// Alasannya: seed-category dan seed-product jalan sebagai dua proses Node
// terpisah. Kalau ID di-generate acak, ID yang dipakai produk tidak akan
// cocok dengan ID kategori yang sudah tersimpan di database.
export const idOlahraga = new ObjectId("6a7000000000000000000001");
export const idPakaianOlahragaPria = new ObjectId("6a7000000000000000000002");
export const idJersey = new ObjectId("6a7000000000000000000003");

export const categorySeedData: KategoriDokumen[] = [
  {
    _id: idOlahraga,
    name: "Olahraga & Outdoor",
    slug: "olahraga-dan-outdoor",
    ancestorsId: [], // Kategori paling atas, tidak punya leluhur
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: idPakaianOlahragaPria,
    name: "Pakaian Olahraga Pria",
    slug: "pakaian-olahraga-pria",
    ancestorsId: [idOlahraga],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: idJersey,
    name: "Jersey",
    slug: "jersey",
    // Urut dari paling atas ke induk langsung -- urutan ini langsung dipakai
    // sebagai urutan breadcrumb nanti, jadi jangan dibalik
    ancestorsId: [idOlahraga, idPakaianOlahragaPria],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
