import express from 'express';

import { authorizeRoles, verifyToken } from '../middlewares/userAuthMiddleware.js';
import { createLecturer, deleteLecturer, getAllLecturers } from '../controllers/adminLecturerController.js';

const adminLecturerRouter = express.Router();

adminLecturerRouter.post('/create-lecturer', verifyToken, authorizeRoles('admin') ,createLecturer);
adminLecturerRouter.get('/get-lecturer', verifyToken, authorizeRoles('admin') ,getAllLecturers);
adminLecturerRouter.delete('/:userId', verifyToken, authorizeRoles('admin') ,deleteLecturer);

export default adminLecturerRouter;