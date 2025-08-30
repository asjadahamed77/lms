import express from 'express';

import { authorizeRoles, verifyToken } from '../middlewares/userAuthMiddleware.js';
import { createLecturer, getAllLecturers } from '../controllers/adminLecturerController.js';

const adminLecturerRouter = express.Router();

adminLecturerRouter.post('/create-lecturer', verifyToken, authorizeRoles('admin') ,createLecturer);
adminLecturerRouter.get('/get-lecturer', verifyToken, authorizeRoles('admin') ,getAllLecturers);

export default adminLecturerRouter;