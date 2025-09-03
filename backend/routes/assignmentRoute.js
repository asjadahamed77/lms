import express from 'express';
import { authorizeRoles, verifyToken } from '../middlewares/userAuthMiddleware.js';
import { createAssignment } from '../controllers/assignmentController.js';
import uploadToCloudinary from '../middlewares/cloudinaryUpload.js';
import upload from "../middlewares/multerConfig.js";

const assignmentRouter = express.Router();


assignmentRouter.post(
    "/create-assignment",
    verifyToken,
    authorizeRoles("lecturer"),
    upload.array("files", 5),  
    uploadToCloudinary,
    createAssignment
  );

export default assignmentRouter;