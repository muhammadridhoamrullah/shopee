import { toProdukResponse } from "@/src/helpers/utils";
import { ProductRepository } from "./product.repository";
import { cache } from "react";
import { SORT_OPTIONS } from "@/src/type/category";
import { StoreRepository } from "../store/store.repository";

export const getProductBySlug = cache(async (slug: string) => {
  // Ambil data produk dari repository
  const product = await ProductRepository.findBySlug(slug);

  if (!product) {
    return null;
  }

  return toProdukResponse(product);
});

export const getAllProducts = cache(async () => {
  const products = await ProductRepository.findAll();

  return products.map((product) => toProdukResponse(product));
});

export async function getSearchProducts(
  keyword: string,
  page: number,
  sort?: string,
) {
  const limit = 12; // Jumlah produk per halaman
  const skip = (page - 1) * limit; // Hitung jumlah produk yang dilewati berdasarkan halaman

  const sortOption =
    SORT_OPTIONS[sort as keyof typeof SORT_OPTIONS] ?? SORT_OPTIONS.populer;

  const products = await ProductRepository.findByKeyword(
    keyword,
    limit,
    skip,
    sortOption,
  );
  const totalProducts = await ProductRepository.countByKeyword(keyword);
  const tokoTerkait = [...new Set(products.map((el) => el.storeId.toString()))];
  const tokoTerkaitData = await StoreRepository.findStoreByIds(tokoTerkait);

  return {
    products: products.map(toProdukResponse),
    totalProducts,
    page,
    totalPages: Math.ceil(totalProducts / limit),
    stores: tokoTerkaitData.map((store) => ({
      ...store,
      _id: store._id.toString(),
    })),
  };
}

export async function getProductByStoreId(storeId: string) {
  const products = await ProductRepository.findByStoreId(storeId);

  return products.map((el) => ({
    ...el,
    _id: el._id.toString(),
  }));
}
