import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

export const uploadFilesToCloudinary = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      req.fileUrls = [];
      return next();
    }

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        // Preserve original filename but make it unique
        const originalName = path.parse(file.originalname).name;
        const extension = path.parse(file.originalname).ext;
        const publicId = `assignments/${originalName}_${Date.now()}_${Math.round(Math.random() * 1E9)}${extension}`;
        
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw',
            public_id: publicId,
            access_mode: "public",
            type: "upload",
            folder: 'assignments'
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              resolve({
                url: result.secure_url,
                public_id: result.public_id,
                original_name: file.originalname
              });
            }
          }
        );
        
        uploadStream.end(file.buffer);
      });
    });

    const fileData = await Promise.all(uploadPromises);
    req.fileUrls = fileData;
    next();
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'File upload failed',
      error: err.message 
    });
  }
};