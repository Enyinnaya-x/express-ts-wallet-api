import { type Request, type Response, type NextFunction } from 'express';
import { registerUser, loginUser, getUserTransactions } from '../services/user.service.js';


export async function register(req: Request, res: Response, next: NextFunction)
{
    try{
        const { user, wallet } = await registerUser(req.body);
        res.status(201).json({ success: true, message: 'User registered successfully', data: { user, wallet } });
    }catch(error){
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await loginUser(req.body);
        res.status(200).json({ success: true, message: 'Login successful',  user });
    } catch (error) {
        next(error);
    }
}

export async function getTransactions(req: Request, res: Response, next: NextFunction){

    try{
        const result = await getUserTransactions(req.userId!);
        res.status(200).json({success: true, result });
        
    }catch(err){
        next(err);
    }
}