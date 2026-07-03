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
    console.log(findUser, "findUser login repo");

    return findUser;
  }

  static async updateLastLogin(UserId: string) {
    const db = await getDB();

    const update = await db.collection(COLLECTION_NAME).findOneAndUpdate(
      {
        _id: new ObjectId(UserId),
      },
      {
        $set: { lastLoginAt: new Date(), updatedAt: new Date() },
      },
      { returnDocument: "after" },
    );
    console.log(update, "update last login");

    return update;
  }

  static async checkUserByUsername(username: string) {
    const db = await getDB();

    const findUser = await db.collection(COLLECTION_NAME).findOne({
      username,
    });
    console.log(findUser, "findUsERNAME");

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

  static async findUserById(UserId: string) {
    const db = await getDB();

    const findUser = (await db.collection(COLLECTION_NAME).findOne({
      _id: new ObjectId(UserId),
    })) as User | null;
    return findUser;
  }

  static async updateVerifyEmail(UserId: string) {
    const db = await getDB();

    const update = await db.collection(COLLECTION_NAME).findOneAndUpdate(
      {
        _id: new ObjectId(UserId),
      },
      {
        $set: { isEmailVerified: true, updatedAt: new Date() },
      },
      { returnDocument: "after" },
    );

    return update;
  }
}
