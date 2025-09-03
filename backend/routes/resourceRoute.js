import express from "express";
import { authorizeRoles, verifyToken } from "../middlewares/userAuthMiddleware.js";

import upload from '../middlewares/multerConfig.js'
import  { uploadFilesToCloudinary } from "../middlewares/cloudinaryUpload.js";
import { createResource, getResourcesForLecturer } from "../controllers/resourceController.js";



const resourceRouter = express.Router();

resourceRouter.post(
  "/add-resource",
  verifyToken,
  authorizeRoles("lecturer"),
  upload.array("files", 5),     
  uploadFilesToCloudinary,            
  createResource
);
resourceRouter.get('/lecturer-resources/:lecturerId', verifyToken, authorizeRoles('lecturer'), getResourcesForLecturer);

export default resourceRouter;
