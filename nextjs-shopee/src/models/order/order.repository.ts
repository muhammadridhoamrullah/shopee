import { getDB } from "@/src/db/config";
import { Order } from "@/src/type/order";

const COLLECTION_NAME = "orders";

export class OrderRepository {
  static async createOrder(order: Omit<Order, "_id">) {
    const db = await getDB();
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.insertOne(order);
    return result;
  }

  static async findByOrderId(orderId: string) {
    const db = await getDB();
    const collection = db.collection<Order>(COLLECTION_NAME);

    const order = await collection.findOne({ orderId });
    return order;
  }

  static async updateOrderStatus(orderId: string, status: Order["status"]) {
    const db = await getDB();
    const collection = db.collection<Order>(COLLECTION_NAME);

    await collection.updateOne(
      {
        orderId,
      },
      {
        $set: { status, updatedAt: new Date() },
      },
    );
  }
}
