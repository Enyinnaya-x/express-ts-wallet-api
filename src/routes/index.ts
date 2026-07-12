import { Router } from 'express';
import userRoutes from './user.routes.js';
import walletRoutes from './wallet.routes.js'

const router = Router();
router.use('/users', userRoutes);
router.use('/wallet', walletRoutes);

export default router;