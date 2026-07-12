import { pool } from '../config/database.js';
import type { Wallet } from '../models/wallet.model.js';


export async function createWallet(userId: number): Promise<Wallet> {
    const { rows } = await pool.query<Wallet>(
        `INSERT INTO wallets (user_id, balance)
         VALUES ($1, $2)
         RETURNING *`,
        [userId, 0]
    );

    const wallet = rows[0];

    if (!wallet) {
        throw new Error('Failed to create wallet');
    }

    return wallet;
}

export async function findByUserId(userId: number): Promise<Wallet> {
    const { rows } = await pool.query<Wallet>(
        `SELECT * FROM wallets WHERE user_id = $1`,
        [userId]
    );

    const wallet = rows[0];

     if (!wallet) {
        throw new Error('Wallet does not exist');
    }

    return wallet;

}