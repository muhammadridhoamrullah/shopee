import { getDB } from "@/src/db/config";
import { ProdukDokumen } from "@/src/type/produk";
import { escapeRegex } from "@/src/utils/Navbar/navbar";
import { Document, ObjectId, Sort } from "mongodb";

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

  static async findByCategoryIds(
    categoryIds: ObjectId[],
    limit: number,
    skip: number,
    sort: Sort,
  ) {
    const db = await getDB();

    return db
      .collection<ProdukDokumen>(COLLECTION_NAME)
      .find({ categoryId: { $in: categoryIds } })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();
  }

  static async countByCategoryIds(categoryIds: ObjectId[]) {
    const db = await getDB();

    return db.collection<ProdukDokumen>(COLLECTION_NAME).countDocuments({
      categoryId: { $in: categoryIds },
    });
  }

  static async findByKeyword(
    keyword: string,
    limit: number,
    skip: number,
    sort: Sort,
  ) {
    const db = await getDB();

    return db
      .collection<ProdukDokumen>(COLLECTION_NAME)
      .find({
        name: { $regex: escapeRegex(keyword), $options: "i" },
      })
      .sort(sort)
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

  static async findByStoreId(storeId: string, sortBy?: string) {
    const db = await getDB();

    const pipeline: Document[] = [
      { $match: { storeId: new ObjectId(storeId) } },
    ];

    if (sortBy === "terlaris") {
      pipeline.push({ $sort: { sold: -1 } }, { $limit: 5 });
    } else if (sortBy === "terbaru") {
      pipeline.push({ $sort: { createdAt: -1 } }, { $limit: 5 });
    } else if (sortBy === "mungkinKamuSuka") {
      pipeline.push({ $sample: { size: 5 } });
    }

    pipeline.push({
      $project: {
        _id: 1,
        name: 1,
        slug: 1,
        images: 1,
        price: 1,
        discountPercent: 1,
        sold: 1,
      },
    });

    return db
      .collection<ProdukDokumen>(COLLECTION_NAME)
      .aggregate<
        Pick<
          ProdukDokumen,
          | "_id"
          | "name"
          | "slug"
          | "images"
          | "price"
          | "discountPercent"
          | "sold"
        >
      >(pipeline)
      .toArray();
  }
}
