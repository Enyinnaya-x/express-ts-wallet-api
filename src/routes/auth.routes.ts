import { Router } from "express";
import { refreshToken, logOut } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/logout', authenticate, logOut);
router.post('/refresh', refreshToken);

export default router;