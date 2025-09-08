import express from "express";
import { createAnnouncement, deleteAnnouncement, getAllAnnouncements } from "../controllers/announcementController.js";
import { authorizeRoles, verifyToken } from "../middlewares/userAuthMiddleware.js";
import upload from "../middlewares/multerConfig.js";
import { uploadFilesToCloudinary } from "../middlewares/cloudinaryUpload.js";

const announcementRouter = express.Router();

announcementRouter.post('/create', verifyToken, authorizeRoles('admin'), upload.array("files", 5),     
uploadFilesToCloudinary("fileUrls"), createAnnouncement);
announcementRouter.get('/all', verifyToken, authorizeRoles('admin', 'lecturer', 'student'), getAllAnnouncements);
announcementRouter.delete('/delete/:announcementId', verifyToken, authorizeRoles('admin'), deleteAnnouncement);

export default announcementRouter;