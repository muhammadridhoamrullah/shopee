// Warna Oren Shopee
// #EE4D2D

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
