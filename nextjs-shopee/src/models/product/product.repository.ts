import { getDB } from "@/src/db/config";
import { ProdukDokumen } from "@/src/type/produk";
import { escapeRegex } from "@/src/utils/Navbar/navbar";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "products";

export class ProductRepository {
  static async findBySlug(slug: string) {
    const db = await getDB();

    const findProductBySlug = await db
      .collection<ProdukDokumen>(COLLECTION_NAME)
      .findOne({
        slug,
      });

    return findProductBySlug;
  }

  static async findAll() {
    const db = await getDB();
    const findAllProducts = db
      .collection<ProdukDokumen>(COLLECTION_NAME)
      .find()
      .toArray();

    return findAllProducts;
  }

  static async findById(id: string) {
    const db = await getDB();

    const findProductById = db
      .collection<ProdukDokumen>(COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });
    return findProductById;
  }

  static async decreaseAndIncreaseSold(productId: ObjectId, quantity: number) {
    const db = await getDB();
    await db.collection<ProdukDokumen>(COLLECTION_NAME).updateOne(
      {
        _id: productId,
      },
      {
        $inc: {
          quantity: -quantity,
          sold: quantity,
        },
        $set: {
          updatedAt: new Date(),
        },
      },
    );
  }

  static async findByCategoryIds(categoryIds: ObjectId[]) {
    const db = await getDB();

    return db
      .collection<ProdukDokumen>(COLLECTION_NAME)
      .find({ categoryId: { $in: categoryIds } })
      .toArray();
  }

  static async findByKeyword(keyword: string, limit: number, skip: number) {
    const db = await getDB();

    return db
      .collection<ProdukDokumen>(COLLECTION_NAME)
      .find({
        name: { $regex: escapeRegex(keyword), $options: "i" },
      })
      .skip(skip)
      .limit(limit)
      .toArray();
  }

  static async countByKeyword(keyword: string) {
    const db = await getDB();

    return db.collection<ProdukDokumen>(COLLECTION_NAME).countDocuments({
      name: { $regex: escapeRegex(keyword), $options: "i" },
    });
  }
}
