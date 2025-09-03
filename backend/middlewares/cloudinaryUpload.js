// middleware/cloudinaryUpload.js
import cloudinary from '../config/cloudinaryConfig.js';

export const uploadFilesToCloudinary = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      req.fileUrls = [];
      return next();
    }

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        // Create a unique public_id for the file
        const publicId = `assignments/${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            public_id: publicId,
            folder: 'assignments'
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );
        
        uploadStream.end(file.buffer);
      });
    });

    const urls = await Promise.all(uploadPromises);
    req.fileUrls = urls;
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