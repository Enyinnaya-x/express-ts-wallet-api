import type { Transaction } from "../models/transaction.model.js";
import { query } from "../utils/db.js";
import { pool } from '../config/database.js';
import type { PoolClient } from 'pg';

export async function recordTransaction(
    data: Pick<Transaction, 'idempotency_key' | 'sender_wallet_id' | 'receiver_wallet_id' | 'amount'| 'type' | 'status' >
){
    const { rows } = await query<Transaction>(
        `INSERT INTO transactions(idempotency_key, sender_wallet_id, receiver_wallet_id, amount, type, status)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [data.idempotency_key, data.sender_wallet_id, data.receiver_wallet_id, data.amount, data.type, data.status]
    );

    const transaction = rows[0];

    if(!transaction){
        throw new Error('Transaction could not be recorded');
    }

    return transaction;
}

export async function findByIdempotencyKey(key: string, client: PoolClient | typeof pool = pool) {
    const { rows } = await query<Transaction>(
        `SELECT * FROM transactions WHERE idempotency_key = $1`,
        [key]
    );

    return rows[0];
    
}

export async function findAllUserTransactions(userId: number){
     const { rows } = await pool.query<Transaction>(
            `SELECT * FROM transactions WHERE sender_wallet_id = $1 OR receiver_wallet_id = $1`,
            [userId]
        );
    
        return rows;
}