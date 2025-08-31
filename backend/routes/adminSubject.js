import express from "express";
import { authorizeRoles, verifyToken } from "../middlewares/userAuthMiddleware.js";
import { createSubject, getAllSubjects } from "../controllers/adminSubjectController.js";

const adminSubjectRouter = express.Router();

adminSubjectRouter.post('/create-subject', verifyToken, authorizeRoles('admin') ,createSubject);
adminSubjectRouter.get('/get-subjects',verifyToken, authorizeRoles('admin'), getAllSubjects )


export default adminSubjectRouter