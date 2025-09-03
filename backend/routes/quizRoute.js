import express from "express";
import { authorizeRoles, verifyToken } from "../middlewares/userAuthMiddleware.js";

import upload from '../middlewares/multerConfig.js'
import  { uploadFilesToCloudinary } from "../middlewares/cloudinaryUpload.js";
import { createQuiz, getQuizzesForLecturer } from "../controllers/quizController.js";


const quizRouter = express.Router();

quizRouter.post(
  "/add-quiz",
  verifyToken,
  authorizeRoles("lecturer"),
  upload.array("files", 5),     
  uploadFilesToCloudinary,            
  createQuiz
);
quizRouter.get('/lecturer-quizzes/:lecturerId', verifyToken, authorizeRoles('lecturer'), getQuizzesForLecturer);

export default quizRouter;
