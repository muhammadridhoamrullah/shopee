import { ObjectId } from "mongodb";

export interface FlashSaleItemDokumen {
  _id: ObjectId;
  productId: ObjectId;
  storeId: ObjectId;
  flashPrice: number;
  flashStock: number;
  flashSold: number;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface FlashSaleItemResponse {
  _id: string;
  productId: string;
  storeId: string;
  flashPrice: number;
  flashStock: number;
  flashSold: number;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface FlashSaleProdukResponse {
  _id: string;
  productId: string;
  name: string;
  slug: string;
  image: string;
  flashPrice: number;
  normalPrice: number;
  discountPercent: number;
  flashStock: number;
  flashSold: number;
  endTime: Date;
}

export interface InputItemFlashSale {
  productId: string;
  flashPrice: number;
  flashStock: number;
  tanggal: string;
  slotStart: number;
}
