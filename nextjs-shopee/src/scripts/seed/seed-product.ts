import { closeMongoClient, getDB } from "@/src/db/config";
import { produkSeedData } from "../data/product";

async function seedProducts() {
  try {
    const db = await getDB();

    const collection = db.collection("products");

    await collection.deleteMany({}); // Hapus semua dokumen yang ada
    const result = await collection.insertMany(produkSeedData); // Masukkan data seed
    await collection.createIndex({ slug: 1 }, { unique: true }); // Membuat index unik pada field slug
    await collection.createIndex({ sold: -1, createdAt: -1, _id: -1 }); // Membuat index untuk sorting produk terlaris

    console.log(`Seeded ${result.insertedCount} products.`);
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    await closeMongoClient(); // Pastikan koneksi MongoDB ditutup setelah selesai
  }
}

seedProducts();
