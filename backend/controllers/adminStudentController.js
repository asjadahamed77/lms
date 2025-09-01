// controllers/userController.js
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const createStudent = async (req, res) => {
  try {
    const { 
      name, 
      nameWithInitials, 
      registrationNumber, 
      email, 
      password, 
      batchName, 
      facultyName, 
      departmentName 
    } = req.body;

    // Validation
    if (!name || !nameWithInitials || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, name with initials, email, and password are required"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    // Check if registration number already exists (if provided)
    if (registrationNumber) {
      const existingRegNumber = await User.findOne({ where: { registrationNumber } });
      if (existingRegNumber) {
        return res.status(409).json({
          success: false,
          message: "Registration number already exists"
        });
      }
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create student
    const student = await User.create({
      name,
      nameWithInitials,
      registrationNumber,
      email,
      password: hashedPassword,
      batchName,
      facultyName,
      departmentName,
      role: "student"
    });

    // Remove password from response
    const studentResponse = {
      userId: student.userId,
      name: student.name,
      nameWithInitials: student.nameWithInitials,
      registrationNumber: student.registrationNumber,
      email: student.email,
      role: student.role,
      batchName: student.batchName,
      facultyName: student.facultyName,
      departmentName: student.departmentName,
      isActive: student.isActive,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt
    };

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: studentResponse
    });

  } catch (error) {
    console.error("Error creating student:", error);

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    // Handle unique constraint errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: "A user with this email or registration number already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Function to get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.findAll({
      where: { role: "student" },
      attributes: { exclude: ['password'] }
    });

    res.json({
      success: true,
      students
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching students"
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await User.findOne({
      where: { userId: id, role: "student" },
      attributes: { exclude: ['password'] }
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.json({
      success: true,
      student
    });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching student"
    });
  }
};

export const deleteStudent = async (req,res) => {
  const {userId} = req.params;
  try {
    const student = await User.findOne({where: {userId, role: "student"}});
    if(!student){
      return res.status(404).json({success: false, message: "Student not found"})
    }
    await student.destroy();
    res.status(200).json({success: true, message: "Student deleted successfully"})
  } catch (error) {
    console.log("Error in deleting student:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    
  }
}