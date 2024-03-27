import express from "express";

import "./environment.mjs"

import  { createPlayer, getPlayerData } from "./src/Endpoints/mongo_service.mjs";

import heal from "./src/Endpoints/heal.mjs";
import dealDamage from "./src/Endpoints/dealDamage.mjs";
import addTempHitPts from "./src/Endpoints/addTempHitPts.mjs";

const app = express();

/* 
Allows client to heal
accepts 2 query strings:
* id (string: "6603a9f7e36a813ffb594ffd")
* healAmount (number: 2)
* Exp: http://localhost:3000/heal?id=6603a9f7e36a813ffb594ffd&heal=2
*/

app.get('/heal', async (req, res) => {
const id = req.query.id
const healAmount = req.query.heal

const result = await heal(id, healAmount)

res.send(`${JSON.stringify(result)}`);
});

/* 
Allows client to deal damage
accepts 3 query strings:
* id (string: "6603a9f7e36a813ffb594ffd")
* dmgAmount (number: 2)
* dmgType (string: "fire")
* Exp: http://localhost:3000/damage?id=6603a9f7e36a813ffb594ffd&dmgAmount=2&dmgType=slashing
*/
app.get('/damage', async (req, res) => {
const id = req.query.id
const dmgAmount = req.query.dmgAmount
const dmgType = req.query.dmgType

let result = await dealDamage(id, dmgAmount, dmgType)

res.send(`${JSON.stringify(result)}`);
});

/* 
Allows client to addTempHitPts
accepts 2 query strings:
* id (string: "6603a9f7e36a813ffb594ffd")
* tempHPAmount (number: 2)
* Exp: http://localhost:3000/addTempHitPts?id=6603a9f7e36a813ffb594ffd&tempHPAmount=2
*/
app.get('/addTempHitPts', async (req, res) => {
const id = req.query.id
const tempHPAmount = JSON.parse(req.query.tempHPAmount)

let result = await addTempHitPts(id, tempHPAmount)

res.send(`${JSON.stringify(result)}`);
});

/* 
Visiting this path creates a new player, Warning: uses a hardcoded set of data
*/
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

/*
Homepage simply shows one player's data
*/
app.get('/', async (req, res) => {
let result = await getPlayerData('6603a9f7e36a813ffb594ffd')
res.send(`${JSON.stringify(result)}`);
});


export default app;