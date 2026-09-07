import { jadikanWIB } from "@/src/helpers/flashSale";
import { ProductRepository } from "../product/product.repository";
import { StoreRepository } from "../store/store.repository";
import { DiscountRepository } from "./discount.repository";

// Untuk membuat discount terhadap sebuah produk
export async function createDiscount(input: {
  userId: string;
  productId: string;
  discountPrice: number;
  tanggalAwal: string;
  jamAwal: string;
  menitAwal?: string;
  tanggalAkhir: string;
  jamAkhir: string;
  menitAkhir?: string;
}) {
  //   1. Validasi apakah userId memiliki toko yang sama dengan storeId
  const storeUser = await StoreRepository.findStoreByUserId(input.userId);

  //   1.1 Cek jika user tidak memiliki toko, maka return error
  if (!storeUser) throw new Error("User tidak memiliki toko");

  //   2. Cek produk ada dan milik toko user tersebut
  const product = await ProductRepository.findById(input.productId);

  //   2.1 Cek apakah produk ada, jika tidak ada return error
  if (!product) throw new Error("Produk tidak ditemukan");

  //   2.2 Cek apakah produk milik toko user tersebut, jika tidak return error
  if (!product.storeId.equals(storeUser._id))
    throw new Error("Produk tidak dimiliki oleh user ini");

  //   3. Harga diskon harus lebih dari 0 dan lebih kecil dari harga normal produk
  if (input.discountPrice <= 0 || input.discountPrice >= product.price)
    throw new Error(
      "Harga diskon harus lebih dari 0 dan lebih kecil dari harga normal produk",
    );

  // 4. Rakit tanggal dan jam menjadi Date Object
  const [tanggalAwal, bulanAwal, hariAwal] = input.tanggalAwal
    .split("-")
    .map(Number);

  const waktuAwal = jadikanWIB(
    tanggalAwal,
    bulanAwal,
    hariAwal,
    Number(input.jamAwal),
    Number(input.menitAwal || 0),
  );
  console.log(waktuAwal, "waktuAwal Cuy");

  const [tanggalAkhir, bulanAkhir, hariAkhir] = input.tanggalAkhir
    .split("-")
    .map(Number);

  const waktuAkhir = jadikanWIB(
    tanggalAkhir,
    bulanAkhir,
    hariAkhir,
    Number(input.jamAkhir),
    Number(input.menitAkhir || 0),
  );

  //   5. Validasi waktu awal harus lebih kecil dari waktu akhir
  if (waktuAwal >= waktuAkhir)
    throw new Error("Waktu awal harus lebih kecil dari waktu akhir");

  // 6. Validasi waktu awal dan akhir tidak boleh lewat dari sekarang
  if (waktuAkhir <= new Date())
    throw new Error("Waktu akhir tidak boleh lewat dari sekarang");

  // 7. Durasi diskon tidak boleh lebih dari 90 hari
  const durasiDiskon =
    (waktuAkhir.getTime() - waktuAwal.getTime()) / (1000 * 60 * 60 * 24);
  if (durasiDiskon > 90)
    throw new Error("Durasi diskon tidak boleh lebih dari 90 hari");

  // 8. Validasi produk tidak boleh memiliki diskon yang tumpang tindih
  const overLappingDiscounts = await DiscountRepository.overLappingDiscount(
    product._id,
  );

  //   8.1 Jika ada diskon yang tumpang tindih, maka return error
  if (overLappingDiscounts)
    throw new Error("Produk ini sudah memiliki diskon yang tumpang tindih");

  //   9. Jika semua validasi lolos, maka buat diskon baru
  const inputDiscountItem = await DiscountRepository.createDiscount({
    productId: product._id,
    storeId: storeUser._id,
    discountPrice: input.discountPrice,
    startTime: waktuAwal,
    endTime: waktuAkhir,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  //   10. Return id diskon baru
  return inputDiscountItem.insertedId.toString();
}
