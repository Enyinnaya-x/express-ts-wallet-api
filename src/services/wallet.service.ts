import { findByUserId } from "../repositories/wallet.repository.js";
import { findByAccountNum } from "../repositories/user.repository.js";
import type { TransferRequest, CryptoPurchaseRequest } from "../validators/wallet.validator.js"
import { withTransaction } from "../utils/db.js";
import { updateBalance } from "../repositories/wallet.repository.js";
import { findByIdempotencyKey, recordTransaction } from "../repositories/transaction.repository.js"
import { findPurchaseByIdempotencyKey } from "../repositories/purchase.repository.js";
import { findAssetById } from "../repositories/asset.repository.js";
import { recordHoldingBalance, updateHoldingBalance, findHolding } from "../repositories/holding.repository.js";
import { recordPurchase } from "../repositories/purchase.repository.js";

export async function getUserWallet(userId: number){

    const wallet = findByUserId(userId);

    return wallet;
}

export async function sendMoney(data: TransferRequest) {
  return withTransaction(async (client) => {

    //check if this transaction has happened before
    const existingTransaction  = await findByIdempotencyKey(data.idempotencyKey, client);

    if(existingTransaction){
        return existingTransaction;
    }

    //find sender wallet
    const senderWallet = await findByUserId(data.userId, client);

    //find recipient 
    const recipientUser = await findByAccountNum(data.recipientAccountNumber);

    // find recipient wallet 
    const recipientWallet = await findByUserId(recipientUser?.id!, client);

    const amountInKobo = data.amount * 100;

    // confirm if balance is sufficient in kobo
    if (senderWallet.balance < amountInKobo) {
      throw new Error('Insufficient balance');
    }

    const newSenderBalance = BigInt(senderWallet.balance) - BigInt(amountInKobo);
    const newRecipientBalance = BigInt(recipientWallet.balance) + BigInt(amountInKobo);

    //call repo to update both wallets
    await updateBalance(senderWallet.id, newSenderBalance, client);
    await updateBalance(recipientWallet.id, newRecipientBalance, client);

    //record transaction
    await recordTransaction({
    idempotency_key: data.idempotencyKey,
    sender_wallet_id: senderWallet.id,
    receiver_wallet_id: recipientWallet.id,
    amount: amountInKobo,
    type: "internal",
    status: "success"
})

    return { message: 'Transfer successful' };
  });
}

export async function purchaseAsset(data: CryptoPurchaseRequest){
  return withTransaction(async (client) => {

      //check if purchase has happened before
    const existingPurchase = await findPurchaseByIdempotencyKey(data.idempotency_key);

    if(existingPurchase){
      return existingPurchase;
    }

    //find user wallet
    const userWallet = await findByUserId(data.user_id);

    const amountInKobo = data.amount * 100;

    //confirm balance is sufficient for purchase
    if(userWallet.balance < amountInKobo){
      throw new Error('Insufficient balance');
    }

    const newBalance = BigInt(userWallet.balance) - BigInt(amountInKobo);

    //debit wallet
    await updateBalance(userWallet.id, newBalance, client);

    //get asset price based off asset id
    const asset = await findAssetById(data.asset_id);

    const assetPrice = asset.price;

    //confirm the quantity that would be bought based off the amount.
    const boughtQuantity = amountInKobo/assetPrice;

    const holding = {
      user_id: data.user_id,
      asset_id: data.asset_id,
      quantity: boughtQuantity
    }

    //confirm if they already own this asset before taking action
    const exisitingHolding = await findHolding({ user_id: data.user_id, asset_id: data.asset_id });

    //if the user has previously purchased this asset just increment else create a new record
   exisitingHolding ? await updateHoldingBalance(holding) : await recordHoldingBalance(holding);

    //record purchase for audit
    await recordPurchase({
      idempotency_key: data.idempotency_key, 
      asset_id: data.asset_id, 
      user_id: data.user_id, 
      buy_price: amountInKobo, 
      asset_price_snapshot: assetPrice
    });

  });
    
}