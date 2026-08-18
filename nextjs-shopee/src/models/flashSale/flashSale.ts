import { FLASH_SALE_SLOTS, jadikanWIB } from "@/src/helpers/flashSale";
import { ProductRepository } from "../product/product.repository";
import { StoreRepository } from "../store/store.repository";
import { FlashSaleRepository } from "./flashSale.repository";

export async function getActiveFlashSale() {
  // Ambil semua item flash sale yang sedang berlangsung
  const items = await FlashSaleRepository.findActiveFlashSaleItems();

  // Jika tidak ada item flash sale yang sedang berlangsung, kembalikan []
  if (items.length === 0) {
    return [];
  }

  // Ambil semua productId dari item flash sale yang sedang berlangsung
  const productIds = items.map((item) => item.productId);

  // Ambil semua produk yang sedang flash sale
  const products = await ProductRepository.findByIds(productIds);

  //   Peta produk
  const petaProduk = new Map(
    products.map((product) => [product._id.toString(), product]),
  );

  return items
    .map((item) => {
      const product = petaProduk.get(item.productId.toString());

      // Produk sudah dihapus tapi entri flash sale masih ada -- lewati
      if (!product) return null;

      return {
        _id: item._id.toString(),
        productId: item.productId.toString(),
        name: product.name,
        slug: product.slug,
        image: product.images[0],
        flashPrice: item.flashPrice,
        normalPrice: product.price,
        discountPercent: Math.round(
          ((product.price - item.flashPrice) / product.price) * 100,
        ),
        flashStock: item.flashStock,
        flashSold: item.flashSold,
        endTime: item.endTime,
      };
    })
    .filter((item) => item !== null); // Filter out null values
}

export async function createFlashSaleItem(input: {
  userId: string;
  productId: string;
  flashPrice: number;
  flashStock: number;
  tanggal: string;
  slotStart: number;
}) {
  // 1. User harus punya toko
  const storeUser = await StoreRepository.findStoreByUserId(input.userId);

  if (!storeUser) {
    throw new Error("User tidak memiliki toko");
  }

  // 2. Produk harus ada dan milik si User
  const product = await ProductRepository.findById(input.productId);

  if (!product) {
    throw new Error("Produk tidak ditemukan");
  }

  if (!product.storeId.equals(storeUser._id)) {
    throw new Error("Produk tidak dimiliki oleh user ini");
  }

  // 3. Harga flash sale harus lebih kecil dari harga normal
  if (input.flashPrice >= product.price) {
    throw new Error("Harga flash sale harus lebih kecil dari harga normal");
  }

  // 4. Kuota flash sale harus lebih kecil dari stok produk
  if (input.flashStock > product.quantity) {
    throw new Error(
      "Kuota flash sale tidak boleh lebih besar dari stok produk",
    );
  }

  // 5. Slot flash sale harus yang terdaftar
  const slot = FLASH_SALE_SLOTS.find((el) => el.start === input.slotStart);

  if (!slot) {
    throw new Error("Slot flash sale tidak valid");
  }

  // 6. Hitung waktu sesungguhnya dari tanggal + slot
  const [tahun, bulan, hari] = input.tanggal.split("-").map(Number);
  const startTime = jadikanWIB(tahun, bulan, hari, slot.start);
  const endTime = jadikanWIB(tahun, bulan, hari, slot.end);

  // 7. Slot waktu belum lewat
  if (endTime <= new Date()) {
    throw new Error("Slot flash sale sudah lewat");
  }

  // 8. Pastikan produk belum terdaftar di flash sale yang sama
  const existingFlashSale = await FlashSaleRepository.findOverlapping(
    product._id,
    startTime,
    endTime,
  );

  if (existingFlashSale) {
    throw new Error("Produk sudah terdaftar di flash sale pada slot ini");
  }

  // 9. Buat entri flash sale
  const inputFlashSaleItem = await FlashSaleRepository.create({
    productId: product._id,
    storeId: storeUser._id,
    flashPrice: input.flashPrice,
    flashStock: input.flashStock,
    flashSold: 0,
    startTime,
    endTime,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return inputFlashSaleItem.insertedId.toString();
}


