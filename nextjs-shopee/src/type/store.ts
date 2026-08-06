import { ObjectId } from "mongodb";

export interface StoreDokumen {
  _id: ObjectId;
  userId: ObjectId;
  name: string;
  slug: string;
  description: string;
  city: string;
  image: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface StoreResponse {
  _id: string;
  userId: string;
  name: string;
  slug: string;
  description?: string;
  city: string;
  image: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface StoreRingkas {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface MenuBarItem {
  name: string;
  section: string;
}

export interface Voucher {
  _id: string;
  code: string;
  discountAmount: number; // dalam Rupiah
  minPurchase: number; // dalam Rupiah
  expiredAt: Date;
  stock: number; // sisa voucher yang bisa diklaim
}
