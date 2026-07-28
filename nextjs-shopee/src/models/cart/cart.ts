import { ObjectId } from "mongodb";
import { ProductRepository } from "../product/product.repository";
import { CartRepository } from "./cart.repository";

export async function addToCart(
  userId: string,
  productId: string,
  quantity: number,
) {
  // Cek apakah produk memang ada di database
  const produk = await ProductRepository.findById(productId);

  if (!produk) {
    throw new Error("Produk tidak ditemukan");
  }

  await CartRepository.addItem(
    new ObjectId(userId),
    new ObjectId(productId),
    quantity,
  );
}
