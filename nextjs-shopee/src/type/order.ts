import { ObjectId } from "mongodb";

export interface Order {
  _id: ObjectId;
  userId: ObjectId;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  orderId: string;
  snapToken?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface OrderItem {
  productId: ObjectId;
  name: string;
  image: string;
  price: number;
  quantity: number;
}
