
import { getPlayerData } from "./mongo_service.mjs";
import { updatePlayerData } from "./mongo_service.mjs";


// Implement the ability for clients to deal damage of different types (e.g., bludgeoning, fire) to a player character.
// Ensure that the API calculates damage while considering character resistances and immunities.
export default async function dealDamage(id, dmgAmount, dmgType) {
    const playerData = await getPlayerData(id);
    
    let result; 

    let defenses = playerData.defenses;
    let immune = false;
    let resistant = false;

    defenses.map(def => {
        if (def.type == dmgType) {
            resistant = (def.defense== 'resistance');
            immune = (def.defense == 'immunity');
        }
    })
    if (resistant) {
        result = updatePlayerData(id, {hitPoints: playerData.hitPoints - Math.round(dmgAmount/2)})
    } else if (!immune) {
        result = updatePlayerData(id, {hitPoints: playerData.hitPoints - dmgAmount})
    } else {
        result = playerData
    }

    return await result 
}

