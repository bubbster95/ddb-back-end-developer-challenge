import { updatePlayerData } from "./mongoService.mjs";

// Implement the functionality to add temporary HP to a player character.
// Ensure that temporary HP follow the rules: they are not additive, always taking the higher value, and cannot be healed.
export default async function addTempHP(id, amount) {
  JSON.parse(amount);

  let result = updatePlayerData(id, {
    tempHP: amount,
  });

  console.log(`You now have ${amount} temporary HP, use them wisely`);
  return await result;
}
