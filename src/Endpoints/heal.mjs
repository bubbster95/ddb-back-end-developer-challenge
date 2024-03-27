
import { getPlayerData } from "./mongo_service.mjs";

export default async function heal(id) {
    // Enable clients to heal a player character, increasing their HP.
    let result = await getPlayerData(id)
    return result 
}