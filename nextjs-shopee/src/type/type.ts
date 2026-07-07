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

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
