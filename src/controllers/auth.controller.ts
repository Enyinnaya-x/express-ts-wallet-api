import type { NextFunction, Request, Response } from "express";
import { refreshUserToken, logUserOut } from "../services/auth.service.js";

export async function refreshToken(req: Request, res: Response, next: NextFunction){
        try{
            const result = await refreshUserToken(req.body);
            res.status(200).json({result});
        }catch(err){
            next(err)
        }
}

export async function logOut(req: Request, res: Response, next: NextFunction){
    try{
        await logUserOut(req.body);
        res.status(200).json({ message: 'Successful logout' });
    }catch(err){
        next(err);
    }
}