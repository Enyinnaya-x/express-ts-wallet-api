import { query } from "../utils/db.js";
import type { Asset } from "../models/asset.model.js";

export async function getAllAssets(){
    const { rows } = await query<Asset>(
        `SELECT * FROM assets`
    );

    return rows;
}

export async function findAssetById(id: number){
    const { rows } = await query<Asset>(
        `SELECT * FROM assets WHERE id = $1 FOR UPDATE`,
        [id]
    );

    const asset = rows[0];

    if(!asset){
        throw new Error('Asset does not exist');
    }
    
    return asset;
}