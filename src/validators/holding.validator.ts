import { z } from "zod"

export const sellAssetSchema = z.object({
    user_id: z.number(),
    asset_id: z.number(),
    amount: z.number()
});

export type SellAssetRequest = z.infer<typeof sellAssetSchema>;