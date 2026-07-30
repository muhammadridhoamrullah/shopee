import { ObjectId } from "mongodb";
import { ProductRepository } from "../product/product.repository";
import { OrderRepository } from "./order.repository";
import { CartRepository } from "../cart/cart.repository";

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

export async function checkoutKeranjang(userId: string) {
  const cart = await CartRepository.findByUserId(new ObjectId(userId));

  if (!cart || cart.items.length === 0) {
    throw new Error("Keranjang kosong");
  }

  const orderItems = [];
  let totalPrice = 0;

  for (const item of cart.items) {
    const produk = await ProductRepository.findById(item.productId.toString());

    if (!produk) continue; // Jika produk tidak ditemukan / dihapus, lewati item ini

    orderItems.push({
      productId: item.productId,
      name: produk.name,
      image: produk.image,
      price: produk.price,
      quantity: item.quantity,
    });
    totalPrice += produk.price * item.quantity;
  }

  if (orderItems.length === 0) {
    throw new Error("Tidak ada produk valid untuk checkout");
  }

  const result = await OrderRepository.createOrder({
    userId: new ObjectId(userId),
    items: orderItems,
    totalPrice,
    status: "paid",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  await CartRepository.clearCart(new ObjectId(userId));

  return result.insertedId.toString();
}
