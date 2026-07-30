import { ObjectId } from "mongodb";

export interface Cart {
  _id: ObjectId;
  userId: ObjectId;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CartItem {
  productId: ObjectId;
  quantity: number;
}
