import { findByUserId } from "../repositories/wallet.repository.js";
import { findByAccountNum } from "../repositories/user.repository.js";
import type { TransferRequest } from "../validators/wallet.validator.js"
import { withTransaction } from "../utils/db.js";
import { updateBalance } from "../repositories/wallet.repository.js";
import { findByIdempotencyKey, recordTransaction } from "../repositories/transaction.repository.js"

export async function getUserWallet(userId: number){

    const wallet = findByUserId(userId);

    return wallet;
}

export async function sendMoney(data: TransferRequest) {
  return withTransaction(async (client) => {

    //check if this transaction has happened before
    const existingTransaction  = await findByIdempotencyKey(data.idempotencyKey, client);

    if(existingTransaction){
        return existingTransaction.status;
    }



    //find sender wallet
    const senderWallet = await findByUserId(data.userId, client);

    //find recipient 
    const recipientUser = await findByAccountNum(data.recipientAccountNumber);

    // find recipient wallet 
    const recipientWallet = await findByUserId(recipientUser?.id!, client);

    // confirm if balance is sufficient 
    if (senderWallet.balance < data.amount) {
      throw new Error('Insufficient balance');
    }

    //call repo to update both wallets
    await updateBalance(senderWallet.id, senderWallet.balance - data.amount, client);
    await updateBalance(recipientWallet.id, recipientWallet.balance + data.amount, client);

    //record transaction
    await recordTransaction({
    idempotency_key: data.idempotencyKey,
    sender_wallet_id: senderWallet.id,
    receiver_wallet_id: recipientWallet.id,
    amount: data.amount,
    type: "internal",
    status: "success"
})

    return { message: 'Transfer successful' };
  });
}