
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://bubbster95:Save1andget2@playerinfo.kumbnxf.mongodb.net/?retryWrites=true&w=majority&appName=playerInfo";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

export async function createPlayer(newPlayer) {
  const result = await client.db("dungensAndData").collection("players").insertOne(newPlayer)

  console.log(`New Player created with the following id: ${result.insertedId}`)
}

export async function getPlayerData(player) {
  const result = client.db("dungensAndData").collection("players").findOne({ name: player })

  if (result) {
    console.log(`Found player in the collection with the name ${player}`)
    console.log(await result)
  } else {
    console.log(`No player in the collection with the name ${player}`)
  }
}

export async function updatePlayerData(playerId, update) {
  const result = client.db("dungensAndData").collection("players").updateOne({_id: playerId}, {$set: update})

  console.log(await result)
}

export async function deletePlayer(playerId, update) {
  const result = client.db("dungensAndData").collection("players").deleteOne({_id: playerId})

  console.log(await result)
}