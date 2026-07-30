import { ObjectId } from "mongodb";
import { ProductRepository } from "../product/product.repository";
import { OrderRepository } from "./order.repository";
import { CartRepository } from "../cart/cart.repository";
import { snap } from "@/src/helpers/midtrans";
import crypto from "crypto";

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

  const today = new Date();
  const datePart = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
  const hourMinuteSecond = `${String(today.getHours()).padStart(2, "0")}${String(today.getMinutes()).padStart(2, "0")}${String(today.getSeconds()).padStart(2, "0")}`;
  const last5Digits = new ObjectId(userId).toString().slice(-5);
  const string4Randoms = crypto.randomUUID().slice(0, 8);
  const orderId = `SHOPEEBUYNOW${datePart}${hourMinuteSecond}${string4Randoms}${last5Digits}`;

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
    status: "pending",
    orderId: orderId,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id: orderId,
      gross_amount: totalPrice,
    },
    item_details: [
      {
        id: findProductById._id.toString(),
        price: findProductById.price,
        quantity: quantity,
        name: findProductById.name.slice(0, 50),
      },
    ],
  });

  return { orderId, token: transaction.token };
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

  const today = new Date();
  const datePart = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
  const hourMinuteSecond = `${String(today.getHours()).padStart(2, "0")}${String(today.getMinutes()).padStart(2, "0")}${String(today.getSeconds()).padStart(2, "0")}`;
  const last5Digits = new ObjectId(userId).toString().slice(-5);
  const string4Randoms = crypto.randomUUID().slice(0, 8);
  const orderId = `SHOPEECART${datePart}${hourMinuteSecond}${string4Randoms}${last5Digits}`;

  const result = await OrderRepository.createOrder({
    userId: new ObjectId(userId),
    items: orderItems,
    totalPrice,
    status: "pending",
    orderId: orderId,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id: orderId,
      gross_amount: totalPrice,
    },
    item_details: orderItems.map((item) => ({
      id: item.productId.toString(),
      price: item.price,
      quantity: item.quantity,
      name: item.name.slice(0, 50),
    })),
  });

  await CartRepository.clearCart(new ObjectId(userId));

  return { orderId, token: transaction.token };
}

export async function handlePaymentNotification(payload: {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
  transaction_status: string;
}) {
  const expectedSignature = crypto
    .createHash("sha512")
    .update(
      payload.order_id +
        payload.status_code +
        payload.gross_amount +
        process.env.MIDTRANS_SERVER_KEY,
    )
    .digest("hex");

  if (expectedSignature !== payload.signature_key) {
    throw new Error("Invalid signature key");
  }

  const order = await OrderRepository.findByOrderId(payload.order_id);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order?.status === "paid") {
    return; // Jika status sudah "paid", tidak perlu melakukan update lagi
  }

  if (
    payload.transaction_status === "settlement" ||
    payload.transaction_status === "capture"
  ) {
    await OrderRepository.updateOrderStatus(payload.order_id, "paid");

    for (const item of order?.items) {
      await ProductRepository.decreaseAndIncreaseSold(
        item.productId,
        item.quantity,
      );
    }
  } else if (
    payload.transaction_status === "expire" ||
    payload.transaction_status === "cancel" ||
    payload.transaction_status === "deny"
  ) {
    await OrderRepository.updateOrderStatus(payload.order_id, "cancelled");
  }
}

export async function getOrderByOrderId(orderId: string) {
  const order = await OrderRepository.findByOrderId(orderId);

  if (!order) return null;

  return {
    ...order,
    _id: order._id.toString(),
    userId: order.userId.toString(),
    items: order.items.map((item) => ({
      ...item,
      productId: item.productId.toString(),
    })),
  };
}
