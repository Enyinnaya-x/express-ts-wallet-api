import {type Request, type Response, type NextFunction} from 'express';
import { type ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.safeParse(req.body);
            next();
        } catch (error) {
            res.status(400).json({ success: false, message: 'Bad Request', error });
        }
    }
}