import { ObjectId } from "mongodb";
import { FlashSaleItemResponse } from "./flashSale";
import { DiscountResponse, HasilHitungHarga } from "./discount";

export interface ProdukDokumen {
  _id: ObjectId;
  name: string;
  slug: string;
  categoryId: ObjectId;
  images: string[];
  price: number;
  quantity: number;
  sold: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  storeId: ObjectId;
}

export interface ProdukResponse {
  _id: string;
  name: string;
  slug: string;
  categoryId: string;
  images: string[];
  price: number;
  quantity: number;
  sold: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  storeId: string;
  flashSale?: FlashSaleItemResponse;
  discount?: DiscountResponse;
  harga: HasilHitungHarga;
}

export interface ProdukRingkas {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  price: number;
  sold: number;
  harga: HasilHitungHarga;
}

export type ProdukRingkasDokumen = Pick<
  ProdukDokumen,
  "_id" | "name" | "slug" | "images" | "price" | "sold"
>;
