import express from "express";
import { authorizeRoles, verifyToken } from "../middlewares/userAuthMiddleware.js";
import { uploadFilesToCloudinary } from "../middlewares/cloudinaryUpload.js";
import { submitAssignment, submitQuiz } from "../controllers/submissionController.js";
import upload from "../middlewares/multerConfig.js";


const submissionRouter = express.Router();

submissionRouter.post('/assignment/:userId', verifyToken, authorizeRoles('student'),   upload.array("files", 5),     
uploadFilesToCloudinary("fileUrls"), submitAssignment)

submissionRouter.post('/quiz/:userId', verifyToken, authorizeRoles('student'),   upload.array("files", 5),     
uploadFilesToCloudinary("fileUrls"), submitQuiz)


export default submissionRouter;