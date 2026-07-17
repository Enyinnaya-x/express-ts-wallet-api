import { z } from 'zod';

export const refreshTokenSchema = z.object({
    user_id: z.number(),
    token: z.string()
});

export const logoutSchema = z.object({
    token: z.string()
});

export type RefreshTokenRequest = z.infer<typeof refreshTokenSchema>;
export type LogoutRequest = z.infer<typeof logoutSchema>;