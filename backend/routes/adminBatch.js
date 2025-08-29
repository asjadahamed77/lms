import express from 'express';
import { authorizeRoles, verifyToken } from '../middlewares/userAuthMiddleware.js';
import { createBatch } from '../controllers/adminBatchController.js';

const adminBatchRouter = express.Router();

adminBatchRouter.post('/create-batch',verifyToken, authorizeRoles('admin'), createBatch )

export default adminBatchRouter