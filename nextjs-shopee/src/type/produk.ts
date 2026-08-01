import { ObjectId } from "mongodb";

export interface ProdukDokumen {
  _id: ObjectId;
  name: string;
  slug: string;
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
}

export interface ProdukResponse {
  _id: string;
  name: string;
  slug: string;
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
}
