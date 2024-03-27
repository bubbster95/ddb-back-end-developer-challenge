import express from "express";

import "./environment.mjs";

import { deletePlayer, getPlayerData } from "./src/Endpoints/mongo_service.mjs";

import heal from "./src/Endpoints/heal.mjs";
import dealDamage from "./src/Endpoints/dealDamage.mjs";
import addTempHitPts from "./src/Endpoints/addTempHitPts.mjs";

const app = express();

/* 
Allows client to heal
accepts 2 query strings:
* id (string: "6603a9f7e36a813ffb594ffd")
* healAmount (number: 2)
* Exp: http://localhost:3000/heal?id=6603a9f7e36a813ffb594ffd&healAmount=2
*/

app.get("/heal", async (req, res) => {
  const id = req.query.id;
  const healAmount = req.query.healAmount;
  try {
    const result = await heal(id, healAmount);

    res.send(`${JSON.stringify(result)}`);
  } catch (e) {
    res
      .status(500)
      .send(`Failed to Heal, id: ${id} healAmoun: ${healAmount} Error: ${e}`);
  }
});

/* 
Allows client to deal damage
accepts 3 query strings:
* id (string: "6603a9f7e36a813ffb594ffd")
* dmgAmount (number: 2)
* dmgType (string: "fire")
* Exp: http://localhost:3000/damage?id=6603a9f7e36a813ffb594ffd&dmgAmount=2&dmgType=slashing
*/
app.get("/damage", async (req, res) => {
  const id = req.query.id;
  const dmgAmount = req.query.dmgAmount;
  const dmgType = req.query.dmgType;
  try {
    let result = await dealDamage(id, dmgAmount, dmgType);

    res.send(`${JSON.stringify(result)}`);
  } catch (e) {
    res
      .status(500)
      .send(
        `Failed to damage, id: ${id} dmgAmount: ${dmgAmount} dmgType: ${dmgType}, Error: ${e}`
      );
  }
});

/* 
Allows client to addTempHitPts
accepts 2 query strings:
* id (string: "6603a9f7e36a813ffb594ffd")
* tempHPAmount (number: 2)
* Exp: http://localhost:3000/addTempHitPts?id=6603a9f7e36a813ffb594ffd&tempHPAmount=2
*/
app.get("/addTempHitPts", async (req, res) => {
  const id = req.query.id;
  const tempHPAmount = req.query.tempHPAmount;
  try {
    let result = await addTempHitPts(id, tempHPAmount);

    res.send(`${JSON.stringify(result)}`);
  } catch (e) {
    res
      .status(500)
      .send(
        `Failed to add Temp HP, id: ${id} tempHPAmount: ${tempHPAmount}, Error: ${e}`
      );
  }
});

/*
Delete A player "For testing" Warning: This is a permenant delete!
*/
app.get("/delete", async (req, res) => {
  let id = req.query.id;
  try {
    let result = await deletePlayer(id);
    res.send(`${JSON.stringify(result)}`);
  } catch (e) {
    res.status(500).send(`Failed to delete, id: ${id}, Error: ${e}`);
  }
});

/*
Homepage simply shows one player's data
*/
app.get("/", async (req, res) => {
  let id = req.query.id;
  try {
    let result = await getPlayerData(id ? id : "6603a9f7e36a813ffb594ffd");
    res.send(`${JSON.stringify(result)}`);
  } catch (e) {
    res.status(500).send(`Failed to get player Data, id: ${id}, Error: ${e}`);
  }
});

export default app;
