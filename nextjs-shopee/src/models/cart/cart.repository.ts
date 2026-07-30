import { getDB } from "@/src/db/config";
import { Cart } from "@/src/type/cart";
import { ObjectId } from "mongodb";

export class CartRepository {
  static async addItem(
    userId: ObjectId,
    productId: ObjectId,
    quantity: number,
  ) {
    const db = await getDB();
    const collection = db.collection<Cart>("carts");

    // Percobaan 1: Produk sudah ada di cart, update quantity
    const incrementProductQuantity = await collection.updateOne(
      {
        userId,
        "items.productId": productId,
      },
      {
        $inc: { "items.$.quantity": quantity },
        $set: { updatedAt: new Date() },
      },
    );

    if (incrementProductQuantity.matchedCount > 0) {
      return;
    }

    // Percobaan 2: Produk belum ada di cart, tambahkan item baru
    await collection.updateOne(
      {
        userId,
      },
      {
        $push: { items: { productId, quantity } },
        $setOnInsert: { createdAt: new Date() },
        $set: { updatedAt: new Date() },
      },
      {
        upsert: true,
      },
    );
  }

  static async findByUserId(userId: ObjectId) {
    const db = await getDB();
    return db.collection<Cart>("carts").findOne({ userId });
  }

  static async clearCart(userId: ObjectId) {
    const db = await getDB();
    await db.collection<Cart>("carts").updateOne(
      {
        userId,
      },
      {
        $set: { items: [], updatedAt: new Date() },
      },
    );
  }
}
