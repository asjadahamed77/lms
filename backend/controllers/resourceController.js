
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
