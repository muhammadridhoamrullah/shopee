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
}
