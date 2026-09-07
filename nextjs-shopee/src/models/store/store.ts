import { StoreRepository } from "./store.repository";
import { ObjectId } from "mongodb";
import { toProdukRingkasResponse, toStoreResponse } from "@/src/helpers/utils";
import { SORT_OPTIONS } from "@/src/type/category";
import { ProductRepository } from "../product/product.repository";
import { FlashSaleRepository } from "../flashSale/flashSale.repository";
import { DiscountRepository } from "../discount/discount.repository";

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
    lastLogin: null,
    deletedAt: null,
  });

  return result.insertedId.toString();
}

export async function getStoreByUserId(userId: string) {
  const store = await StoreRepository.findStoreByUserId(userId);
  return store ? toStoreResponse(store) : null;
}

export async function getStoreById(storeId: string) {
  const store = await StoreRepository.findStoreById(storeId);
  return store ? toStoreResponse(store) : null;
}

export async function getStoreBySlug(slug: string) {
  const store = await StoreRepository.findStoreBySlug(slug);

  return store ? toStoreResponse(store) : null;
}

export async function getProductByStoreId(
  storeId: string,
  page: number,
  sort?: string,
) {
  const limit = 12; // Jumlah produk per halaman
  const skip = (page - 1) * limit; // Hitung jumlah produk yang dilewati berdasarkan halaman

  const sortOption =
    SORT_OPTIONS[sort as keyof typeof SORT_OPTIONS] ?? SORT_OPTIONS.populer;

  const products = await ProductRepository.findByStoreIdProfile(
    storeId,
    limit,
    skip,
    sortOption,
  );

  // Cek apakah produk-produk ini memiliki flash sale?
  const flashSaleItems =
    await FlashSaleRepository.findActiveFlashSaleItemsByProductIds(
      products.map((el) => el._id),
    );

  // Cek apakah produk-produk ini memiliki diskon?
  const discounts = await DiscountRepository.findActiveDiscountsByProductIds(
    products.map((el) => el._id),
  );

  // Peta Produk flash sale berdasarkan productId
  const petaProductFlashSale = new Map(
    flashSaleItems.map((el) => [el.productId.toString(), el]),
  );

  // Peta Produk discount berdasarkan productId
  const petaProductDiscount = new Map(
    discounts.map((el) => [el.productId.toString(), el]),
  );

  const totalProducts = await ProductRepository.countByStoreId(storeId);

  return {
    products: products.map((product) =>
      toProdukRingkasResponse(
        product,
        petaProductFlashSale.get(product._id.toString()),
        petaProductDiscount.get(product._id.toString()),
      ),
    ),
    totalProducts,
    page,
    totalPages: Math.ceil(totalProducts / limit),
  };
}

export async function getProductsMilikStore(storeId: string) {
  const products = await ProductRepository.findByStoreId(storeId);

  return products.map((product) => toProdukRingkasResponse(product));
}
