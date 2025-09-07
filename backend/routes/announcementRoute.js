import express from "express";
import { createAnnouncement } from "../controllers/announcementController.js";
import { authorizeRoles, verifyToken } from "../middlewares/userAuthMiddleware.js";

const announcementRouter = express.Router();

announcementRouter.post('/create', verifyToken, authorizeRoles('admin'), createAnnouncement);

export default announcementRouter;