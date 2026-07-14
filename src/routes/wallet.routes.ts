import { Router } from "express";
import { getWallet, initiateTransfer, buyAsset } from "../controllers/wallet.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/me', authenticate, getWallet);
router.post('/transfer', authenticate, initiateTransfer);
router.post('/buy', authenticate, buyAsset);

export default router;