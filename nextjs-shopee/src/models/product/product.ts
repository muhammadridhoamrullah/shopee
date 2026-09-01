import { toProdukResponse } from "@/src/helpers/utils";
import { ProductRepository } from "./product.repository";
import { cache } from "react";
import { SORT_OPTIONS } from "@/src/type/category";
import { StoreRepository } from "../store/store.repository";
import { FlashSaleRepository } from "../flashSale/flashSale.repository";

export const getProductBySlug = cache(async (slug: string) => {
  // Ambil data produk dari repository
  const product = await ProductRepository.findBySlug(slug);

  if (!product) {
    return null;
  }

  const flashSale =
    await FlashSaleRepository.findActiveFlashSaleItemByProductId(product._id);

  return toProdukResponse(product, flashSale ?? undefined);
});

export const getAllProducts = cache(async () => {
  const products = await ProductRepository.findAll();

  const flashSaleItems =
    await FlashSaleRepository.findActiveFlashSaleItemsByProductIds(
      products.map((el) => el._id),
    );

  return products.map((product) =>
    toProdukResponse(
      product,
      flashSaleItems.find((el) => el.productId.equals(product._id)),
    ),
  );
});

export async function getProductsForRecommendation(sample: number) {
  const products = await ProductRepository.findRandomRecommendation(sample);

  return products.map((el) => ({
    ...el,
    _id: el._id.toString(),
  }));
}

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
  console.log(products, "pada products");

  const flashSaleItems =
    await FlashSaleRepository.findActiveFlashSaleItemsByProductIds(
      products.map((el) => el._id),
    );
  console.log(flashSaleItems, "pada search");

  const totalProducts = await ProductRepository.countByKeyword(keyword);
  const tokoTerkait = [...new Set(products.map((el) => el.storeId.toString()))];
  const tokoTerkaitData = await StoreRepository.findStoreByIds(tokoTerkait);

  return {
    products: products.map((product) =>
      toProdukResponse(
        product,
        flashSaleItems.find((el) => el.productId.equals(product._id)),
      ),
    ),
    totalProducts,
    page,
    totalPages: Math.ceil(totalProducts / limit),
    stores: tokoTerkaitData.map((store) => ({
      ...store,
      _id: store._id.toString(),
    })),
  };
}
// _id: new ObjectId('6a6ee56e0798c70ca1aa8400'),
// productId: new ObjectId('6a6ee56e0798c70ca1aa8400'),
export async function getProductByStoreIdWithSort(
  storeId: string,
  sortBy?: string,
) {
  const products = await ProductRepository.findByStoreId(storeId, sortBy);

  return products.map((el) => ({
    ...el,
    _id: el._id.toString(),
  }));
}

export async function getProductTerlarisPreview() {
  const products = await ProductRepository.findProdukTerlaris(12, 0);

  return products.map((el) => ({
    ...el,
    _id: el._id.toString(),
  }));
}

export async function getProductTerlarisPage(page: number) {
  const limit = 12; // Jumlah produk per halaman
  const skip = (page - 1) * limit; // Hitung jumlah produk yang dilewati berdasarkan halaman

  const products = await ProductRepository.findProdukTerlaris(limit, skip);
  const totalProducts = await ProductRepository.countAllProduk();

  return {
    products: products.map((el) => ({
      ...el,
      _id: el._id.toString(),
    })),
    totalProducts,
    page,
    totalPages: Math.ceil(totalProducts / limit),
  };
}
