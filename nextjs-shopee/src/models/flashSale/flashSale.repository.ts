import { getDB } from "@/src/db/config";
import { FlashSaleItemDokumen } from "@/src/type/flashSale";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "flashSaleItems";

export class FlashSaleRepository {
  // Semua item yang flash sale yang sedang berlangsung
  static async findActiveFlashSaleItems() {
    const db = await getDB();
    const now = new Date();

    const result = await db
      .collection<FlashSaleItemDokumen>(COLLECTION_NAME)
      .find({
        startTime: {
          $lte: now,
        },
        endTime: {
          $gt: now,
        },
        deletedAt: { $exists: false },
      })
      .toArray();

    return result;
  }

  //   Cek apakah SATU produk sedang berlangsung flash sale atau tidak ( dipakai di halaman detail produk )
  static async findActiveFlashSaleItemByProductId(productId: ObjectId) {
    const db = await getDB();
    const now = new Date();

    const result = await db
      .collection<FlashSaleItemDokumen>(COLLECTION_NAME)
      .findOne({
        productId,
        startTime: {
          $lte: now,
        },
        endTime: {
          $gt: now,
        },
        deletedAt: { $exists: false },
        $expr: { $lt: ["$flashSold", "$flashStock"] }, // Pastikan flashSold < flashStock
      });

    return result;
  }

  // Cek apakah produk-produk ini sedang berlangsung flash sale atau tidak?
  static async findActiveFlashSaleItemsByProductIds(productIds: ObjectId[]) {
    const db = await getDB();
    const now = new Date();

    const result = await db
      .collection<FlashSaleItemDokumen>(COLLECTION_NAME)
      .find({
        productId: { $in: productIds },
        startTime: {
          $lte: now,
        },
        endTime: {
          $gt: now,
        },
        deletedAt: { $exists: false },
        $expr: { $lt: ["$flashSold", "$flashStock"] }, // Pastikan flashSold < flashStock
      })
      .toArray();

    return result;
  }

  static async create(item: Omit<FlashSaleItemDokumen, "_id">) {
    const db = await getDB();
    const result = await db.collection(COLLECTION_NAME).insertOne(item);
    return result;
  }

  static async findOverlapping(
    productId: ObjectId,
    startTime: Date,
    endTime: Date,
  ) {
    const db = await getDB();

    return db.collection<FlashSaleItemDokumen>(COLLECTION_NAME).findOne({
      productId,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
      deletedAt: { $exists: false },
    });
  }
}
