import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let db;

client
  .connect()
  .then((c) => (db = c.db("sample_training")))
  .catch((e) => console.log(e));

export default db;
