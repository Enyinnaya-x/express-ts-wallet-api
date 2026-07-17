import { createUser } from '../repositories/user.repository.js';
import { createWallet, findByUserId } from '../repositories/wallet.repository.js';
import { findAllUserTransactions } from '../repositories/transaction.repository.js';
import type { RegisterInput, LoginInput } from '../validators/user.validator.js';
import { findByEmail } from '../repositories/user.repository.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateAccountNumber } from '../utils/generateAccount.js';
import { generateToken, generateRefreshToken } from '../utils/jwt.js';
import { storeRefreshToken } from '../repositories/refreshToken.repository.js';
import { env } from '../config/env.js';

export async function registerUser(data: RegisterInput) {
    //confirm is the user already exists
    const existingUser = await findByEmail(data.email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    const userData = {
    ...data,
    password: await hashPassword(data.password),
    acc_number: await generateAccountNumber(data.phone),
};

    const user = await createUser(userData);
    const wallet = await createWallet(user.id);

    return { user, wallet };
}

export async function loginUser(data: LoginInput){
    const user = await findByEmail(data.email);

    if(!user){
        throw new Error("User doesn't exist");
    };


    //confirm if password is correct
    const isMatch = await comparePassword(data.password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

      const accessToken = generateToken({ userId: user.id });
      const refreshToken = generateRefreshToken();
      const REFRESH_TOKEN_EXPIRY_DAYS = Number(env.REFRESH_TOKEN_EXPIRY_DAYS);
      const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000); // X days from now

      //store refresh token in the db
      await storeRefreshToken({
        'user_id': user.id,
        'token': refreshToken,
        'expires_at': expiresAt
      });

      return {access_token: accessToken, refresh_token: refreshToken };
}

export async function getUserTransactions(userId: number){
    const wallet = await findByUserId(userId);

    const transactions = await findAllUserTransactions(wallet.id);

    return transactions;
}
