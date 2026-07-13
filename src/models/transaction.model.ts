export interface Transaction {
    id: number;
    idempotency_key: string;
    sender_wallet_id: number;
    receiver_wallet_id: number;
    type: 'internal' | 'external';
    amount: number;
    status: string;
    created_at: Date;
    updated_at: Date;
}