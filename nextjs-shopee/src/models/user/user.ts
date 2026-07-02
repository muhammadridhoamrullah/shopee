import { comparePassword } from "@/src/helpers/bcrypt";
import { getDB } from "../../db/config";
import { inputLogin } from "../../type/type";
import { UserRepository } from "./user.repository";
import { signToken } from "@/src/helpers/jwt";

export async function loginUser(input: inputLogin) {

  // Find by username or email
  const findUser = await UserRepository.checkUserByIdentifier(input.identifier);

  if (!findUser) {
    throw new Error("Invalid Username/Email or Password");
  }

  // Check password
  // const checkPassword = comparePassword(input.password, findUser.password);

  // if (!checkPassword) {
  //   throw new Error("Invalid Username/Email or Password");
  // }

  // Check jika email sudah diverifikasi
  if (!findUser.isEmailVerified) {
    throw new Error("Email not verified");
  }

  // Update last login
  const updateLastLogin = await UserRepository.updateLastLogin(findUser._id);
  console.log(updateLastLogin, "updateLastLogin");

  // Buat access_token
  const access_token = signToken({
    _id: findUser._id,
  });

  // Send Notification email nanti

  return access_token;
}
