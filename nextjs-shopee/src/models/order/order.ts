import { ObjectId } from "mongodb";
import { ProductRepository } from "../product/product.repository";
import { OrderRepository } from "./order.repository";

export async function beliSekarang(
  userId: string,
  productId: string,
  quantity: number,
) {
  // Cari produk terlebih dahulu untuk memastikan produk tersebut ada
  const findProductById = await ProductRepository.findById(productId);

  //   Cek apakah produk ditemukan
  if (!findProductById) {
    throw new Error("Produk tidak ditemukan");
  }

  //   Update totalPrice berdasarkan quantity yang dibeli
  const totalPrice = findProductById.price * quantity;

  // Lakukan logika pembelian
  const result = await OrderRepository.createOrder({
    userId: new ObjectId(userId),
    items: [
      {
        productId: new ObjectId(productId),
        name: findProductById.name,
        image: findProductById.image,
        price: findProductById.price,
        quantity: quantity,
      },
    ],
    totalPrice,
    status: "paid",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  return result.insertedId.toString();
}
