
import cloudinary from "../config/cloudinaryConfig.js";
import Resource from "../models/resourceModel.js";
import Subject from "../models/subjectModel.js";
import User from "../models/userModel.js";

export const createResource = async (req, res) => {
    try {
      const { title,  subjectId, lecturerId } = req.body;
  
      const subject = await Subject.findByPk(subjectId);
      if (!subject) {
        return res.status(404).json({ success: false, message: "Subject not found" });
      }
  
      const resource = await Resource.create({
        title,
        
        subjectId,
        lecturerId,
        batchName: subject.batchName,
        departmentName: subject.departmentName,
        fileUrl: req.fileUrls || [],       });
  
      res.status(201).json({
        success: true,
        message: "Resource created successfully.",
        resource,
      });
    } catch (error) {
      console.error("Create Resource Error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  

export const getResourcesForLecturer = async (req, res) => {
    try {
      const { lecturerId } = req.params;
  
      const resources = await Resource.findAll({
        where: { lecturerId },
        include: [
          { model: Subject, attributes: ["subjectId", "subjectName", "subjectCode", "batchName"] },
          { model: User, as: "lecturer", attributes: ["name", "email"] },
        ],
        order: [["createdAt", "DESC"]],
      });
  
      res.json({ success: true, resources });
    } catch (error) {
      console.error("Fetch Lecturer Resource Error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

// Fetch Resources for students (filter by batch + department)
export const getResourcesForStudents = async (req, res) => {
  try {
    const { batchName, departmentName } = req.query;

    const resources = await Resource.findAll({
      where: { batchName, departmentName },
      include: [{ model: Subject }, { association: "lecturer", attributes: ["name", "email"] }],
    });

    res.json({ success: true, resources });
  } catch (error) {
    console.error("Fetch Resource Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete Resource
export const deleteResource = async (req, res) => {
  try {
    const { resourceId } = req.params;

    // Find  by ID
    const resource = await Resource.findByPk(resourceId);
    if (!resource) {
      return res
        .status(404)
        .json({ success: false, message: "Resource not found" });
    }

    // Ensure fileUrl is parsed correctly
    let fileUrls = [];
    try {
      if (Array.isArray(resource.fileUrl)) {
        fileUrls = resource.fileUrl;
      } else if (typeof resource.fileUrl === "string") {
        fileUrls = JSON.parse(resource.fileUrl);
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
          console.log(`Deleted from Cloudinary: ${file.public_id}`);
        } catch (err) {
          console.error("Cloudinary delete error:", err);
        }
      }
    }

    // Delete the resource record
    await resource.destroy();

    res.json({
      success: true,
      message: "Resource and its files deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Quiz Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};