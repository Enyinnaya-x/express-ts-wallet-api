import { pool } from '../config/database.js';
import type { PoolClient } from 'pg';
import type { Wallet } from '../models/wallet.model.js';
import type { Transaction } from '../models/transaction.model.js';


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

export async function findByUserId(userId: number, client: PoolClient | typeof pool = pool): Promise<Wallet> {
    const { rows } = await client.query<Wallet>(
        `SELECT * FROM wallets WHERE user_id = $1`,
        [userId]
    );

    const wallet = rows[0];

    if (!wallet) {
        throw new Error('Wallet does not exist');
    }

    return wallet;
}

export async function updateBalance(walletId: number, newBalance: number, client: PoolClient | typeof pool = pool): Promise<Wallet> {
    const { rows } = await client.query<Wallet>(
        `UPDATE wallets SET balance = $1 WHERE id = $2 RETURNING *`,
        [newBalance, walletId]
    );

    const wallet = rows[0];

    if (!wallet) {
        throw new Error('Failed to update wallet balance');
    }

    return wallet;
}

