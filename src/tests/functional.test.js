import request from 'supertest';

import app from "../../app.mjs"

import { createPlayer, deletePlayer, getPlayerData, updatePlayerData } from '../Endpoints/mongo_service.mjs';
import dealDamage from '../Endpoints/dealDamage.mjs';
import addTempHitPts from '../Endpoints/addTempHitPts.mjs';
import heal from '../Endpoints/heal.mjs';

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


describe('Test Healing', () => {
    let playerId = "6603a9f7e36a813ffb594ffd"; // Clad Ironside, test player

    beforeEach(async () => {
        // reset relevant values bef
        updatePlayerData(playerId, {
            hitPoints: 20,
            maxHp: 25,
            tempHitPts: 0
        })
    })

    test('Should heal to full without surpassing maxHP', async () => {
        await heal(playerId, 200);
        const playerData = await getPlayerData(playerId);

        expect(playerData.tempHitPts).toBe(0);
        expect(playerData.hitPoints).toBe(25);
    })

    test('Should heal the exact specified amount', async () => {
        await heal(playerId, 2);
        const playerData = await getPlayerData(playerId);

        expect(playerData.tempHitPts).toBe(0);
        expect(playerData.hitPoints).toBe(22);
    })

});


describe('Test Damage Dealing', () => {
    let playerId = "6603a9f7e36a813ffb594ffd"; // Clad Ironside, test player

    beforeEach(async () => {
        // reset relevant values bef
        updatePlayerData(playerId, {
            hitPoints: 25,
            maxHp: 25,
            tempHitPts: 0
        })
    })

    test('Should do damage to temp HP first then hp', async () => {
        await addTempHitPts(playerId, 4);
        await dealDamage(playerId, 5, '');
        const playerData = await getPlayerData(playerId);

        expect(playerData.tempHitPts).toBe(0);
        expect(playerData.hitPoints).toBe(24);
    })

    test('Should not damage when immune to damage type', async () => {
        await dealDamage(playerId, 5, 'fire');
        const playerData = await getPlayerData(playerId);

        expect(playerData.tempHitPts).toBe(0);
        expect(playerData.hitPoints).toBe(25);
    })

    test('Should do half damage when resistant to damage type', async () => {
        await dealDamage(playerId, 4, 'slashing');
        const playerData = await getPlayerData(playerId);

        expect(playerData.tempHitPts).toBe(0);
        expect(playerData.hitPoints).toBe(23);
    })

});


describe('Test Adding Temp Health', () => {
    let playerId = "6603a9f7e36a813ffb594ffd"; // Clad Ironside, test player

    beforeEach(async () => {
        // reset relevant values bef
        updatePlayerData(playerId, {
            hitPoints: 25,
            maxHp: 25,
            tempHitPts: 0
        })
    })

    test('Should add temp HP', async () => {
        await addTempHitPts(playerId, 4);
        const playerData = await getPlayerData(playerId);

        expect(playerData.tempHitPts).toBe(4);
    });

});

