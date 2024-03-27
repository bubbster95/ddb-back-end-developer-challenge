
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
            resistant = ( def.defense == 'resistance' );
            immune = ( def.defense == 'immunity' );
        }
    })
    
    let finalDmg = dmgAmount; // The amont of damage to hit points after considering tempHitPts
    if (resistant) finalDmg = Math.round(dmgAmount/2)
    if (immune) finalDmg = 0

    let subtractTempHitPts = finalDmg - playerData.tempHitPts // Subtract tempHPs
    finalDmg = (subtractTempHitPts >= 0) ? subtractTempHitPts : 0 // Don't allow damage amount to drop below 0
    
    result = updatePlayerData(id, {
        hitPoints: playerData.hitPoints - finalDmg,
        tempHitPts: playerData.tempHitPts - dmgAmount > 0 ? playerData.tempHitPts - dmgAmount : 0
    })
    
    console.log(`Deal ${finalDmg} to hp.`)
    return await result 
}

