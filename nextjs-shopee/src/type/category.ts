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
