export interface Sale{
    id: number,
    user_id: number,
    asset_id: number,
    sell_price_snapshot: number,
    payout: number,
    created_at: Date,
    updated_at: Date
}