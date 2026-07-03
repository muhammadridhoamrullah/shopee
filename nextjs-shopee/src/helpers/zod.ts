import z from "zod";

export const schemaLogin = z.object({
  identifier: z.string().min(1, { message: "Identifier is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const schemaRegister = z.object({
  username: z
    .string()
    .min(6, { message: "Username must be at least 6 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  phoneNumber: z
    .string()
    .regex(/^\d{10,15}$/, { message: "Invalid phone number" }),
});
