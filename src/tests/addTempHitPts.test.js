import request from 'supertest';

import app from "../../app.mjs"

import { createPlayer, deletePlayer, getPlayerData, updatePlayerData } from '../Endpoints/mongo_service.mjs';

describe('Test the root path', () => {

    test('Should respond with 200', async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200)
        expect(response.res.text).toBeDefined()
    });

    test('Should include nescessary key/value pairs', async () => {
        const response = await request(app).get("/");
        let respText = JSON.parse(response.res.text)

        expect(respText).toHaveProperty('name')
        expect(respText).toHaveProperty('hitPoints')
        expect(respText).toHaveProperty('maxHp')
        expect(respText).toHaveProperty('tempHitPts')
    });

});

describe('Test the heal path', () => {
    let playerId;
    beforeAll( async () => {
        const player = {
            "name": "Briv",
            "level": 5,
            "hitPoints": 10,
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
        playerId = await createPlayer(player)
        playerId = JSON.stringify(playerId)
        return playerId
    })

    // test('Should respond with 200', async () => {
    //     // Call the heal API
    //     const response = await request(app)
    //         .get('/heal')
    //         .query({id: playerId, healAmount: 0});

    //     expect(response.statusCode).toBe(200)
    //     expect(response.res.text).toBeDefined()
    // });

    // test('Should add requested amount of health', async () => {
    //     const response = await request(app)
    //         .get('/heal')
    //         .query({id: playerId, healAmount: 2});

    //     let respText = JSON.parse(response.res.text)

    //     expect(respText.hitPoints).toBe('12')
    // });

    test('Should heal the player fully but not go over maxHP', async () => {
        console.log(playerId)
        const response = await request(app)
            .get('/heal')
            .query({id: playerId, healAmount: 200});

        let respText = JSON.parse(response.res.text)

        console.log('RspText: ', respText)
        expect(respText.hitPoints).toBe('25')
        expect(respText.hitPoints).toEqual(respText.maxHp)
    });

    // deletePlayer(playerId)

});