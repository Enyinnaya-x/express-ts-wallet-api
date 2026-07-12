import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';

interface JwtPayload {
    userId: number;
}


export function generateToken(payload: JwtPayload): string {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as NonNullable<SignOptions['expiresIn']>,
  };

  return jwt.sign(payload, env.JWT_SECRET, options);
}

export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}

