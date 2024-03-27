
import { getPlayerData } from "./mongo_service.mjs";
import { updatePlayerData } from "./mongo_service.mjs";

// Enable clients to heal a player character, increasing their HP.
export default async function heal(id, healAmount) {
    const playerData = await getPlayerData(id);
    let result;

    if (playerData.hitPoints + healAmount <= playerData.maxHp) {
        console.log(`Let the healing commence, heal for ${healAmount}`)
        result = updatePlayerData(id, {hitPoints: playerData.hitPoints + healAmount})
    } else if (playerData.hitPoints + healAmount > playerData.maxHp){
        console.log("I'll heal you! But only to the Max!")
        result = updatePlayerData(id, {hitPoints: playerData.maxHp})
    } else { 
        console.log("You're already at full")
        result = playerData
    }

    return result 
}