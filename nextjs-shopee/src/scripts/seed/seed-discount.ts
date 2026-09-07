import { closeMongoClient, getDB } from "@/src/db/config";

async function seedDiscount() {
  try {
    const db = await getDB();

    // Ambil 5 produk secara acak dari koleksi "products"
    const products = await db
      .collection("products")
      .aggregate([{ $sample: { size: 5 } }])
      .toArray();

    // Cek jika tidak ada produk, hentikan proses seeding
    if (products.length === 0) {
      console.log("Tidak ada produk yang tersedia untuk seeding diskon.");
      return;
    }

    // Buat data diskon untuk setiap produk yang diambil
    const discounts = products.map((el) => {
      const discountPrice = Math.round(el.price * (0.5 + Math.random() * 0.5)); // Harga diskon antara 50% hingga 100% dari harga asli
      return {
        productId: el._id,
        storeId: el.storeId,
        discountPrice,
        startTime: new Date(),
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 hari dari sekarang
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const collection = db.collection("productDiscounts");

    // Delete terlebih dahulu semua dokumen yang ada di koleksi "productDiscounts" sebelum menambahkan data baru
    await collection.deleteMany({});
    // Masukkan data diskon ke koleksi "productDiscounts"
    const result = await collection.insertMany(discounts);
    // Buat index pada field productId, startTime, dan endTime

    await collection.createIndex({ productId: 1, startTime: 1, endTime: 1 });
    console.log(`Successfully seeded ${result.insertedCount} discounts.`);
  } catch (error) {
    console.error("Error occurred while seeding discount:", error);
  } finally {
    // Tutup koneksi database jika perlu
    await closeMongoClient();
  }
}

seedDiscount();

// export interface DiscountDokumen {
//   _id: ObjectId;
//   productId: ObjectId;
//   storeId: ObjectId;
//   discountPrice: number;
//   startTime: Date;
//   endTime: Date;
//   createdAt: Date;
//   updatedAt: Date;
//   deletedAt?: Date;
// }
