export interface RefreshToken{
    id: number,
    user_id: number,
    token: string,
    revoked: boolean,
    expires_at: Date 
    created_at: Date,
}