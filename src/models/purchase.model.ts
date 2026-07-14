export interface Purchase{
    id: number,
    idempotency_key: string,
    asset_id: number,
    user_id: number,
    buy_price: number,
    asset_price_snapshot: number,
    created_at: Date,
    updated_at: Date

}