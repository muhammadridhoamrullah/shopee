import z from "zod";

export const schemaLogin = z.object({
  identifier: z.string().min(1, { message: "Username/Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const schemaRegister = z.object({
  username: z
    .string()
    .min(6, { message: "Username must be at least 6 characters long" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  phoneNumber: z
    .string()
    .regex(/^\d{10,15}$/, { message: "Invalid phone number" }),
});

export const schemaAddToCartDanBeliSekarang = z.object({
  productId: z.string().min(1, { message: "Product ID is required" }),
  quantity: z.number().int().min(1, { message: "Quantity must be at least 1" }),
});

export const schemaCreateFlashSaleItem = z.object({
  productId: z.string().min(1, { message: "Product ID is required" }),
  flashPrice: z
    .number()
    .positive({ message: "Flash price must be a positive number" }),
  flashStock: z
    .number()
    .int()
    .positive({ message: "Flash stock must be a positive integer" }),
  tanggal: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Format tanggal tidak valid",
  }),
  slotStart: z.number().int().min(0).max(23),
});
