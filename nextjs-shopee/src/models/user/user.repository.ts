import { getDB } from "@/src/db/config";
import { inputUpdateCreateUser, User } from "@/src/type/type";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "users";

export class UserRepository {
  static async checkUserByIdentifier(identifier: string): Promise<User | null> {
    const db = await getDB();

    const findUser = await db.collection<User>(COLLECTION_NAME).findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    return findUser;
  }

  static async updateLastLogin(UserId: string) {
    const db = await getDB();

    const update = await db.collection(COLLECTION_NAME).aggregate([
      {
        $match: { _id: new ObjectId(UserId) },
      },
      {
        $set: { lastLoginAt: new Date() },
      },
    ]);
    console.log(update, "update last login");

    return update;
  }

  static async checkUserByUsername(username: string) {
    const db = await getDB();

    const findUser = await db.collection(COLLECTION_NAME).findOne({
      username,
    });
    return findUser;
  }

  static async checkUserByEmail(email: string) {
    const db = await getDB();

    const findUser = await db.collection(COLLECTION_NAME).findOne({
      email,
    });

    return findUser;
  }

  static async checkUserByPhoneNumber(phoneNumber: string) {
    const db = await getDB();

    const findUser = await db.collection(COLLECTION_NAME).findOne({
      phoneNumber,
    });
    return findUser;
  }

  static async createUser(user: inputUpdateCreateUser) {
    const db = await getDB();

    const creating = await db.collection(COLLECTION_NAME).insertOne(user);
    return creating;
  }
}
