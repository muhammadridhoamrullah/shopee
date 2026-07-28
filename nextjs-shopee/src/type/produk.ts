import { ObjectId } from "mongodb";

export interface ProdukDokumen {
  _id: ObjectId;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  sold: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ProdukResponse {
  _id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  sold: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
