import type { RefreshToken } from "../models/refreshToken.model.js";
import { query } from "../utils/db.js";

export async function storeRefreshToken(
    data: Pick<RefreshToken, 'user_id' | 'token' | 'expires_at'>
){
    const { rows } = await query<RefreshToken>(
        `INSERT INTO refresh_tokens(user_id, token, expires_at)
        VALUES($1, $2, $3)`,
        [data.user_id, data.token, data.expires_at]
    );
}

export async function findRefreshToken(token: string){
    const { rows } = await query<RefreshToken>(
        `SELECT * FROM refresh_tokens WHERE token = $1`,
        [token]
    );

    return rows[0];
}

export async function revokeRefreshtoken(token: string){
    const { rows } = await query<RefreshToken>(
        `UPDATE refresh_tokens SET revoked = $1 WHERE token = $2`,
        [true, token]
    );
}