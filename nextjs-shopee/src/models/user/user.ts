import { comparePassword, hashPassword } from "@/src/helpers/bcrypt";
import { inputLogin, inputRegister } from "../../type/type";
import { UserRepository } from "./user.repository";
import { signToken } from "@/src/helpers/jwt";
import {
  sendNotificationLogin,
  sendVerificationEmail,
} from "@/src/helpers/nodemailer";
import * as jose from "jose";

export async function loginUser(input: inputLogin) {
  // Find by username or email
  const findUser = await UserRepository.checkUserByIdentifier(input.identifier);

  if (!findUser) {
    throw new Error("Invalid Username/Email or Password");
  }

  // Check password
  const checkPassword = comparePassword(input.password, findUser.password);

  if (!checkPassword) {
    throw new Error("Invalid Username/Email or Password");
  }

  // Check jika email sudah diverifikasi
  if (!findUser.isEmailVerified) {
    throw new Error("Email not verified");
  }

  // Update last login
  await UserRepository.updateLastLogin(findUser._id);

  // Buat access_token
  const access_token = signToken({
    _id: findUser._id,
    username: findUser.username,
    email: findUser.email,
    role: findUser.role,
  });

  // Send Notification email nanti
  await sendNotificationLogin({
    email: findUser.email,
    username: findUser.username,
  });

  return access_token;
}

export async function registerUser(input: inputRegister) {
  // Check apakah username
  const checkUser = await UserRepository.checkUserByUsername(input.username);

  if (checkUser) {
    throw new Error("Username already exists");
  }

  // Check apakah email sudah digunakan
  const checkEmail = await UserRepository.checkUserByEmail(input.email);

  if (checkEmail) {
    throw new Error("Email already exists");
  }

  // Check Phone Number sudah digunakan
  const checkPhoneNumber = await UserRepository.checkUserByPhoneNumber(
    input.phoneNumber,
  );

  if (checkPhoneNumber) {
    throw new Error("Phone Number already exists");
  }

  const dataCreateUser = {
    ...input,
    password: hashPassword(input.password),
    role: "user",
    isEmailVerified: false,
    lastLoginAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const create = await UserRepository.createUser(dataCreateUser);

  if (!create.acknowledged) {
    throw new Error("Failed to create user");
  }

  const tokenEmailVerification = signToken({
    _id: create.insertedId.toString(),
  });

  // Panggil Email Verification Service
  await sendVerificationEmail({
    email: input.email,
    username: input.username,
    token: tokenEmailVerification,
  });

  return {
    _id: create.insertedId.toString(),
    username: input.username,
    email: input.email,
  };
}

export async function verifyEmail(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  const decoded = await jose.jwtVerify<{ _id: string }>(token, secret);

  const UserId = decoded.payload._id;

  const findUser = await UserRepository.findUserById(UserId);

  if (!findUser) {
    throw new Error("User not found");
  }

  if (findUser.isEmailVerified) {
    throw new Error("Email already verified");
  }

  await UserRepository.updateVerifyEmail(UserId);

  return {
    message: "Email verified successfully",
  };
}
