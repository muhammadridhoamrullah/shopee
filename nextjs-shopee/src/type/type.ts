export type inputLogin = {
  identifier: string;
  password: string;
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
