import type { RefreshTokenRequest } from "../validators/auth.validator.js";
import { findRefreshToken, revokeRefreshtoken } from "../repositories/refreshToken.repository.js";
import type { LogoutRequest } from "../validators/auth.validator.js";
import { generateToken } from "../utils/jwt.js";


export async function refreshUserToken(data: RefreshTokenRequest){
    //find the token from the db
    const existingToken = await findRefreshToken(data.token);

    //check if the token exists or if it has been revoked
    if(!existingToken || existingToken.revoked){
        throw new Error('Token not found or invalid');
    }

    const newAccessToken = generateToken({userId: data.user_id});

     return { accessToken: newAccessToken };

}

export async function logUserOut(data: LogoutRequest){
    //revoke token
   return await revokeRefreshtoken(data.token);
}