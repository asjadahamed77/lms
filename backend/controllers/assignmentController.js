// controllers/assignmentController.js
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

// Fetch assignments for students (filter by batch + department)
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
