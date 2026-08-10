import { closeMongoClient, getDB } from "@/src/db/config";
import { FLASH_SALE_SLOTS, jadikanWIB } from "@/src/helpers/flashSale";
import { FlashSaleItemDokumen } from "@/src/type/flashSale";
import { ProdukDokumen } from "@/src/type/produk";

async function seedFlashSale() {
  try {
    const db = await getDB();

    // Ambil data produk yang sudah ada di database (ambil _id asli)
    const products = await db
      .collection<ProdukDokumen>("products")
      .find()
      .toArray();

    //   Cek jika tidak ada produk, hentikan proses seeding
    if (products.length === 0) {
      console.log("Tidak ada produk yang tersedia untuk seeding flash sale.");
      return;
    }

    // Cari tanggal hari ini menurut WIB
    const today = new Date();
    const wibOffset = 7 * 60; // WIB offset dalam menit
    const wibtTime = new Date(today.getTime() + wibOffset * 60 * 1000);
    const tahun = wibtTime.getUTCFullYear();
    const bulan = wibtTime.getUTCMonth() + 1; // Bulan dimulai dari 0, jadi tambahkan 1
    const tanggal = wibtTime.getUTCDate();

    // Buat variabel untuk menyimpan data flash sale
    const items: Omit<FlashSaleItemDokumen, "_id">[] = [];

    FLASH_SALE_SLOTS.forEach((slot, indexSlot) => {
      // Tiap slot ambil 4 produk
      for (let i = 0; i < 4; i++) {
        const product = products[(indexSlot * 4 + i) % products.length]; // Ambil produk secara berulang jika kurang dari 4 produk

        items.push({
          productId: product._id,
          storeId: product.storeId,
          flashPrice: Math.round(product.price * (0.5 + Math.random() * 0.5)), // Harga flash sale antara 50% hingga 100% dari harga asli
          flashStock: 20,
          flashSold: Math.floor(Math.random() * 15), // Jumlah terjual acak antara 0 hingga 14
          startTime: jadikanWIB(tahun, bulan, tanggal, slot.start),
          endTime: jadikanWIB(tahun, bulan, tanggal, slot.end),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    const collection = db.collection("flashSaleItems");

    await collection.deleteMany({}); // Hapus semua dokumen yang ada
    const result = await collection.insertMany(items); // Masukkan data seed
    await collection.createIndex({ startTime: 1, endTime: 1 }); // Membuat index pada field startTime dan endTime

    console.log(`Seeded ${result.insertedCount} flash sale items.`);
  } catch (error) {
    console.error("Error occurred while seeding flash sale:", error);
  } finally {
    // Pastikan koneksi MongoDB ditutup setelah selesai
    await closeMongoClient();
  }
}

seedFlashSale();
