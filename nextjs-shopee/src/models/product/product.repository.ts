import { getDB } from "@/src/db/config";
import { ProdukDokumen } from "@/src/type/produk";
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
}
