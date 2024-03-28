import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

import "../../environment.mjs";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default async function runMongoDb() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

  } catch (e) {
    console.log("Internal Mongo Server Error", e);
  }
}

export async function createPlayer(newPlayer) {
  const result = await client
    .db("dungensAndData")
    .collection("players")
    .insertOne(newPlayer);

  console.log(`New Player created with the following id: ${result.insertedId}`);
  return result.insertedId;
}

export async function getPlayerData(playerId) {
  const result = await client
    .db("dungensAndData")
    .collection("players")
    .findOne({ _id: validateId(playerId) });

  return result || `No player in the collection with the Id ${playerId}`;
}

export async function updatePlayerData(playerId, update) {
  const result = client
    .db("dungensAndData")
    .collection("players")
    .updateOne({ _id: validateId(playerId) }, { $set: update });

  return result;
}

export async function deletePlayer(playerId) {
  const result = client
    .db("dungensAndData")
    .collection("players")
    .deleteOne({ _id: validateId(playerId) });

  return await result;
}

const validateId = (id) => (ObjectId.isValid(id) ? new ObjectId(id) : id);
