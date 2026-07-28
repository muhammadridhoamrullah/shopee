// Warna Oren Shopee
// #EE4D2D

import { ObjectId } from "mongodb";

export type inputLogin = {
  identifier: string;
  password: string;
};

export type inputRegister = {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export type inputUpdateCreateUser = inputRegister & {
  role: string;
  isEmailVerified: boolean;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  isEmailVerified: boolean;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type dataNodemailerLogin = {
  email: string;
  username: string;
};

export type dataNodemailerVerifiactionEmail = dataNodemailerLogin & {
  token: string;
};

export type formDataLogin = {
  identifier: string;
  password: string;
};

export type formDataRegister = {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export type menuLinks = {
  name: string;
  link: string;
  image: string;
};

export interface FlashSaleItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  isMall: boolean;
  isOri: boolean;
  stockSold: number; // jumlah unit terjual
  stockTotal: number; // total stok flash sale
  link: string;
}

export interface TimeLeftFlashSale {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number; // harga setelah diskon (yang ditampilkan besar)
  originalPrice?: number; // harga sebelum diskon (dicoret), optional
  discountPercent?: number; // dihitung dari originalPrice vs price
  sold: number; // jumlah terjual, misal 494 -> ditampilkan "494 terjual"
  rating?: number; // 0 - 5, optional (tidak semua card di screenshot nampilin rating)
  location: string; // kota pengiriman
  badge?: "mall" | "star" | "starPlus"; // label kiri atas: Mall|ORI, Star, Star+
  isOfficialStore?: boolean; // dipakai bareng badge "mall" untuk teks "ORI"
  hasFreeItem?: boolean; // contoh: "FREE - Philips Lampu..."
  installment?: {
    available: boolean;
    label: string; // contoh: "Cicilan 0%"
  };
  isFlashSale?: boolean; // badge kuning "PROMO XTRA" / label -50% dsb
  freeShipping?: boolean;
  isCOD?: boolean;
}
