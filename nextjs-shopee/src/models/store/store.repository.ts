import { getDB } from "@/src/db/config";
import { StoreDokumen } from "@/src/type/store";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "stores";

export class StoreRepository {
  static async findStoreByUserId(userId: string) {
    const db = await getDB();

    return db
      .collection<StoreDokumen>(COLLECTION_NAME)
      .findOne({ userId: new ObjectId(userId) });
  }

  static async creatingStore(storeData: Omit<StoreDokumen, "_id">) {
    const db = await getDB();
    const collection = db.collection(COLLECTION_NAME);

    const result = await collection.insertOne(storeData);
    return result;
  }

  static async findStoreById(storeId: string) {
    const db = await getDB();
    const collection = db.collection<StoreDokumen>(COLLECTION_NAME);
    return collection.findOne({ _id: new ObjectId(storeId) });
  }
}
