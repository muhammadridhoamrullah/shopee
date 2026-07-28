import { closeMongoClient, getDB } from "@/src/db/config";

async function setupCartIndex() {
    try {
        const db = await getDB()
        const collection = db.collection("carts");

        await collection.createIndex({ userId: 1 }, { unique: true }); // Membuat index unik pada field userId

        console.log("Cart index setup completed successfully.");
        
    } catch (error) {
        console.error("Error setting up cart index:", error);
    } finally {
        await closeMongoClient(); // Pastikan koneksi MongoDB ditutup setelah selesai
    }
}

setupCartIndex();