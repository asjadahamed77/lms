import User from "../models/userModel.js";
import Subject from "../models/subjectModel.js";

export const getStudentSubjects = async (req, res) => {
  const { userId } = req.params; // better than req.body for GET

  try {
    // Step 1: Find the student
    const student = await User.findOne({
      where: { userId, role: "student" },
    });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    // Step 2: Find subjects by batch + department + faculty
    const subjects = await Subject.findAll({
      where: {
        batchName: student.batchName,
        departmentName: student.departmentName,
        facultyName: student.facultyName,
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
    });

    // Step 3: Return full student details + subjects
    res.status(200).json({
      success: true,
      student: {
        ...student.toJSON(),
        subjects,
      },
    });
  } catch (error) {
    console.error("Get Student Subjects error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
