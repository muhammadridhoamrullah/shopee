import { StoreDokumen } from "@/src/type/store";
import { ObjectId } from "mongodb";

export const storeSeedData: Omit<StoreDokumen, "_id">[] = [
  {
    userId: new ObjectId("6a572ab6e15a597dfea5bcbc"),
    name: "Toko Saya",
    slug: "toko-saya",
    image:
      "https://i.pinimg.com/474x/19/eb/32/19eb32ead6d19cf5f54f7e7b48c1a56f.jpg",
    phone: "081234567890",
    city: "Jakarta",
    description: "Toko menjual merchandise dari NewJeans",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];
