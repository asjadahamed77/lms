import express from "express";
import { authorizeRoles, verifyToken } from "../middlewares/userAuthMiddleware.js";
import { getStudentSubjects } from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.get('/:userId/get-student', verifyToken ,authorizeRoles('student'), getStudentSubjects)

export default studentRouter;