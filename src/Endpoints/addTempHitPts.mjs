
import { getPlayerData } from "./mongo_service.mjs";

export default async function addTempHitPts() {
    // Implement the functionality to add temporary Hit Points to a player character.
    // Ensure that temporary Hit Points follow the rules: they are not additive, always taking the higher value, and cannot be healed.
    let result = await getPlayerData("Clad Ironside")
    return result 
}