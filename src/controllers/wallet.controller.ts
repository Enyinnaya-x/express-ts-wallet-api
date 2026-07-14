import type { NextFunction, Request, Response } from "express";
import { getUserWallet, sendMoney, purchaseAsset } from "../services/wallet.service.js";

export async function getWallet(req: Request, res: Response, next: NextFunction){

    try{
        const wallet = await getUserWallet(req.userId!);
        return res.status(200).json({success: true, wallet});

    }catch(err){
        next(err) 
    }
}

export async function initiateTransfer(req: Request, res: Response, next: NextFunction){
        try{
            const result = await sendMoney(req.body);
            return res.status(200).json({success: true, message: 'Transaction has been initiated'} )


        }catch(err){
            next(err);
        }
}

export async function buyAsset(req: Request, res: Response, next: NextFunction){
    try{

        const result = await purchaseAsset(req.body);
        res.status(200).json({success: true, message: 'Transaction successful' });

    }catch(err){
        next(err);
    }
}