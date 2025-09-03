

import Quiz from "../models/quizModel.js";
import Subject from "../models/subjectModel.js";
import User from "../models/userModel.js";

export const createQuiz = async (req, res) => {
    try {
      const { title, description, deadline, subjectId, lecturerId } = req.body;
  
      const subject = await Subject.findByPk(subjectId);
      if (!subject) {
        return res.status(404).json({ success: false, message: "Subject not found" });
      }
  
      const quiz = await Quiz.create({
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
        message: "Quiz created successfully.",
        quiz,
      });
    } catch (error) {
      console.error("Create Quiz Error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  

export const getQuizzesForLecturer = async (req, res) => {
    try {
      const { lecturerId } = req.params;
  
      const quizzes = await Quiz.findAll({
        where: { lecturerId },
        include: [
          { model: Subject, attributes: ["subjectId", "subjectName", "subjectCode", "batchName"] },
          { model: User, as: "lecturer", attributes: ["name", "email"] },
        ],
        order: [["createdAt", "DESC"]],
      });
  
      res.json({ success: true, quizzes });
    } catch (error) {
      console.error("Fetch Lecturer Quizzes Error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

// Fetch assignments for students (filter by batch + department)
export const getQuizzesForStudents = async (req, res) => {
  try {
    const { batchName, departmentName } = req.query;

    const quizzes = await Quiz.findAll({
      where: { batchName, departmentName },
      include: [{ model: Subject }, { association: "lecturer", attributes: ["name", "email"] }],
    });

    res.json({ success: true, quizzes });
  } catch (error) {
    console.error("Fetch Quizzes Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
