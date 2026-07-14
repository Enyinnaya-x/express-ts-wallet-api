import type { NextFunction, Request, Response } from "express";
import { getHoldings } from "../services/holding.service.js";

export async function fetchUserHoldings(req: Request, res: Response, next: NextFunction){
        try{
            const result = await getHoldings(req.userId!);

            return res.status(200).json({success: true, data: { result }});

        }catch(err){
            next(err);
        }
}