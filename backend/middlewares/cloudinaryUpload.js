
import fs from "fs";
import cloudinary from "../config/cloudinaryConfig.js";

const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) return next(); 

    const result = await cloudinary.uploader.upload(req.file.path);

    req.fileUrl = result.secure_url;

    
    fs.unlinkSync(req.file.path);

    next();
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return res.status(500).json({ error: "File upload failed" });
  }
};

export default uploadToCloudinary;
