import type { NextFunction, Request, Response } from "express";
import { getUserWallet } from "../services/wallet.service.js";

export async function getWallet(req: Request, res: Response, next: NextFunction){

    try{
        const wallet = await getUserWallet(req.userId!);
        return res.status(200).json({success: true, data: {wallet}});

    }catch(err){
        next(err) 
    }
}