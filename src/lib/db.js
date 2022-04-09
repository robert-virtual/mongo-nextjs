import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const options = {};

export async function connectToDatabase() {
  let client = new MongoClient(uri, options);
  if (!process.env.MONGO_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = await client.connect();
      console.log("client asigned");
    }
    client = global._mongoClientPromise;
    console.log("client reasigned");
  } else {
    // client = new MongoClient(uri, options);
    client = await client.connect();
  }
  return client.db();
}
