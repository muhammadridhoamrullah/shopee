import { toProdukResponse } from "@/src/helpers/utils";
import { ProductRepository } from "./product.repository";
import { cache } from "react";

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

export async function getSearchProducts(keyword: string, page: number) {
  const limit = 12; // Jumlah produk per halaman
  const skip = (page - 1) * limit; // Hitung jumlah produk yang dilewati berdasarkan halaman

  const products = await ProductRepository.findByKeyword(keyword, limit, skip);
  const totalProducts = await ProductRepository.countByKeyword(keyword);

  return {
    products: products.map(toProdukResponse),
    totalProducts,
    page,
    totalPages: Math.ceil(totalProducts / limit),
  };
}
