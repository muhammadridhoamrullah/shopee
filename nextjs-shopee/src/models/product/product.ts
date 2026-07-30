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
