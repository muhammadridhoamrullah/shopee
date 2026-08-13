import { StoreDokumen } from "@/src/type/store";
import { ObjectId } from "mongodb";

// _id ditulis manual (alasan sama seperti di category.ts): produk perlu
// merujuk storeId ini dari proses seed yang terpisah
export const idTokoJersey = new ObjectId("6a8000000000000000000001");

export const storeSeedData: StoreDokumen[] = [
  {
    _id: idTokoJersey,
    userId: new ObjectId("6a572ab6e15a597dfea5bcbc"),
    name: "Haerin Jersey Collection",
    slug: "haerin-jersey-collection",
    image:
      "https://i.pinimg.com/474x/19/eb/32/19eb32ead6d19cf5f54f7e7b48c1a56f.jpg",
    phone: "081234567890",
    city: "Seoul",
    description: "Toko jersey bola original untuk klub dan timnas favoritmu",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: null,
    deletedAt: null,
  },
];
