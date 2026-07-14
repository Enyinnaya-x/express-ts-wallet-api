import { getUserHoldings } from "../repositories/holding.repository.js";

export async function getHoldings(userId: number){
    const holdings =  await getUserHoldings(userId);

    return holdings;
}