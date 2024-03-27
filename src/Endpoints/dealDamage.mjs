
import { getPlayerData } from "./mongo_service.mjs";

export default async function dealDamage() {
    // Implement the ability for clients to deal damage of different types (e.g., bludgeoning, fire) to a player character.
    // Ensure that the API calculates damage while considering character resistances and immunities.
    let result = await getPlayerData("Clad Ironside")
    return result 
}