import express from 'express';
import { createStudent } from '../controllers/adminStudentController.js';

const adminStudentRouter = express.Router();

adminStudentRouter.post('/create-student', createStudent);

export default adminStudentRouter;