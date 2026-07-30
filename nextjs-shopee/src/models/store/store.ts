import { StoreDokumen } from "@/src/type/store";
import { StoreRepository } from "./store.repository";
import { ObjectId } from "mongodb";
import { toStoreResponse } from "@/src/helpers/utils";

interface CreateStoreData {
  userId: string;
  name: string;
  slug: string;
  description?: string;
  city: string;
  phone?: string;
  image: string;
}

export async function createStore(storeData: CreateStoreData) {
  // Check apakah store sudah exist
  const existingStore = await StoreRepository.findStoreByUserId(
    storeData.userId,
  );

  if (existingStore) {
    throw new Error("Store sudah ada untuk user ini");
  }

  const result = await StoreRepository.creatingStore({
    userId: new ObjectId(storeData.userId),
    name: storeData.name,
    slug: storeData.slug,
    description: storeData.description || "",
    city: storeData.city,
    image: storeData.image,
    phone: storeData.phone || "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  return result.insertedId.toString();
}

export async function getStoreByUserId(userId: string) {
  const store = await StoreRepository.findStoreByUserId(userId);
  return store ? toStoreResponse(store) : null;
}

export const getStoreById = async (storeId: string) => {
  const store = await StoreRepository.findStoreById(storeId);
  return store ? toStoreResponse(store) : null;
};
