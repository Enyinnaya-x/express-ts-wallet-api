import { z } from 'zod';

export const getWalletSchema = z.object({
    userId: z.number()
})

export type getWalletInput = z.infer<typeof getWalletSchema>;