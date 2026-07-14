import type { Holding } from "../models/holding.model.js";
import type { Sale } from "../models/sale.model.js";
import { query } from "../utils/db.js";

export async function getAllHoldings(){
    const { rows } = await query<Holding>(
        `SELECT * FROM holdings`
    );

    return rows;
}

export async function getUserHoldings(userId: number){
    const { rows } = await query<Holding>(
        `SELECT * FROM holdings WHERE user_id = $1`,
        [userId]
    );

    return rows;
}

export async function recordHoldingBalance(
    data: Pick<Holding, 'user_id' | 'asset_id'| 'quantity'>
){
    const { rows } = await query<Holding>(
        `INSERT INTO holdings(user_id, asset_id, quantity)
        VALUES($1, $2, $3)`,
        [data.user_id, data.asset_id, data.quantity]
    );

}

export async function updateHoldingBalance(
    data: Pick<Holding, 'asset_id' | 'user_id' | 'quantity' >
){
    const { rows } = await query<Holding>(
        `UPDATE holdings SET quantity = quantity + $1 WHERE user_id = $2 AND asset_id = $3`,
        [data.quantity, data.user_id, data.asset_id]
    );

    return rows[0];
}

export async function findHolding(
    data: Pick<Holding, 'user_id' | 'asset_id'>
){
    const { rows } = await query<Holding>(
        `SELECT * FROM holdings WHERE user_id = $1 AND asset_id = $2`,
        [data.user_id, data.asset_id]
    );

    return rows[0];
}

export async function recordSale(
    data: Pick<Sale, 'user_id' | 'asset_id' | 'sell_price_snapshot' | 'payout'>
){
    const { rows } = await query<Sale>(
        `INSERT INTO sales(user_id, asset_id, sell_price_snapshot, payout)
        VALUES($1, $2, $3, $4)`,
        [data.user_id, data.asset_id, data.sell_price_snapshot, data.payout]
    );
}