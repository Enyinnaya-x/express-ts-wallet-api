import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { fetchUserHoldings } from "../controllers/holding.controller.js";

const router = Router();

router.get('/me', authenticate, fetchUserHoldings)

export default router;