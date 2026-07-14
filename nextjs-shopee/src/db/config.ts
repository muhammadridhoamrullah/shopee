import { MongoClient } from "mongodb";

const CONNECTION_STRING = process.env.MONGODB_URI!;
const DB_NAME = process.env.DB_NAME;

if (!CONNECTION_STRING) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env",
  );
}

let client: MongoClient;

// Buat async function untuk mendapatkan instance MongoClient
async function getMongoClientInstance(): Promise<MongoClient> {
  if (!client) {
    client = new MongoClient(CONNECTION_STRING);
    await client.connect();
  }
  return client;
}

// Buat async function untuk mendapatkan database
export async function getDB() {
  const client = await getMongoClientInstance();
  return client.db(DB_NAME);
}

// Buat async function untuk menutup koneksi MongoDB
export async function closeMongoClient() {
  if (client) {
    await client.close();
    client = undefined as unknown as MongoClient; // Reset client to undefined
  }
}
