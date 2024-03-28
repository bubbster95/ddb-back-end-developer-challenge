import { getPlayerData } from "./mongoService.mjs";
import { updatePlayerData } from "./mongoService.mjs";

// Implement the ability for clients to deal damage of different types (e.g., bludgeoning, fire) to a player character.
// Ensure that the API calculates damage while considering character resistances and immunities.
export default async function dealDamage(id, amount, type) {
  const playerData = await getPlayerData(id);
  JSON.parse(amount)

  let result;

  // Search player defenses for resistance/immunity to damage type.
  let defense = playerData.defenses.find((def) => def.type === type)?.defense;
  // If immune send response immediately.
  if (defense === "immunity") {
    return { res: { text: `Player Character is immune to ${type} damage.` } };
  }
  if (defense === "resistance") amount = Math.round(amount / 2);

  let newTempHP = playerData.tempHP - amount; // Subtract damage amount from tempHP.
  let newHP;

  if (newTempHP < 0) {
    newHP = playerData.hitPoints + newTempHP;
    newTempHP = 0;
  } else {
    newHP = playerData.hitPoints;
  }

  result = updatePlayerData(id, { hitPoints: newHP, tempHP: newTempHP });

  console.log(`Deal ${amount} damage.`);
  return await result;
}
