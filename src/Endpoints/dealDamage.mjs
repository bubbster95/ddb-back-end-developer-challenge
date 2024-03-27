
import { getPlayerData } from "./mongo_service.mjs";
import { updatePlayerData } from "./mongo_service.mjs";


// Implement the ability for clients to deal damage of different types (e.g., bludgeoning, fire) to a player character.
// Ensure that the API calculates damage while considering character resistances and immunities.
export default async function dealDamage(id, dmgAmount, dmgType) {
    const playerData = await getPlayerData(id);
    
    let result; 

    const defenses = playerData.defenses;
    let immune = false;
    let resistant = false;

    defenses.map(def => { // search player defenses for resistance/immunity to damage type
        if (def.type == dmgType) {
            resistant = (def.defense== 'resistance');
            immune = (def.defense == 'immunity');
        }
    })

    if (resistant) { 
        let subtractTempHitPts = Math.round(dmgAmount/2) - playerData.tempHitPt // Divide the amount of damage by 2, then subtract tempHPs
        let finalDmg = (subtractTempHitPts >= 0) ? subtractTempHitPts : 0 // Don't allow damage amount to drop below 0
        
        result = updatePlayerData(id, {
            hitPoints: playerData.hitPoints - finalDmg,
            tempHitPts: (playerData.tempHitPts -  Math.round(dmgAmount/2) > 0) ? playerData.tempHitPts -  Math.round(dmgAmount/2) : 0
        })

    } else if (!immune) {
        let subtractTempHitPts = dmgAmount - playerData.tempHitPts // Remove the total damage from hp, subtract tempHitPts
        let finalDmg = (subtractTempHitPts >= 0) ? subtractTempHitPts : 0 // Don't allow damage amount to drop below 0

        result = updatePlayerData(id, {
            hitPoints: playerData.hitPoints - finalDmg,
            tempHitPts: (playerData.tempHitPts - dmgAmount > 0) ? playerData.tempHitPts - dmgAmount : 0
        })
        
    } else {
        result = playerData
    }

    return await result 
}

