import type { NextFunction, Request, Response } from "express";
import { getHoldings, sellUserAsset } from "../services/holding.service.js";

export async function fetchUserHoldings(req: Request, res: Response, next: NextFunction){
        try{
            const result = await getHoldings(req.userId!);

            return res.status(200).json({success: true,  result });

        }catch(err){
            next(err);
        }
}

export async function sellAssetHoldings(req: Request, res: Response, next: NextFunction){
    try{
        const result = await sellUserAsset(req.body);
        res.status(200).json({success: true,  result });


    }catch(err){
        next(err);
    }
}