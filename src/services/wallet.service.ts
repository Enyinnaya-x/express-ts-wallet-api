import { findByUserId } from "../repositories/wallet.repository.js";

export async function getUserWallet(userId: number){

    const wallet = findByUserId(userId);

    return wallet;
}