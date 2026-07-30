import { closeMongoClient, getDB } from "@/src/db/config";
import { storeSeedData } from "../data/store";

async function seedStores() {
  try {
    const db = await getDB();
    const collection = db.collection("stores");

    // Hapus semua dokumen yang ada
    await collection.deleteMany({});
    // Masukkan data seed
    const result = await collection.insertMany(storeSeedData);
    await collection.createIndex({ userId: 1 }, { unique: true }); // Membuat index unik pada field userId

    console.log(`Seeded ${result.insertedCount} stores.`);
  } catch (error) {
    console.error("Error seeding stores:", error);
  } finally {
    await closeMongoClient(); // Pastikan koneksi MongoDB ditutup setelah selesai
  }
}

seedStores();
