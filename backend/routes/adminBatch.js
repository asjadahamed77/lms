import express from 'express';
import { authorizeRoles, verifyToken } from '../middlewares/userAuthMiddleware.js';
import { createBatch, getAllBatches } from '../controllers/adminBatchController.js';

const adminBatchRouter = express.Router();

adminBatchRouter.post('/create-batch',verifyToken, authorizeRoles('admin'), createBatch )
adminBatchRouter.get('/get-batches',verifyToken, authorizeRoles('admin'), getAllBatches )

export default adminBatchRouter