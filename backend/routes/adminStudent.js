import express from 'express';
import { createStudent, deleteStudent, getAllStudents } from '../controllers/adminStudentController.js';
import { authorizeRoles, verifyToken } from '../middlewares/userAuthMiddleware.js';

const adminStudentRouter = express.Router();

adminStudentRouter.post('/create-student', verifyToken, authorizeRoles('admin') ,createStudent);
adminStudentRouter.get('/get-students', verifyToken, authorizeRoles('admin') ,getAllStudents);
adminStudentRouter.delete('/:userId', verifyToken, authorizeRoles('admin') ,deleteStudent);

export default adminStudentRouter;