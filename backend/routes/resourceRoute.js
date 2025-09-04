import express from "express";
import { authorizeRoles, verifyToken } from "../middlewares/userAuthMiddleware.js";

import upload from '../middlewares/multerConfig.js'
import  { uploadFilesToCloudinary } from "../middlewares/cloudinaryUpload.js";
import { createResource, deleteResource, getResourcesForLecturer } from "../controllers/resourceController.js";



const resourceRouter = express.Router();

resourceRouter.post(
  "/add-resource",
  verifyToken,
  authorizeRoles("lecturer"),
  upload.array("files", 5),     
  uploadFilesToCloudinary("fileUrls"),            
  createResource
);
resourceRouter.get('/lecturer-resources/:lecturerId', verifyToken, authorizeRoles('lecturer'), getResourcesForLecturer);
resourceRouter.delete('/lecturer-resources/:resourceId', verifyToken, authorizeRoles('lecturer'), deleteResource);

export default resourceRouter;
