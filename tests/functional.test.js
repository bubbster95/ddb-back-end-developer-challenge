import request from "supertest";

import app from "../app.mjs";

import {
  getPlayerData,
  updatePlayerData,
} from "../src/endpoints/mongoService.mjs";
import dealDamage from "../src/endpoints/dealDamage.mjs";
import addTempHP from "../src/Endpoints/addTempHP.mjs";
import heal from "../src/endpoints/healDamage.mjs";

describe("Test the root path", () => {
  test("Should respond with 200", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.res.text).toBeDefined();
  });

  test("Should include necessary key/value pairs", async () => {
    const response = await request(app).get("/");
    let respText = response.res.text;
    respText = JSON.parse(respText.substring(34, respText.length - 6))


    expect(respText).toHaveProperty("name");
    expect(respText).toHaveProperty("hitPoints");
    expect(respText).toHaveProperty("maxHp");
    expect(respText).toHaveProperty("tempHP");
  });
});

describe("Test Healing", () => {
  let playerId = "6603a9f7e36a813ffb594ffd"; // Clad Ironside, test player

  beforeEach(async () => {
    // reset relevant values bef
    await updatePlayerData(playerId, {
      hitPoints: 20,
      maxHp: 25,
      tempHP: 0,
    });
  });

  test("Should heal the exact specified amount", async () => {
    await heal(playerId, 2);
    const playerData = await getPlayerData(playerId);

    expect(playerData.tempHP).toBe(0);
    expect(playerData.hitPoints).toBe(22);
  });

  test("Should heal to full without surpassing maxHP", async () => {
    await heal(playerId, 200);
    const playerData = await getPlayerData(playerId);

    expect(playerData.tempHP).toBe(0);
    expect(playerData.hitPoints).toBe(25);
  });

});

describe("Test Damage Dealing", () => {
  let playerId = "6603a9f7e36a813ffb594ffd"; // Clad Ironside, test player

  beforeEach(async () => {
    // reset relevant values bef
   await updatePlayerData(playerId, {
      hitPoints: 25,
      maxHp: 25,
      tempHP: 0,
    });
  });

  test("Should do damage to temp HP first then hp", async () => {
    await addTempHP(playerId, 4);
    await dealDamage(playerId, 5, "");
    const playerData = await getPlayerData(playerId);

    expect(playerData.tempHP).toBe(0);
    expect(playerData.hitPoints).toBe(24);
  });

  test("Should not damage when immune to damage type", async () => {
    await dealDamage(playerId, 5, "fire");
    const playerData = await getPlayerData(playerId);

    expect(playerData.tempHP).toBe(0);
    expect(playerData.hitPoints).toBe(25);
  });

  test("Should do half damage when resistant to damage type", async () => {
    await dealDamage(playerId, 4, "slashing");
    const playerData = await getPlayerData(playerId);

    expect(playerData.tempHP).toBe(0);
    expect(playerData.hitPoints).toBe(23);
  });

});

describe("Test Adding Temp Health", () => {
  let playerId = "6603a9f7e36a813ffb594ffd"; // Clad Ironside, test player

  beforeEach(async () => {
    // reset relevant values bef
    await updatePlayerData(playerId, {
      hitPoints: 25,
      maxHp: 25,
      tempHP: 0,
    });
  });

  test("Should add temp HP", async () => {
    await addTempHP(playerId, 4);
    const playerData = await getPlayerData(playerId);

    expect(playerData.tempHP).toBe(4);
  });

  test("Should take half damage to temp HP when resistant to damage type", async () => {
    await addTempHP(playerId, 4);
    await dealDamage(playerId, 4, "slashing");
    const playerData = await getPlayerData(playerId);

    expect(playerData.tempHP).toBe(2);
    expect(playerData.hitPoints).toBe(25);
  });
});
