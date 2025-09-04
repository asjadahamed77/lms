import cloudinary from "../config/cloudinaryConfig.js";
import Assignment from "../models/assignmentModel.js";
import Subject from "../models/subjectModel.js";
import User from "../models/userModel.js";

export const createAssignment = async (req, res) => {
    try {
      const { title, description, deadline, subjectId, lecturerId } = req.body;
  
      const subject = await Subject.findByPk(subjectId);
      if (!subject) {
        return res.status(404).json({ success: false, message: "Subject not found" });
      }
  
      const assignment = await Assignment.create({
        title,
        description,
        deadline,
        subjectId,
        lecturerId,
        batchName: subject.batchName,
        departmentName: subject.departmentName,
        fileUrl: req.fileUrls || [],       });
  
      res.status(201).json({
        success: true,
        message: "Assignment created successfully.",
        assignment,
      });
    } catch (error) {
      console.error("Create Assignment Error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  

export const getAssignmentsForLecturer = async (req, res) => {
    try {
      const { lecturerId } = req.params;
  
      const assignments = await Assignment.findAll({
        where: { lecturerId },
        include: [
          { model: Subject, attributes: ["subjectId", "subjectName", "subjectCode", "batchName"] },
          { model: User, as: "lecturer", attributes: ["name", "email"] },
        ],
        order: [["createdAt", "DESC"]],
      });
  
      res.json({ success: true, assignments });
    } catch (error) {
      console.error("Fetch Lecturer Assignments Error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };


export const getAssignmentsForStudents = async (req, res) => {
  try {
    const { batchName, departmentName } = req.query;

    const assignments = await Assignment.findAll({
      where: { batchName, departmentName },
      include: [{ model: Subject }, { association: "lecturer", attributes: ["name", "email"] }],
    });

    res.json({ success: true, assignments });
  } catch (error) {
    console.error("Fetch Assignments Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete Assignment
export const deleteAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    // Find assignment by ID
    const assignment = await Assignment.findByPk(assignmentId);
    if (!assignment) {
      return res
        .status(404)
        .json({ success: false, message: "Assignment not found" });
    }

    // Ensure fileUrl is parsed correctly
    let fileUrls = [];
    try {
      if (Array.isArray(assignment.fileUrl)) {
        fileUrls = assignment.fileUrl;
      } else if (typeof assignment.fileUrl === "string") {
        fileUrls = JSON.parse(assignment.fileUrl);
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

    // Delete the assignment record
    await assignment.destroy();

    res.json({
      success: true,
      message: "Assignment and its files deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Assignment Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};