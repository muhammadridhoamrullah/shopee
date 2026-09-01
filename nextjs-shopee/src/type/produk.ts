import { ObjectId } from "mongodb";
import { FlashSaleItemDokumen, FlashSaleItemResponse } from "./flashSale";

export interface ProdukDokumen {
  _id: ObjectId;
  name: string;
  slug: string;
  categoryId: ObjectId;
  images: string[];
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  quantity: number;
  sold: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  storeId: ObjectId;
  flashSale?: FlashSaleItemDokumen;
}

export interface ProdukResponse {
  _id: string;
  name: string;
  slug: string;
  categoryId: string;
  images: string[];
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  quantity: number;
  sold: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  storeId: string;
  flashSale?: FlashSaleItemResponse;
}

export interface ProdukRingkas {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  price: number;
  discountPercent?: number;
  sold: number;
}
