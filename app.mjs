import express from "express";

import "./environment.mjs";

import validateinputs from "./src/validate.mjs";

import { deletePlayer, getPlayerData } from "./src/endpoints/mongoService.mjs";

import heal from "./src/endpoints/healDamage.mjs";
import dealDamage from "./src/endpoints/dealDamage.mjs";
import addTempHP from "./src/Endpoints/addTempHP.mjs";

const app = express();

/* 
Allows client to heal
accepts 2 query strings:
* id (string: "6603a9f7e36a813ffb594ffd")
* amount (number: 2)
* Exp: http://localhost:3000/heal?id=6603a9f7e36a813ffb594ffd&amount=2
*/

app.get("/heal", async (req, res) => {
  const id = req.query.id;
  const amount = req.query.amount;

  try {
    const invalid = validateinputs({ id: id, amount: amount });
    if (invalid) throw new Error(invalid);
    else {
      res.send(`<pre style="padding: 50px 150px;">${JSON.stringify(await heal(id, amount), null, 4)}</pre>`);
    }
  } catch (e) {
    res.status(e.status || 500).send(`Failed to Heal. ${e}`);
  }
});

/* 
Allows client to deal damage
accepts 3 query strings:
* id (string: "6603a9f7e36a813ffb594ffd")
* amount (number: 2)
* type (string: "fire")
* Exp: http://localhost:3000/damage?id=6603a9f7e36a813ffb594ffd&amount=2&type=slashing
*/
app.get("/damage", async (req, res) => {
  const id = req.query.id;
  const amount = req.query.amount;
  const type = req.query.type;
  try {
    const invalid = validateinputs({ id: id, amount: amount });
    if (invalid) throw new Error(invalid);
    else {
      res.send(`<pre style="padding: 50px 150px;">${JSON.stringify(await dealDamage(id, amount, type), null, 4)}</pre>`);
    }
  } catch (e) {
    res.status(e.status || 500).send(`Failed to damage. ${e}`);
  }
});

/* 
Allows client to addTempHP
accepts 2 query strings:
* id (string: "6603a9f7e36a813ffb594ffd")
* amount (number: 2)
* Exp: http://localhost:3000/addTempHP?id=6603a9f7e36a813ffb594ffd&amount=2
*/
app.get("/addTempHP", async (req, res) => {
  const id = req.query.id;
  const amount = req.query.amount;
  try {
    const invalid = validateinputs({ id: id, amount: amount });
    if (invalid) throw new Error(invalid);
    else {
      res.send(`<pre style="padding: 50px 150px;">${JSON.stringify(await addTempHP(id, amount), null, 4)}</pre>`);
    }
  } catch (e) {
    res.status(e.status || 500).send(`Failed to add Temp HP. ${e}`);
  }
});

/*
Delete A player "For testing" Warning: This is a permenant delete!
*/
// app.get("/delete", async (req, res) => {
//   let id = req.query.id;
//   try {
//     let result = await deletePlayer(id);
//     res.send(`${JSON.stringify(result)}`);
//   } catch (e) {
//     res.status(e.status || 500).send(`Failed to delete, id: ${id}, Error: ${e}`);
//   }
// });

/*
Homepage simply shows one player's data
*/
// TODO: Remove default character, expect an id
app.get("/", async (req, res) => {
  let id = req.query.id;
  try {
    let result = await getPlayerData(id ? id : "6603a9f7e36a813ffb594ffd");
    res.send(`<pre style="padding: 50px 150px;">${JSON.stringify(result, null, 4)}</pre>`);
  } catch (e) {
    res
      .status(e.status || 500)
      .send(`Failed to get player Data, id: ${id}, Error: ${e}`);
  }
});

export default app;
