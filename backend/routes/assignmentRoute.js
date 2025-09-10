import express from "express";
import { authorizeRoles, verifyToken } from "../middlewares/userAuthMiddleware.js";
import { createAssignment, deleteAssignment, getAssignmentsForLecturer, getUpcomingAssignmentsForStudents } from "../controllers/assignmentController.js";
import upload from '../middlewares/multerConfig.js'
import  { uploadFilesToCloudinary } from "../middlewares/cloudinaryUpload.js";


const assignmentRouter = express.Router();

assignmentRouter.post(
  "/add-assignment",
  verifyToken,
  authorizeRoles("lecturer"),
  upload.array("files", 5),     
  uploadFilesToCloudinary("fileUrls"),            
  createAssignment
);
assignmentRouter.get('/lecturer-assignments/:lecturerId', verifyToken, authorizeRoles('lecturer'), getAssignmentsForLecturer);
assignmentRouter.delete('/lecturer-assignments/:assignmentId', verifyToken, authorizeRoles('lecturer'), deleteAssignment);

assignmentRouter.get('/upcoming', verifyToken, authorizeRoles('student'), getUpcomingAssignmentsForStudents)



export default assignmentRouter;
