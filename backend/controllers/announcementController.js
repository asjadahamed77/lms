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
            fileUrl: fileUrl || [],
        });

        res.status(201).json(newAnnouncement);
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