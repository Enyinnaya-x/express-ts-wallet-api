import { getUserHoldings, updateHoldingBalance, recordSale } from "../repositories/holding.repository.js";
import type { SellAssetRequest } from "../validators/holding.validator.js";
import { findHolding } from "../repositories/holding.repository.js";
import { findAssetById } from "../repositories/asset.repository.js";
import { findByUserId, updateBalance } from "../repositories/wallet.repository.js";
import { withTransaction } from "../utils/db.js";

export async function getHoldings(userId: number){
    const holdings =  await getUserHoldings(userId);

    return holdings;
}

export async function sellUserAsset(data: SellAssetRequest){
     return withTransaction(async (client) => {


        //first confirm if user even has this asset
    const existingAsset = await findHolding({
        user_id: data.user_id, 
        asset_id: data.asset_id
    });

    if(!existingAsset){
        throw new Error('User does not own this Asset');
    };

    //confirm if the user even has the amount they want to sell
    if(existingAsset.quantity < data.amount){
        throw new Error('Insufficient asset balance');
    }

    //get asset sell price
    const asset = await findAssetById(data.asset_id);

    const sellPrice = asset.sell_price;
    
    //caculate new holding count of that asset for that user
    const newHoldingCount = existingAsset.quantity - data.amount;

    //calculate payout to wallet
    const payout = data.amount * sellPrice;

    //find user wallet
    const wallet = await findByUserId(data.user_id);

    //calculate their new balance
    const newBalance = BigInt(wallet.balance) + BigInt(payout);

    //call wallet repo
    await updateBalance(wallet.id, newBalance, client);

    //update holdings for that user
    await updateHoldingBalance({
        asset_id: data.asset_id,
        user_id: data.user_id,
        quantity: newHoldingCount
    });

    //record successful sale
    await recordSale({
        user_id: data.user_id,
        asset_id: data.asset_id,
        sell_price_snapshot: sellPrice,
        payout: payout

    });


 });
}