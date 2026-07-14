import type { Purchase } from "../models/purchase.model.js";
import { query } from "../utils/db.js";

export async function recordPurchase(
    data: Pick<Purchase, 'idempotency_key' | 'asset_id' | 'user_id' | 'buy_price' | 'asset_price_snapshot'>
){
    const { rows } = await query<Purchase>(
        `INSERT INTO purchases(idempotency_key, asset_id, user_id, buy_price, asset_price_snapshot)
        VALUES($1, $2, $3, $4, $5)`,
        [data.idempotency_key, data.asset_id, data.user_id, data.buy_price, data.asset_price_snapshot]
    );

}

export async function findPurchaseByIdempotencyKey(key: string){
    const { rows } = await query<Purchase>(
        `SELECT * FROM purchases WHERE idempotency_key = $1`,
        [key]
    );

    const purchase = rows[0];

    return purchase;
}