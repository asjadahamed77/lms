import express from "express";
import { authorizeRoles, verifyToken } from "../middlewares/userAuthMiddleware.js";
import { createSubject } from "../controllers/adminSubjectController.js";

const adminSubjectRouter = express.Router();

adminSubjectRouter.post('/create-subject', verifyToken, authorizeRoles('admin') ,createSubject);


export default adminSubjectRouter