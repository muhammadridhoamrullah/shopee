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

export async function getCartByUserId(userId: string) {
  const cart = await CartRepository.findByUserId(new ObjectId(userId));

  if (!cart || cart.items.length === 0) {
    return { items: [], totalPrice: 0 };
  }

  const items = [];
  let totalPrice = 0;

  for (const item of cart.items) {
    const product = await ProductRepository.findById(item.productId.toString());

    if (!product) continue;
    // Jika produk tidak ditemukan / dihapus, lewati item ini

    const subTotal = product.price * item.quantity;
    totalPrice += subTotal;

    items.push({
      productId: item.productId.toString(),
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      image: product.images[0],
      subtotal: subTotal,
    });
  }
  return { items, totalPrice };
}
