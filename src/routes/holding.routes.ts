import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { fetchUserHoldings, sellAssetHoldings } from "../controllers/holding.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { sellAssetSchema } from "../validators/holding.validator.js";

const router = Router();

router.get('/me', authenticate, fetchUserHoldings)
router.post('/sell', validate(sellAssetSchema), authenticate, sellAssetHoldings)

export default router;