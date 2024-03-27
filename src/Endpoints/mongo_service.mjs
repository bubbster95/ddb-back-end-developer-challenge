
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';

import "../../environment.mjs"

const uri = process.env.ATLAS_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


export default async function runMongoDb() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to Dungeons & Data database!");
  }  catch(e) {
    res.status(500).json({ error: 'Internal Mongo Server Error' });
  }
}

 export async function createPlayer(newPlayer) {
  const result = await client.db("dungensAndData").collection("players").insertOne(newPlayer)

  console.log(`New Player created with the following id: ${result.insertedId}`)
  return result
}

 export async function getPlayerData(player) {
  const result = client.db("dungensAndData").collection("players").findOne({_id: new ObjectId(player)})

  return (result) ? result : `No player in the collection with the Id ${player}`
}

export async function updatePlayerData(playerId, update) {
  const result = client.db("dungensAndData").collection("players").updateOne({_id: new ObjectId(playerId)}, {$set: update})

  return result
}

export async function deletePlayer(playerId, update) {
  const result = client.db("dungensAndData").collection("players").deleteOne({_id: new ObjectId(playerId)})

  return result
}