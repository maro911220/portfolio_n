import { MongoClient, Db } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// 환경 변수 체크
if (!process.env.MONGODB_URL) {
  throw new Error("Please add your Mongo URL to .env.local");
}

const url = process.env.MONGODB_URL;
const options = {};

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(url, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(url, options);
  clientPromise = client.connect();
}

// 헬퍼 함수
export async function getDatabase(dbName?: string): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

export { clientPromise as connectDB };
