import { Router } from 'express';
import userRoutes from './user.routes.js';
import walletRoutes from './wallet.routes.js';
import holdingRoutes from './holding.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();
router.use('/users', userRoutes);
router.use('/wallet', walletRoutes);
router.use('/holding', holdingRoutes);
router.use('/auth', authRoutes);

export default router;