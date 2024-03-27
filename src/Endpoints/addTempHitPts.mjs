
import { getPlayerData, updatePlayerData } from "./mongo_service.mjs";

// Implement the functionality to add temporary Hit Points to a player character.
// Ensure that temporary Hit Points follow the rules: they are not additive, always taking the higher value, and cannot be healed.
export default async function addTempHitPts(id, tempHPAmount) {
    const playerData = await getPlayerData(id)
    
    let result = updatePlayerData(id, { tempHitPts: playerData.tempHitPts + tempHPAmount })
    console.log(`Added ${tempHPAmount} temporary hit points, use them wisely`)
    return await result
}