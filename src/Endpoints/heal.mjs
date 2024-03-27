
import { getPlayerData } from "./mongo_service.mjs";
import { updatePlayerData } from "./mongo_service.mjs";

// Enable clients to heal a player character, increasing their HP.
export default async function heal(id, healAmount) {
    const playerData = await getPlayerData(id);
    let result;

    if (playerData.hitPoints + healAmount <= playerData.maxHp) {
        console.log("Heal this man!")
        result = updatePlayerData(id, {hitPoints: playerData.hitPoints + healAmount})
    } else if (playerData.hitPoints + healAmount > playerData.maxHp){
        console.log("Heal this man! But only up to maxHp")
        result = updatePlayerData(id, {hitPoints: playerData.maxHp})
    } else { 
        console.log("He is fine, walk it off")
        result = playerData
    }

    return result 
}