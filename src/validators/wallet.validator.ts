import { z } from 'zod';

export const getWalletSchema = z.object({
    userId: z.number()
})

export const TransferSchema = z.object({
    idempotencyKey: z.string(),
    userId: z.number(),
    amount: z.number(),
    recipientAccountNumber: z.string().min(10)
})

export const CryptoPurchaseSchema = z.object({
    idempotency_key: z.string(),
    user_id: z.number(),
    amount: z.number(),
    asset_id: z.number()
})

export type getWalletInput = z.infer<typeof getWalletSchema>;
export type TransferRequest = z.infer<typeof TransferSchema>;
export type CryptoPurchaseRequest = z.infer<typeof CryptoPurchaseSchema>;