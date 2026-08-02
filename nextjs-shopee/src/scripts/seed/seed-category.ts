import { closeMongoClient, getDB } from "@/src/db/config";
import { categorySeedData } from "../data/category";

async function seedCategories() {
  try {
    const db = await getDB();
    const collection = db.collection("categories");

    await collection.deleteMany({}); // Hapus semua dokumen yang ada
    const result = await collection.insertMany(categorySeedData); // Masukkan data seed
    await collection.createIndex({ slug: 1 }, { unique: true }); // Membuat index unik pada field slug

    console.log(`Seeded ${result.insertedCount} categories.`);
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    await closeMongoClient(); // Pastikan koneksi MongoDB ditutup setelah selesai
  }
}

seedCategories();
