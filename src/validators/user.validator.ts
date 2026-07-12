import { z } from 'zod';

export const registerSchema = z.object({
    full_name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().min(10).max(15),
    password: z.string().min(8).max(100),
    confirm_password: z.string().min(8).max(100),
    acc_number: z.string().optional(), // account number will be generated, so it's optional in the input
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password'],
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;