import { MongoClient } from "mongodb";

const CONNECTION_STRING = process.env.MONGODB_URI!;
const DB_NAME = process.env.DB_NAME;

if (!CONNECTION_STRING) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env",
  );
}

// Client disimpan di globalThis, BUKAN di variabel module-scope biasa.
// Alasannya: saat hot-reload di dev, modul dievaluasi ulang dan variabel
// module-scope ikut ter-reset -- akibatnya MongoClient baru dibuat terus
// sementara yang lama koneksinya tidak pernah ditutup (connection leak).
// globalThis tidak ikut ter-reset saat hot-reload, jadi client-nya bertahan.

const globalForMongo = globalThis as unknown as {
  mongoClient: MongoClient | undefined;
};

// Buat async function untuk mendapatkan instance MongoClient
async function getMongoClientInstance(): Promise<MongoClient> {
  if (!globalForMongo.mongoClient) {
    globalForMongo.mongoClient = new MongoClient(CONNECTION_STRING, {
      // Default-nya 100 per client -- terlalu besar untuk cluster M0
      // yang batasnya cuma 500 koneksi
      maxPoolSize: 10,
    });
    await globalForMongo.mongoClient.connect();
  }
  return globalForMongo.mongoClient;
}

// Buat async function untuk mendapatkan database
export async function getDB() {
  try {
    const client = await getMongoClientInstance();
    await client.db(DB_NAME).command({ ping: 1 }); // Cek koneksi ke database
    return client.db(DB_NAME);
  } catch (error) {
    if (error instanceof Error && error.name === "MongoTopologyClosedError") {
      globalForMongo.mongoClient = undefined;
      const newClient = await getMongoClientInstance();
      return newClient.db(DB_NAME);
    }
    throw error; // Rethrow the error if it's not a MongoTopologyClosedError
  }
}

// Buat async function untuk menutup koneksi MongoDB
export async function closeMongoClient() {
  if (globalForMongo.mongoClient) {
    await globalForMongo.mongoClient.close();
    globalForMongo.mongoClient = undefined; // Reset client to undefined
  }
}
