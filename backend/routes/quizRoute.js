import express from "express";
import { authorizeRoles, verifyToken } from "../middlewares/userAuthMiddleware.js";

import upload from '../middlewares/multerConfig.js'
import  { uploadFilesToCloudinary } from "../middlewares/cloudinaryUpload.js";
import { createQuiz, deleteQuiz, getQuizzesForLecturer, getUpcomingQuizzesForStudents } from "../controllers/quizController.js";


const quizRouter = express.Router();

quizRouter.post(
  "/add-quiz",
  verifyToken,
  authorizeRoles("lecturer"),
  upload.array("files", 5),     
  uploadFilesToCloudinary("fileUrls"),            
  createQuiz
);
quizRouter.get('/lecturer-quizzes/:lecturerId', verifyToken, authorizeRoles('lecturer'), getQuizzesForLecturer);
quizRouter.delete('/lecturer-quizzes/:quizId', verifyToken, authorizeRoles('lecturer'), deleteQuiz);


quizRouter.get('/upcoming', verifyToken, authorizeRoles('student'), getUpcomingQuizzesForStudents)


export default quizRouter;
