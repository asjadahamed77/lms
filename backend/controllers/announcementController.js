import cloudinary from "../config/cloudinaryConfig.js";
import Announcement from "../models/announcementModel.js";


export const createAnnouncement = async (req, res) => {
    try {
        const { title, description, fileUrl } = req.body;

      
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newAnnouncement = await Announcement.create({
            title,
            description,
            fileUrl: req.fileUrls || [],
        });

        res.status(201).json({
            success: true,
            message: "Announcement created successfully",
            announcement: newAnnouncement
        });
    } catch (error) {
        console.error("Error creating announcement:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({
            success: true,
            announcements
    });
    } catch (error) {
        console.error("Error fetching announcements:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteAnnouncement = async (req, res) => {
    try {
        const { announcementId } = req.params;

        const announcement = await Announcement.findByPk(announcementId);
        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found" });
        }

         // Ensure fileUrl is parsed correctly
    let fileUrls = [];
    try {
      if (Array.isArray(announcement.fileUrl)) {
        fileUrls = announcement.fileUrl;
      } else if (typeof announcement.fileUrl === "string") {
        fileUrls = JSON.parse(announcement.fileUrl);
      }
    } catch (err) {
      console.error("Error parsing fileUrl:", err);
    }

     // Delete files from Cloudinary
     for (const file of fileUrls) {
        if (file.public_id) {
          try {
            await cloudinary.uploader.destroy(file.public_id, {
              resource_type: "raw", // for pdf, docx, etc
            });
         
          } catch (err) {
            console.error("Cloudinary delete error:", err);
          }
        }
      }

        await announcement.destroy();

        res.status(200).json({
            success: true,
            message: "Announcement deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting announcement:", error);
        res.status(500).json({ message: "Server error" });
    }
}