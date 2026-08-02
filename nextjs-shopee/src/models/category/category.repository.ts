import { getDB } from "@/src/db/config";
import { KategoriDokumen } from "@/src/type/category";
import { ObjectId } from "mongodb";
const COLLECTION_NAME = "categories";
export class CategoryRepository {
  static async findBySlug(slug: string) {
    const db = await getDB();

    const findCategoryBySlug = await db
      .collection<KategoriDokumen>(COLLECTION_NAME)
      .findOne({ slug });
    return findCategoryBySlug;
  }

  static async findById(id: string) {
    const db = await getDB();

    return db.collection<KategoriDokumen>(COLLECTION_NAME).findOne({
      _id: new ObjectId(id),
    });
  }

  static async findByIds(ids: ObjectId[]) {
    const db = await getDB();

    return db
      .collection<KategoriDokumen>(COLLECTION_NAME)
      .find({ _id: { $in: ids } })
      .toArray();
  }

  static async findDescendants(categoryId: ObjectId) {
    const db = await getDB();

    return db
      .collection<KategoriDokumen>(COLLECTION_NAME)
      .find({ ancestorsId: categoryId })
      .toArray();
  }
}
