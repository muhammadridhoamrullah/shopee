import { ObjectId } from "mongodb";

export interface DiscountDokumen {
  _id: ObjectId;
  productId: ObjectId;
  storeId: ObjectId;
  discountPrice: number;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface DiscountResponse {
  _id: string;
  productId: string;
  storeId: string;
  discountPrice: number;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface InputItemDiscount {
  productId: string;
  discountPrice: number;
  tanggal: string;
  slotStart: number;
}

export type SumberPromo = "flashSale" | "discount" | "normal";

export interface HasilHitungHarga {
  // yang benar-benar dibayar
  effectivePrice: number;
  //   harga coret, hanya ada kalau promo
  strikePrice?: number;
  //   Persentase Diskon, seperti -30% pada badge
  discountPercentage?: number;
  //   Sumber Promo apakah flashSale, discount, atau normal
  promoSource: SumberPromo;
}
