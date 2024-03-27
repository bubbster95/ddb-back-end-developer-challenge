import express from "express";

import "./environment.mjs"

import  runMongoDb, { createPlayer } from "./src/Endpoints/mongo_service.mjs";

import heal from "./src/Endpoints/heal.mjs";
import dealDamage from "./src/Endpoints/dealDamage.mjs";
import addTempHitPts from "./src/Endpoints/addTempHitPts.mjs";

const app = express();
const port = 3000;

try {

  runMongoDb()

  app.get('/heal', async (req, res) => {
    let id = req.query.id
    let heal = req.quert.heal

    let result = await heal(id, heal)
    res.send(`${JSON.stringify(result)}`);
  });

  app.get('/damage', async (req, res) => {
    let result = await dealDamage()
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
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

} catch(e) {
  res.status(500).json({ error: 'Internal Server Error' });
}
