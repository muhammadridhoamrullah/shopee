import { getDB } from "@/src/db/config";
import { DiscountDokumen } from "@/src/type/discount";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "productDiscounts";

export class DiscountRepository {
  // Cek apakah produk ini sudah memiliki diskon atau belum?
  static async findActiveDiscountByProductId(productId: ObjectId) {
    const db = await getDB();
    const now = new Date();

    const result = await db
      .collection<DiscountDokumen>(COLLECTION_NAME)
      .findOne({
        productId,
        startTime: {
          $lte: now,
        },
        endTime: {
          $gt: now,
        },
        deletedAt: { $exists: false },
      });

    return result;
  }

  //   Cek apakah produk semua ini sudah memiliki diskon atau belum?
  static async findActiveDiscountsByProductIds(productIds: ObjectId[]) {
    const db = await getDB();
    const now = new Date();

    const result = await db
      .collection<DiscountDokumen>(COLLECTION_NAME)
      .find({
        productId: { $in: productIds },
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

  // Cek overlapping discount untuk produk tertentu
  static async overLappingDiscount(productId: ObjectId) {
    const db = await getDB();

    const result = await db
      .collection<DiscountDokumen>(COLLECTION_NAME)
      .findOne({
        productId,
        endTime: { $gt: new Date() },
        deletedAt: { $exists: false },
      });
    return result;
  }

  //   Create new discount untuk sebuah produk
  static async createDiscount(discount: Omit<DiscountDokumen, "_id">) {
    const db = await getDB();

    const result = await db.collection(COLLECTION_NAME).insertOne(discount);

    return result;
  }
}
