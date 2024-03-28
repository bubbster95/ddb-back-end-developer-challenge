import { getPlayerData } from "./mongoService.mjs";
import { updatePlayerData } from "./mongoService.mjs";

// Enable clients to heal a player character, increasing their HP.
export default async function heal(id, amount) {
  const playerData = await getPlayerData(id);
  JSON.parse(amount);

  let HP = JSON.parse(playerData.hitPoints);
  let maxHP = JSON.parse(playerData.maxHp);

  if (maxHP === HP ) return `Already at full health.`
  let healFactor = (HP + amount < maxHP) ? HP + amount : maxHP // If healing doesn't max out HP, use exact numbers, otherwise just set to maxHP
  return await updatePlayerData(id, { hitPoints: healFactor });
}
