import {
  DiscountDokumen,
  HasilHitungHarga,
  SumberPromo,
} from "@/src/type/discount";
import { FlashSaleItemDokumen } from "@/src/type/flashSale";

export function hitungHarga(
  hargaNormal: number,
  flashSale?: FlashSaleItemDokumen,
  discount?: DiscountDokumen,
): HasilHitungHarga {
  // 1. Definisikan variabel untuk menyimpan harga yang akan dikembalikan
  //   2. Tentukan sumber promo yang berlaku (flashSale, discount, atau normal) berdasarkan kondisi yang diberikan
  let hargaPromo: number | undefined;
  let sumberPromo: SumberPromo = "normal";

  //   3. Atur Prioritas penentuan harga promo berdasarkan kondisi yang diberikan
  if (flashSale && flashSale.flashPrice < hargaNormal) {
    hargaPromo = flashSale.flashPrice;
    sumberPromo = "flashSale";
  } else if (discount && discount.discountPrice < hargaNormal) {
    hargaPromo = discount.discountPrice;
    sumberPromo = "discount";
  }

  //   4. Jika tidak ada promo yang berlaku, harga normal, tanpa coretan, tanpa badge
  if (hargaPromo === undefined) {
    return {
      effectivePrice: hargaNormal,
      promoSource: sumberPromo,
    };
  }

  //   5. Jika ada promo yang berlaku, hitung harga coret dan persentase diskon
  return {
    effectivePrice: hargaPromo,
    strikePrice: hargaNormal,
    discountPercentage: Math.round(
      ((hargaNormal - hargaPromo) / hargaNormal) * 100,
    ),
    promoSource: sumberPromo,
  };
}
