import { Router } from "express";
import { register, login, getTransactions } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { registerSchema, loginSchema } from "../validators/user.validator.js";

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/transactions', authenticate, getTransactions );


export default router;
