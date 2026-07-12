import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.js";

export function authenticate(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ success: false, message: 'Invalid token format' });
    }

    try{
        const decoded = verifyToken(token); 
        req.userId = decoded.userId;
        next();
    }catch(error){
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }


}