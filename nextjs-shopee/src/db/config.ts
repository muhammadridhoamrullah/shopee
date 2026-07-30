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
  try {
    const client = await getMongoClientInstance();
    await client.db(DB_NAME).command({ ping: 1 }); // Cek koneksi ke database
    return client.db(DB_NAME);
  } catch (error) {
    if (error instanceof Error && error.name === "MongoTopologyClosedError") {
      client = undefined as unknown as MongoClient; // Reset client to undefined
      const newClient = await getMongoClientInstance();
      return newClient.db(DB_NAME);
    }
    throw error; // Rethrow the error if it's not a MongoTopologyClosedError
  }
}

// Buat async function untuk menutup koneksi MongoDB
export async function closeMongoClient() {
  if (client) {
    await client.close();
    client = undefined as unknown as MongoClient; // Reset client to undefined
  }
}
