import { getPlayerData } from "./mongo_service.mjs";
import { updatePlayerData } from "./mongo_service.mjs";

// Enable clients to heal a player character, increasing their HP.
export default async function heal(id, healAmount) {
  const playerData = await getPlayerData(id);
  let result;

  let hitPoints = JSON.parse(playerData.hitPoints);
  let healAmountParsed = JSON.parse(healAmount);
  let maxHp = JSON.parse(playerData.maxHp);

  if (hitPoints + healAmountParsed <= maxHp) {
    console.log(`Let the healing commence, heal for ${healAmountParsed}`);
    result = updatePlayerData(id, { hitPoints: hitPoints + healAmountParsed });
  } else if (hitPoints + healAmountParsed > maxHp) {
    console.log("I'll heal you! But only to the Max!");
    result = updatePlayerData(id, { hitPoints: maxHp });
  } else {
    console.log("You're already at full");
    result = playerData;
  }

  return result;
}
