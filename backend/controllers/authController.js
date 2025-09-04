import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Subject from "../models/subjectModel.js";
import Assignment from "../models/assignmentModel.js";
import Quiz from "../models/quizModel.js";
import Resource from "../models/resourceModel.js";


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // Step 1: Find user
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Subject,
          as: "lecturerSubjects", 
          attributes: [
            "subjectId",
            "subjectName",
            "subjectCode",
            "subjectSemester",
            "batchName",
          ],
        },
      ],
    });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Step 2: Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Step 3: Generate JWT
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Step 4: If student → fetch subjects based on batch/department/faculty
    let subjects = [];
    if (user.role === "student") {
      subjects = await Subject.findAll({
        where: {
          batchName: user.batchName,
          departmentName: user.departmentName,
          facultyName: user.facultyName,
        },
        attributes: [
          "subjectId",
          "subjectName",
          "subjectCode",
          "subjectSemester",
          "batchName",
          "departmentName",
          "facultyName",
        ],
        include: [
          {
            model: Assignment,
            attributes: ["assignmentId", "title", "description", "fileUrl", "deadline"],
          },
          {
            model: Quiz,
            attributes: ["quizId", "title", "description", "fileUrl", "deadline"],
          },
          {
            model: Resource,
            attributes: ["resourceId", "title", "fileUrl"],
          },
        ],
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        ...user.toJSON(),
        subjects, 
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};



export const logout = (req, res) => {
    try {
      res.clearCookie("token");
    res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
      
    }
}