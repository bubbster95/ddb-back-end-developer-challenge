import express from "express";

import "./environment.mjs"

import  runMongoDb, { createPlayer, getPlayerData } from "./src/Endpoints/mongo_service.mjs";

import heal from "./src/Endpoints/heal.mjs";
import dealDamage from "./src/Endpoints/dealDamage.mjs";
import addTempHitPts from "./src/Endpoints/addTempHitPts.mjs";

const app = express();
const port = 3000;

try {

  runMongoDb()

  app.get('/heal', async (req, res) => {
    const id = req.query.id
    const healAmount = req.query.heal

    const result = await heal(id, healAmount)

    res.send(`${JSON.stringify(result)}`);
  });

  app.get('/damage', async (req, res) => {

    const id = req.query.id
    const dmgAmount = req.query.dmgAmount
    const dmgType = req.query.dmgType

    let result = await dealDamage(id, dmgAmount, dmgType)
    res.send(`${JSON.stringify(result)}`);
  });

  app.get('/addTempHitPts', async (req, res) => {
    let result = await addTempHitPts()
    res.send(`${JSON.stringify(result)}`);
  });

  app.get('/createPlayer', async (req, res) => {
    let result = await createPlayer({
      "name": "Clad Ironside",
      "level": 5,
      "hitPoints": 25,
      "maxHp": 25,
      "tempHitPts": 0,
      "classes": [
        {
        "name":"fighter",
        "hitDiceValue":10,
        "classLevel":5
        }
      ],
      "stats":{
        "strength":15,
        "dexterity":12,
        "constitution":14,
        "intelligence":13,
        "wisdom":10,
        "charisma":8
      },
      "items":[
        {
          "name":"Ioun Stone of Fortitude",
          "modifier":{
            "affectedObject":"stats",
            "affectedValue":"constitution",
            "value":2
          }
        }
      ],
      "defenses":[
        {
          "type":"fire",
          "defense":"immunity"
        },
        {
          "type":"slashing",
          "defense":"resistance"
        }
      ]
    }
    )
    res.send(`${JSON.stringify(result)}`);
  });

  app.get('/', async (req, res) => {
    let result = await getPlayerData('6603a9f7e36a813ffb594ffd')
    res.send(`${JSON.stringify(result)}`);
  });



  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

} catch(e) {
  res.status(500).json({ error: 'Internal Server Error' });
}
