import { toProdukResponse, toProdukRingkasResponse } from "@/src/helpers/utils";
import { ProductRepository } from "./product.repository";
import { cache } from "react";
import { SORT_OPTIONS } from "@/src/type/category";
import { StoreRepository } from "../store/store.repository";
import { FlashSaleRepository } from "../flashSale/flashSale.repository";
import { DiscountRepository } from "../discount/discount.repository";

export const getProductBySlug = cache(async (slug: string) => {
  // Ambil data produk dari repository
  const product = await ProductRepository.findBySlug(slug);

  if (!product) {
    return null;
  }

  const flashSale =
    await FlashSaleRepository.findActiveFlashSaleItemByProductId(product._id);

  const discount = await DiscountRepository.findActiveDiscountByProductId(
    product._id,
  );

  return toProdukResponse(
    product,
    flashSale ?? undefined,
    discount ?? undefined,
  );
});

export const getAllProducts = cache(async () => {
  const products = await ProductRepository.findAll();

  const flashSaleItems =
    await FlashSaleRepository.findActiveFlashSaleItemsByProductIds(
      products.map((el) => el._id),
    );

  const discounts = await DiscountRepository.findActiveDiscountsByProductIds(
    products.map((el) => el._id),
  );

  // Peta produk flash sale berdasarkan productId
  const petaProductFlashSale = new Map(
    flashSaleItems.map((el) => [el.productId.toString(), el]),
  );

  // Peta produk diskon berdasarkan productId
  const petaProductDiscount = new Map(
    discounts.map((el) => [el.productId.toString(), el]),
  );

  return products.map((product) =>
    toProdukResponse(
      product,
      petaProductFlashSale.get(product._id.toString()),
      petaProductDiscount.get(product._id.toString()),
    ),
  );
});

export async function getProductsForRecommendation(sample: number) {
  const products = await ProductRepository.findRandomRecommendation(sample);

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

  return products.map((product) =>
    toProdukRingkasResponse(
      product,
      petaProductFlashSale.get(product._id.toString()),
      petaProductDiscount.get(product._id.toString()),
    ),
  );
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

  const flashSaleItems =
    await FlashSaleRepository.findActiveFlashSaleItemsByProductIds(
      products.map((el) => el._id),
    );

  const discounts = await DiscountRepository.findActiveDiscountsByProductIds(
    products.map((el) => el._id),
  );

  const totalProducts = await ProductRepository.countByKeyword(keyword);
  const tokoTerkait = [...new Set(products.map((el) => el.storeId.toString()))];
  const tokoTerkaitData = await StoreRepository.findStoreByIds(tokoTerkait);

  // Peta produk flash sale berdasarkan productId
  const petaProductFlashSale = new Map(
    flashSaleItems.map((el) => [el.productId.toString(), el]),
  );

  // Peta produk discount berdasarkan productId
  const petaProductDiscount = new Map(
    discounts.map((el) => [el.productId.toString(), el]),
  );

  return {
    products: products.map((product) =>
      toProdukResponse(
        product,
        petaProductFlashSale.get(product._id.toString()),
        petaProductDiscount.get(product._id.toString()),
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

export async function getProductByStoreIdWithSort(
  storeId: string,
  sortBy?: string,
) {
  const products = await ProductRepository.findByStoreId(storeId, sortBy);

  // Cek apakah produk-produk ini memiliki flashSale?
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

  return products.map((product) =>
    toProdukRingkasResponse(
      product,
      petaProductFlashSale.get(product._id.toString()),
      petaProductDiscount.get(product._id.toString()),
    ),
  );
}

export async function getProductTerlarisPreview() {
  const products = await ProductRepository.findProdukTerlaris(12, 0);

  // Cek apakah produk-produk ini memiliki flashSale?
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

  return products.map((product) =>
    toProdukRingkasResponse(
      product,
      petaProductFlashSale.get(product._id.toString()),
      petaProductDiscount.get(product._id.toString()),
    ),
  );
}

export async function getProductTerlarisPage(page: number) {
  const limit = 12; // Jumlah produk per halaman
  const skip = (page - 1) * limit; // Hitung jumlah produk yang dilewati berdasarkan halaman

  const products = await ProductRepository.findProdukTerlaris(limit, skip);
  const totalProducts = await ProductRepository.countAllProduk();

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
