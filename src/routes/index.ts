import { Router } from 'express';
import userRoutes from './user.routes.js';
import walletRoutes from './wallet.routes.js';
import holdingRoutes from './holding.routes.js';

const router = Router();
router.use('/users', userRoutes);
router.use('/wallet', walletRoutes);
router.use('/holding', holdingRoutes);

export default router;