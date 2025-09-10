

import cloudinary from "../config/cloudinaryConfig.js";
import Quiz from "../models/quizModel.js";
import Subject from "../models/subjectModel.js";
import User from "../models/userModel.js";
import { Op } from "sequelize";


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


// Delete Quiz
export const deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    // Find  by ID
    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    // Ensure fileUrl is parsed correctly
    let fileUrls = [];
    try {
      if (Array.isArray(quiz.fileUrl)) {
        fileUrls = quiz.fileUrl;
      } else if (typeof quiz.fileUrl === "string") {
        fileUrls = JSON.parse(quiz.fileUrl);
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

    // Delete the assiquizgnment record
    await quiz.destroy();

    res.json({
      success: true,
      message: "Quiz and its files deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Quiz Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// get upcomming 4 quizzess for students
export const getUpcomingQuizzesForStudents = async (req, res) => {
  try {
    
    const { batchName, departmentName } = req.query;

    const currentDate = new Date();

    const quizzes = await Quiz.findAll({
      where: {
        batchName,
        departmentName,
        deadline: {
          [Op.gte]: currentDate, 
        },
      },
      include: [
        { model: Subject, attributes: ["subjectId", "subjectName", "subjectCode", "batchName"] },
        { model: User, as: "lecturer", attributes: ["name", "email"] },
      ],
      order: [["deadline", "ASC"]],
      limit: 4,
    });

    res.json({ success: true, quizzes });
  } catch (error) {
    console.error("Fetch Upcoming Quizzes Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
