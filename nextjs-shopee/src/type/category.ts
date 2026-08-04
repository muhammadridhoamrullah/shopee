import { ObjectId } from "mongodb";

export interface KategoriDokumen {
  _id: ObjectId;
  name: string;
  slug: string;
  ancestorsId: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface KategoriResponse {
  _id: string;
  name: string;
  slug: string;
  ancestorsId: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export const SORT_OPTIONS = {
  populer: { sold: -1 },
  terbaru: { createdAt: -1 },
  terlaris: { sold: -1 },
  termurah: { price: 1 },
  termahal: { price: -1 },
} as const;
