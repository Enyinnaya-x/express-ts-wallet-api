import { Router } from "express";
import { getWallet, initiateTransfer, buyAsset } from "../controllers/wallet.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { CryptoPurchaseSchema } from "../validators/wallet.validator.js";

const router = Router();

router.get('/me', authenticate, getWallet);
router.post('/transfer', authenticate, initiateTransfer);
router.post('/buy', validate(CryptoPurchaseSchema), authenticate, buyAsset);

export default router;